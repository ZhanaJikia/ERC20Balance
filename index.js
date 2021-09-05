const Web3 = require("web3");

(async () => {

  const provider = "https://mainnet.infura.io/v3/b8fa89d40a4f4259954d465558d05c0a"

  const Web3Client = new Web3(new Web3.providers.HttpProvider(provider))

  const minABI = [
    {
      constant: true,
      inputs: [],
      name: "symbol",
      outputs: [{ name: "symbol", type: "string" }],
      type: "function"
    },
    {
      constant: true,
      inputs: [{ name: "_owner", type: "address" }],
      name: "balanceOf",
      outputs: [{ name: "balance", type: "uint256" }],
      type: "function",
    }
  ]

  const getBalance = async ({ walletAddress, contractAddress }) => {
    const contract = new Web3Client.eth.Contract(minABI, contractAddress)
    
    const balance = await contract.methods.balanceOf(walletAddress).call()
    const symbol = await contract.methods.symbol().call()

    return `${balance / 1.0e+6} ${symbol}`
  }

  let result = ''

  result = await getBalance({
    walletAddress: '0xc1aae9d18bbe386b102435a8632c8063d31e747c',
    contractAddress:'0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'
  })
  console.log(result)
  // 175000 WETH



  result = await getBalance({
    walletAddress: '0x8a446971dbb112f3be15bc38c14d44b94d9e94b9',
    contractAddress:'0xdac17f958d2ee523a2206206994597c13d831ec7'
  })
  console.log(result)
  // 105216876.440195 USDT

})()