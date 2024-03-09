// createWallet.js

const fs = require('fs')
const path = require('path')
const { ethers } = require('ethers')

// Function to create a new wallet
async function createWallet(pathToStore) {
  try {
    // Generate a new wallet
    const wallet = ethers.Wallet.createRandom()

    // Get the private key and mnemonic phrase of the wallet
    const privateKey = wallet.privateKey
    const mnemonic = wallet.mnemonic.phrase

    // Get the address of the wallet
    const address = wallet.address

    // Log private key and mnemonic phrase and address
    console.log('Your Address is:', address)
    console.log('Private Key:', privateKey)
    console.log('Mnemonic Phrase:', mnemonic)

    // Ensure the directory exists
    fs.mkdirSync(pathToStore, { recursive: true })

    // Write the wallet address and private key to a file
    const filePath = path.join(pathToStore, 'wallet.txt')
    fs.writeFileSync(
      filePath,
      `Address: ${address}\nPrivate Key: ${privateKey}\nMnemonic Phrase: ${mnemonic}`,
    )

    console.log(`Wallet created successfully and stored at: ${filePath}`)
  } catch (error) {
    console.error('Error occurred while creating wallet:', error)
  }
}

module.exports = {
  createWallet,
}
