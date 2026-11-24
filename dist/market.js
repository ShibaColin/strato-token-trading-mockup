/* Synthetic market engine for the explicitly requested interactive design experience.
   No network price feed; OHLC provenance and integration notes live in README.md. */
(function(root){
'use strict';
const MIN=60000,DAY=1440,anchor=Math.floor(Date.now()/MIN)*MIN,started=Date.now();
const periods={'1H':{minutes:60,count:60,label:'Past hour'},'1D':{minutes:DAY,count:72,label:'Past day'},'1W':{minutes:DAY*7,count:84,label:'Past week'},'1M':{minutes:DAY*30,count:90,label:'Past month'},'1Y':{minutes:DAY*365,count:90,label:'Past year'},'ALL':{minutes:DAY*540,count:90,label:'All time'}};
const cache=new Map();let price=2.18,ticks=0,clock=anchor;
function wave(m){const d=m/DAY;return .14*Math.sin(d*.58+1)+.09*Math.cos(d*.25)+.024*Math.sin(m*.07)+.014*Math.sin(m*.23)+.008*Math.sin(m*.61)+.003*Math.sin(m*2.091)}
const zero=wave(0);
function at(time){const m=(time-anchor)/MIN;return Math.max(.12,2.18*Math.exp(m/(DAY*365)*.9)+wave(m)-zero)}
function getSeries(period='1D'){
 const cfg=periods[period]||periods['1D'],interval=cfg.minutes*MIN/cfg.count,epoch=Math.floor(clock/interval),key=period+':'+epoch;
 if(!cache.has(key)){
  const lastStart=epoch*interval,start=lastStart-(cfg.count-1)*interval;let rows=[],prev=at(start);
  for(let i=0;i<cfg.count;i++){
   const time=start+i*interval,end=Math.min(time+interval,clock),open=prev;let close=at(end),high=open,low=open;
   for(let j=1;j<=16;j++){const p=at(time+(end-time)*j/16);high=Math.max(high,p);low=Math.min(low,p)}
   const spread=Math.abs(close-open),wick=.0015+.001*Math.abs(Math.sin(i*7.21));
   high=Math.max(high,close)+wick;low=Math.min(low,close)-wick;
   rows.push({time,open,high,low,close,volume:120+spread*15000+180*Math.abs(Math.sin(time/MIN*.071))});prev=close;
  }
  cache.set(key,rows);if(cache.size>20)cache.delete(cache.keys().next().value);
 }
 const rows=cache.get(key),last=rows[rows.length-1];last.close=price;last.high=Math.max(last.high,price);last.low=Math.min(last.low,price);
 return rows;
}
function tick(){ticks++;clock=anchor+Math.floor((Date.now()-started)/12000)*MIN;const move=.0012*Math.sin(ticks*1.31)+.0008*Math.sin(ticks*.43)+.00035*Math.cos(ticks*2.7);price=Math.max(.12,price+move+(at(clock)-price)*.055);return price}
function summary(period){const rows=getSeries(period),first=rows[0].open,delta=price-first;return {price,delta,percent:delta/first*100,label:(periods[period]||periods['1D']).label}}
function labels(period){const rows=getSeries(period),cfg=periods[period]||periods['1D'];return [0,Math.floor(rows.length/3),Math.floor(rows.length*2/3),rows.length-1].map(i=>new Date(rows[i].time).toLocaleString('en-GB',cfg.minutes<=DAY?{hour:'2-digit',minute:'2-digit'}:cfg.minutes<=DAY*30?{day:'numeric',month:'short'}:{month:'short',year:'2-digit'}))}
function render(period='1D',style='candle',height=310){
 const available=typeof document==='undefined'?720:(document.querySelector('#main-chart')?.clientWidth||document.documentElement.clientWidth-44);
 const rows=getSeries(period),W=Math.max(280,Math.min(720,available)),left=4,right=W-72,top=18,bottom=height-60,step=(right-left)/rows.length,body=Math.min(7,step*.64);
 const lowest=Math.min(...rows.map(c=>c.low)),highest=Math.max(...rows.map(c=>c.high)),pad=(highest-lowest)*.14,min=lowest-pad,max=highest+pad,range=max-min;
 const y=v=>top+(max-v)/range*(bottom-top),x=i=>left+step*(i+.5),last=rows.at(-1),color=last.close>=last.open?'#16A673':'#E45B64',maxVol=Math.max(...rows.map(c=>c.volume));let grid='',candles='',volumes='';
 for(let i=0;i<4;i++){let v=min+range*i/3,yy=y(v);grid+=`<path d="M0 ${yy.toFixed(2)}H${right+2}" class="market-grid"/><text x="${right+15}" y="${yy+4}" class="axis-price">${v.toFixed(3)}</text>`}
 rows.forEach((c,i)=>{const up=c.close>=c.open,fill=up?'#16A673':'#E45B64',xx=x(i),high=y(c.high),low=y(c.low),yy=y(Math.max(c.open,c.close)),h=Math.max(1.5,Math.abs(y(c.open)-y(c.close)));candles+=`<g class="market-candle ${i===rows.length-1?'latest-candle':''}" data-open="${c.open}" data-close="${c.close}" data-high="${c.high}" data-low="${c.low}"><path d="M${xx} ${high}V${low}" stroke="${fill}" stroke-width="1.1" vector-effect="non-scaling-stroke"/><rect x="${xx-body/2}" y="${yy}" width="${body}" height="${h}" rx=".65" fill="${fill}"/></g>`;let hVol=9+c.volume/maxVol*25;volumes+=`<rect x="${xx-body/2}" y="${height-hVol}" width="${body}" height="${hVol}" rx=".5" fill="${fill}" opacity=".18"/>`});
 let line=rows.map((c,i)=>(i?'L':'M')+x(i)+','+y(c.close)).join(' '),liveY=y(price);
 return `<div class="chart market-chart" data-chart="price" data-values="${rows.map(c=>c.close).join(',')}" data-times="${rows.map(c=>c.time).join(',')}" data-period="${period}" data-plot-ratio="${right/W}" style="height:${height}px"><svg viewBox="0 0 ${W} ${height}" preserveAspectRatio="none" role="img" aria-label="STRATO ${period} ${style==='candle'?'candlestick':'price'} chart">${grid}${volumes}${style==='candle'?candles:`<path d="${line}L${x(rows.length-1)},${bottom}L${x(0)},${bottom}Z" fill="#3452ff" opacity=".045"/><path d="${line}" fill="none" stroke="#3452ff" stroke-width="2" vector-effect="non-scaling-stroke"/>`}<path d="M0 ${liveY}H${right+3}" stroke="${color}" stroke-width=".8" stroke-dasharray="3 4" opacity=".65" vector-effect="non-scaling-stroke"/><rect x="${right+7}" y="${liveY-10}" width="65" height="20" rx="4" fill="${color}"/><text x="${right+39}" y="${liveY+4}" text-anchor="middle" class="live-axis-price">${price.toFixed(4)}</text>${style==='line'?`<circle cx="${x(rows.length-1)}" cy="${liveY}" r="3" fill="#3452ff"/>`:''}</svg><div class="chart-hover"><div class="chart-tooltip"></div></div></div>`;
}
root.StratoMarket={getSeries,tick,summary,labels,render,get price(){return price}};
})(typeof window!=='undefined'?window:globalThis);
