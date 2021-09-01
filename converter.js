const fetch = require('node-fetch')


const converter = async eth => {
  const response  = await fetch('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USDT')
  const { USDT } = await response.json();
  
  return USDT * eth
}

module.exports = { converter }


