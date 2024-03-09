// findblock.js

const { ethers } = require('ethers')
const { urls } = require('../../config/index')

async function findBlock(blockNumber) {
  const provider = new ethers.providers.JsonRpcProvider(
    urls.mainnet_rpc.http_rpc,
  )
  const block = await provider.getBlock(blockNumber)

  // Convert timestamp to a readable format
  const timestamp = new Date(block.timestamp * 1000).toLocaleString()

  // Add the readable timestamp to the block object
  block.readableTimestamp = timestamp

  return block
}

module.exports = { findBlock }
