/* Design-only quote and balance engine. No transaction is submitted. */
(function(root){'use strict';
function rate(asset,stratoPrice){const value=asset.asset==='STRATO'?stratoPrice:asset.rate;if(!Number.isFinite(value)||value<=0)throw Error('Price unavailable');return value}
function balance(state,a){return a.asset==='STRATO'?state.available:a.asset==='USDST'?state.usdst:(state.sourceBalances?.[a.id]??a.balance)}
function quote(from,to,payQty,stratoPrice,slippage=.5){
 if(!from.direct||!to.direct||from.asset===to.asset)throw Error('Choose two different assets on STRATO');
 if(!Number.isFinite(payQty)||payQty<=0)throw Error('Enter an amount to swap');
 const fromRate=rate(from,stratoPrice),toRate=rate(to,stratoPrice),usd=payQty*fromRate,receiveQty=usd/toRate;
 if(!Number.isFinite(usd)||!Number.isFinite(receiveQty))throw Error('Amount is too large');
 return Object.freeze({fromId:from.id,toId:to.id,fromAsset:from.asset,toAsset:to.asset,payQty,receiveQty,usd,fromRate,toRate,minimum:receiveQty*(1-slippage/100)});
}
function apply(state,q,assets){
 const from=assets.find(a=>a.id===q.fromId),to=assets.find(a=>a.id===q.toId);
 if(!from||!to||!from.direct||!to.direct||from.id===to.id)throw Error('Invalid swap pair');
 if(!Number.isFinite(q.payQty)||q.payQty<=0||!Number.isFinite(q.receiveQty)||q.receiveQty<=0)throw Error('Invalid swap amount');
 if(balance(state,from)+1e-9<q.payQty)throw Error('Not enough '+from.asset);
 const next={...state,sourceBalances:{...(state.sourceBalances||{})}};
 function set(a,value){value=Math.max(0,value);if(a.asset==='STRATO')next.available=value;else if(a.asset==='USDST')next.usdst=value;else next.sourceBalances[a.id]=value}
 set(from,balance(state,from)-q.payQty);set(to,balance(state,to)+q.receiveQty);return next;
}
root.StratoSwap={rate,balance,quote,apply};
})(typeof window!=='undefined'?window:globalThis);
