const {test}=require('node:test');const assert=require('node:assert/strict');
require('../dist/market.js');const market=globalThis.StratoMarket;
test('periods have distinct horizons and realistic continuous OHLC bounds',()=>{
 const horizons=[];const signatures=new Set();
 for(const p of ['1H','1D','1W','1M','1Y','ALL']){
  const rows=market.getSeries(p);assert.ok(rows.length>=50);
  rows.forEach((c,i)=>{assert.ok(c.high>=Math.max(c.open,c.close));assert.ok(c.low<=Math.min(c.open,c.close));assert.ok(c.low>0);assert.ok(c.volume>0);if(i)assert.equal(c.open,rows[i-1].close)});
  horizons.push(rows.at(-1).time-rows[0].time);signatures.add(rows.map(c=>c.close.toFixed(3)).join(','));
  assert.equal(rows.at(-1).close,market.price);
 }
 assert.equal(signatures.size,6);for(let i=1;i<horizons.length;i++)assert.ok(horizons[i]>horizons[i-1]);
});
test('live ticks update the latest candle while preserving completed history',()=>{
 const rows=market.getSeries('1D'),first=JSON.stringify(rows[0]),before=market.price;
 market.tick();const after=market.getSeries('1D');assert.notEqual(market.price,before);assert.equal(after.at(-1).close,market.price);assert.equal(JSON.stringify(after[0]),first);
 assert.ok(after.at(-1).high>=after.at(-1).close);assert.ok(after.at(-1).low<=after.at(-1).close);
});
test('renderer supplies independent green/red candle bodies, volume and current price',()=>{
 const html=market.render('1D');assert.match(html,/market-candle/);assert.match(html,/#16A673/);assert.match(html,/#E45B64/);assert.match(html,/live-axis-price/);assert.match(html,/data-times/);
});
