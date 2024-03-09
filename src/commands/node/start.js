const { spawn } = require('child_process')

// Start the INF server
function startINFServer() {
  try {
    // Start the INF server
    const infServerCommand =
      './inf server --data-dir=node --chain genesis.json --libp2p 0.0.0.0:10001 --nat 0.0.0.0 --jsonrpc 0.0.0.0:8545 --seal --block-gas-target 5000000000'

    console.log('Starting INF server...')
    const infServerProcess = spawn('sh', ['-c', infServerCommand])

    infServerProcess.stdout.on('data', (data) => {
      console.log(`INF server stdout: ${data}`)
    })

    infServerProcess.stderr.on('data', (data) => {
      console.error(`INF server stderr: ${data}`)
    })

    infServerProcess.on('close', (code) => {
      if (code === 0) {
        console.log('INF server started successfully.')
      } else {
        console.error(`INF server process exited with code ${code}.`)
      }
    })
  } catch (error) {
    console.error('An error occurred:', error.message)
  }
}

module.exports = startINFServer
