const { ethers } = require('ethers')
const { urls } = require('./../../config/index')

async function checkAddress(address) {
  try {
    const provider = new ethers.providers.JsonRpcProvider(
      urls.mainnet_rpc.http_rpc,
    )

    // Get balance of the address
    const balance = await provider.getBalance(address)

    // Get transaction count (number of transactions) of the address
    const transactionCount = await provider.getTransactionCount(address)

    // Get code (smart contract bytecode) at the address
    const code = await provider.getCode(address)

    // Get ENS name (if available) associated with the address
    // const ensName = await provider.lookupAddress(address);

    // Prepare the result object
    const result = {
      address,
      balance: ethers.utils.formatEther(balance),
      transactionCount,
      codeExists: code !== '0x',
      //ensName: ensName || 'Not available'
    }

    return result
  } catch (error) {
    throw new Error(
      `Error occurred while checking address details: ${error.message}`,
    )
  }
}

module.exports = { checkAddress }
