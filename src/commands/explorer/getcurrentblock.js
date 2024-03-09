const { ethers } = require('ethers')
const { urls } = require('../../config/index')

async function getCurrentBlockDetails() {
  const provider = new ethers.providers.JsonRpcProvider(
    urls.mainnet_rpc.http_rpc,
  )
  const blockNumber = await provider.getBlockNumber()
  const block = await provider.getBlock(blockNumber)
  const { hash, number, timestamp, transactions } = block
  const humanReadableTimestamp = new Date(timestamp * 1000).toLocaleString() // Convert Unix timestamp to human-readable format
  return { hash, number, timestamp: humanReadableTimestamp, transactions }
}

module.exports = getCurrentBlockDetails
