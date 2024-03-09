// searchTransaction.js

const { ethers } = require('ethers')
const { urls } = require('./../../config/index')

async function searchTransaction(transactionHash) {
  try {
    const provider = new ethers.providers.JsonRpcProvider(
      urls.mainnet_rpc.http_rpc,
    )

    // Get transaction details using transaction hash
    const transaction = await provider.getTransaction(transactionHash)

    if (!transaction) {
      throw new Error(`Transaction with hash ${transactionHash} not found.`)
    }

    // Prepare the result object
    const result = {
      hash: transaction.hash,
      blockNumber: transaction.blockNumber,
      from: transaction.from,
      to: transaction.to,
      value: ethers.utils.formatEther(transaction.value),
      gasPrice: ethers.utils.formatEther(transaction.gasPrice),
      gasLimit: transaction.gasLimit,
      nonce: transaction.nonce,
      timestamp: new Date(transaction.timestamp * 1000).toLocaleString(),
      confirmations:
        (await provider.getBlockNumber()) - transaction.blockNumber,
    }

    return result
  } catch (error) {
    throw new Error(
      `Error occurred while searching transaction details: ${error.message}`,
    )
  }
}

module.exports = { searchTransaction }
