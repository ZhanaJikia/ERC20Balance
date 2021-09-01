const Web3 = require("web3");

const { converter } = require('./converter')

const provider = "https://mainnet.infura.io/v3/b8fa89d40a4f4259954d465558d05c0a"

const Web3Client = new Web3(new Web3.providers.HttpProvider(provider));

const minABI = [{
  constant: true,
  inputs: [{ name: "_owner", type: "address" }],
  name: "balanceOf",
  outputs: [{ name: "balance", type: "uint256" }],
  type: "function",
}];

async function getBalance(walletAddress, contractAddress) {
  const contract = new Web3Client.eth.Contract(minABI, contractAddress);
  const wei = await contract.methods.balanceOf(walletAddress).call();
  
  
  const eth = wei / 1_000_000_000_000_000_000

  console.log(`${eth} ETH`)
  console.log(`${await converter(eth)} USDT`)
}

const walletAddress = "0xc1aae9d18bbe386b102435a8632c8063d31e747c";
const contractAddress = "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2";

getBalance(walletAddress, contractAddress);
module.exports = { getBalance };
