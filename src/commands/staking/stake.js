const { ethers } = require('ethers')
const { stakingABI } = require('./../../abi/stakingABI')
const { urls, contracts } = require('./../../config/index')

async function stakeinf(privateKey) {
  try {
    console.log('Connecting to Infinity-Green network...')

    const provider = new ethers.providers.JsonRpcProvider(urls.mainnet_rpc)
    const wallet = new ethers.Wallet(privateKey, provider)

    console.log('Connected to Infinity-Green network successfully.')

    // Load the contract
    const contract = new ethers.Contract(
      contracts.contracts.staking,
      stakingABI,
      wallet,
    )

    console.log('Contract loaded successfully.')

    const INFToStake = ethers.utils.parseEther('100')
    console.log(`Staking ${ethers.utils.formatEther(INFToStake)} INF...`)

    // Execute the stake function
    const tx = await contract.stake({ value: INFToStake })

    console.log('Stake request sent. Waiting for confirmation...')

    // Wait for the transaction to be confirmed
    await tx.wait()

    console.log('Stake successful!')
    console.log('Transaction hash:', tx.hash)
  } catch (error) {
    console.error('Error occurred while staking INF:', error)
  }
}

module.exports = { stakeinf }
