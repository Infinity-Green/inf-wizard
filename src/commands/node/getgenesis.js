const fs = require('fs')

// Function to generate genesis JSON
function generateGenesisJson() {
  const genesis = {
   //WILL ADD SOON 
  }

  // Write genesis JSON to file
  fs.writeFileSync('genesis.json', JSON.stringify(genesis, null, 2))

  console.log('genesis.json file generated successfully.')
}

module.exports = generateGenesisJson
