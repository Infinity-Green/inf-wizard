// showValidators.js

const { ethers } = require('ethers')
const { stakingABI } = require('../../abi/stakingABI')
const { urls, contracts } = require('../../config/index')

async function showValidators() {
  try {
    console.log('Connecting to Infinity-Green network...')

    const provider = new ethers.providers.JsonRpcProvider(
      urls.mainnet_rpc.http_rpc,
    )

    console.log('Connected to Infinity-Green network successfully.')

    // Load the contract
    const contract = new ethers.Contract(
      contracts.contracts.staking,
      stakingABI,
      provider,
    )

    console.log('Contract loaded successfully.')

    console.log('Fetching validators...')

    // Fetch all validators and their stakes
    const [validators, totalStake] = await Promise.all([
      contract.validators(),
      contract.stakedAmount(),
    ])

    console.log(
      'Total inf Staked by Validators : ',
      ethers.utils.formatEther(totalStake) + ' INF',
    )

    console.log('Validators:')

    // Display results
    validators.forEach(async (validator, index) => {
      console.log(`${index + 1}. ${validator}`)
    })
  } catch (error) {
    console.error('Error occurred while fetching validators:', error)
  }
}

module.exports = { showValidators }
