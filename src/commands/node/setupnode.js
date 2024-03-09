const { execSync } = require('child_process')

function initSecrets(dataDir) {
  try {
    const command = `./inf secrets init --data-dir ${dataDir} --insecure`

    // Print the command being executed
    console.log(`Executing command: ${command}`)

    // Execute the command and capture the output
    const result = execSync(command, { encoding: 'utf-8' })

    // Print the output of the command
    console.log(result)
  } catch (error) {
    console.error('An error occurred:', error.message)
  }
}

module.exports = initSecrets
