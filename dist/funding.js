/* Real mainnet identities verified against STRATO registry and per-chain bridge configuration.
   Balances and conversion rates are design fixtures. See README for provenance. */
(function(root){'use strict';
const routes=[
  {
    "id": "ethereum-usdc",
    "asset": "USDC",
    "network": "Ethereum",
    "chainId": 1,
    "icon": "token-usdc.png",
    "rate": 1,
    "balance": 10000,
    "native": false,
    "address": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    "destinationAddress": "0x6aeacaa19c68e53035bf495d15e0a328fc600ba8"
  },
  {
    "id": "ethereum-usdt",
    "asset": "USDT",
    "network": "Ethereum",
    "chainId": 1,
    "icon": "token-usdt.png",
    "rate": 1,
    "balance": 900,
    "native": false,
    "address": "0xdac17f958d2ee523a2206206994597c13d831ec7",
    "destinationAddress": "0x5ed0bdfb378ac0d06249d70759536d7a41906216"
  },
  {
    "id": "ethereum-eth",
    "asset": "ETH",
    "network": "Ethereum",
    "chainId": 1,
    "icon": "token-eth.png",
    "rate": 3000,
    "balance": 1.2,
    "native": true,
    "address": null,
    "destinationAddress": "0x93fb7295859b2d70199e0a4883b7c320cf874e6c"
  },
  {
    "id": "base-usdc",
    "asset": "USDC",
    "network": "Base",
    "chainId": 8453,
    "icon": "token-usdc.png",
    "rate": 1,
    "balance": 10000,
    "native": false,
    "address": "0x833589fcd6edb6e08f4c7c32d4f71b54bda02913",
    "destinationAddress": "0x6aeacaa19c68e53035bf495d15e0a328fc600ba8"
  },
  {
    "id": "base-eth",
    "asset": "ETH",
    "network": "Base",
    "chainId": 8453,
    "icon": "token-eth.png",
    "rate": 3000,
    "balance": 1.2,
    "native": true,
    "address": null,
    "destinationAddress": "0x93fb7295859b2d70199e0a4883b7c320cf874e6c"
  },
  {
    "id": "linea-usdc",
    "asset": "USDC",
    "network": "Linea",
    "chainId": 59144,
    "icon": "token-usdc.png",
    "rate": 1,
    "balance": 10000,
    "native": false,
    "address": "0x176211869ca2b568f2a7d4ee941e073a821ee1ff",
    "destinationAddress": "0x6aeacaa19c68e53035bf495d15e0a328fc600ba8"
  },
  {
    "id": "ethereum-booe",
    "asset": "BOOE",
    "network": "Ethereum",
    "chainId": 1,
    "icon": "token-booe.png",
    "rate": 0.2,
    "balance": 4000,
    "native": false,
    "address": "0x289ff00235d2b98b0145ff5d4435d3e92f9540a6",
    "destinationAddress": "0x3103810e081d965f5f8b19195fd7f5f859ccb4f9"
  },
  {
    "id": "ethereum-silvst",
    "asset": "SILVST",
    "network": "Ethereum",
    "chainId": 1,
    "icon": "token-silvst.png",
    "rate": 1.1,
    "balance": 1500,
    "native": false,
    "address": "0x5925525658c86d2c3117f79c0c88203cbec812c1",
    "destinationAddress": "0x2c59ef92d08efde71fe1a1cb5b45f4f6d48fcc94"
  },
  {
    "id": "ethereum-usdst",
    "asset": "USDST",
    "network": "Ethereum",
    "chainId": 1,
    "icon": "token-usdst.png",
    "rate": 1,
    "balance": 500,
    "native": false,
    "address": "0xaebcdbd9f8b1422ab31073d7408c8cad83ca6a8b",
    "destinationAddress": "0x937efa7e3a77e20bbdbd7c0d32b6514f368c1010"
  },
  {
    "id": "ethereum-goldst",
    "asset": "GOLDST",
    "network": "Ethereum",
    "chainId": 1,
    "icon": "token-goldst.png",
    "rate": 85,
    "balance": 12,
    "native": false,
    "address": "0xf6c8a66788fddea78eb4654a8b5674b2fe1857cb",
    "destinationAddress": "0xcdc93d30182125e05eec985b631c7c61b3f63ff0"
  },
  {
    "id": "base-cbdoge",
    "asset": "cbDOGE",
    "network": "Base",
    "chainId": 8453,
    "icon": "token-cbdoge.png",
    "rate": 0.18,
    "balance": 4000,
    "native": false,
    "address": "0xcbd06e5a2b0c65597161de254aa074e489deb510",
    "destinationAddress": "0x27920067dc1f55fcc0d2ee73f07d15d1aafe9d2a"
  },
  {
    "id": "robinhood-spy",
    "asset": "SPY",
    "network": "Robinhood",
    "chainId": 4663,
    "icon": "token-spy.png",
    "rate": 600,
    "balance": 3,
    "native": false,
    "address": "0x117cc2133c37b721f49de2a7a74833232b3b4c0c",
    "destinationAddress": "0x19a7ebee83ed53cb5917aad3f2b1c2cd37da771d"
  },
  {
    "id": "robinhood-nvda",
    "asset": "NVDA",
    "network": "Robinhood",
    "chainId": 4663,
    "icon": "token-nvda.png",
    "rate": 145,
    "balance": 12,
    "native": false,
    "address": "0xd0601ce157db5bdc3162bbac2a2c8af5320d9eec",
    "destinationAddress": "0xb8fa2db41236b1421eb8aea8a52826ba32096fbf"
  },
  {
    "id": "strato-usdst",
    "asset": "USDST",
    "network": "STRATO",
    "icon": "token-usdst.png",
    "rate": 1,
    "balance": 500,
    "direct": true,
    "address": "0x937efa7e3a77e20bbdbd7c0d32b6514f368c1010"
  },
  {
    "id": "strato-eth",
    "asset": "ETH",
    "network": "STRATO",
    "icon": "token-eth.png",
    "rate": 3000,
    "balance": 1.2,
    "direct": true,
    "address": "0x93fb7295859b2d70199e0a4883b7c320cf874e6c"
  },
  {
    "id": "strato-usdc",
    "asset": "USDC",
    "network": "STRATO",
    "icon": "token-usdc.png",
    "rate": 1,
    "balance": 1200,
    "direct": true,
    "address": "0x6aeacaa19c68e53035bf495d15e0a328fc600ba8"
  },
  {
    "id": "strato-usdt",
    "asset": "USDT",
    "network": "STRATO",
    "icon": "token-usdt.png",
    "rate": 1,
    "balance": 900,
    "direct": true,
    "address": "0x5ed0bdfb378ac0d06249d70759536d7a41906216"
  },
  {
    "id": "strato-cbdoge",
    "asset": "cbDOGE",
    "network": "STRATO",
    "icon": "token-cbdoge.png",
    "rate": 0.18,
    "balance": 4000,
    "direct": true,
    "address": "0x27920067dc1f55fcc0d2ee73f07d15d1aafe9d2a"
  },
  {
    "id": "strato-goldst",
    "asset": "GOLDST",
    "network": "STRATO",
    "icon": "token-goldst.png",
    "rate": 85,
    "balance": 12,
    "direct": true,
    "address": "0xcdc93d30182125e05eec985b631c7c61b3f63ff0"
  },
  {
    "id": "strato-silvst",
    "asset": "SILVST",
    "network": "STRATO",
    "icon": "token-silvst.png",
    "rate": 1.1,
    "balance": 1500,
    "direct": true,
    "address": "0x2c59ef92d08efde71fe1a1cb5b45f4f6d48fcc94"
  },
  {
    "id": "strato-spy",
    "asset": "SPY",
    "network": "STRATO",
    "icon": "token-spy.png",
    "rate": 600,
    "balance": 3,
    "direct": true,
    "address": "0x19a7ebee83ed53cb5917aad3f2b1c2cd37da771d"
  },
  {
    "id": "strato-nvda",
    "asset": "NVDA",
    "network": "STRATO",
    "icon": "token-nvda.png",
    "rate": 145,
    "balance": 12,
    "direct": true,
    "address": "0xb8fa2db41236b1421eb8aea8a52826ba32096fbf"
  },
  {
    "id": "strato-booe",
    "asset": "BOOE",
    "network": "STRATO",
    "icon": "token-booe.png",
    "rate": 0.2,
    "balance": 4000,
    "direct": true,
    "address": "0x3103810e081d965f5f8b19195fd7f5f859ccb4f9"
  },
  {
    "id": "strato-strato",
    "asset": "STRATO",
    "network": "STRATO",
    "icon": "token-strato.png",
    "rate": 2.18,
    "balance": 0,
    "direct": true,
    "address": "0x2ca3e170e6714282da77815f7864b17f612f5f83"
  }
];
const output={"asset": "STRATO", "network": "STRATO", "address": "0x2ca3e170e6714282da77815f7864b17f612f5f83"};
root.StratoFunding={routes,output,get:id=>routes.find(r=>r.id===id)||routes.find(r=>r.id==='base-usdc')};
})(typeof window!=='undefined'?window:globalThis);
