const { execSync } = require('child_process');
const https = require('http');
const fs = require('fs');
const path = require('path');
const ProgressBar = require('progress');
const ipfsGatewayURL = 'http://api-ipfs.web3twenty.com:3002';

function downloadAndInstallBinary(url, targetPath) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (response) => {
        if (response.statusCode !== 200) {
          reject(`Failed to download file, status code: ${response.statusCode}`);
          return;
        }

        const totalLength = parseInt(response.headers['content-length'], 10);
        const progressBar = new ProgressBar(
          'Downloading [:bar] :percent :etas',
          {
            width: 20,
            total: totalLength,
          },
        );

        const file = fs.createWriteStream(targetPath);

        response.on('data', (chunk) => {
          progressBar.tick(chunk.length);
          file.write(chunk);
        });

        response.on('end', () => {
          file.end();
          console.log('Binary downloaded successfully.');
          // Set execute permission
          fs.chmodSync(targetPath, '755');
          console.log('INF binary installed successfully.');

          // Add a delay before executing the binary
          setTimeout(() => {
            // Display the version of the application
            execSync('./inf version', { stdio: 'inherit' });
            resolve();
          }, 1000);
        });

        file.on('error', (err) => {
          fs.unlink(targetPath, () => {
            reject(`Failed to download file: ${err.message}`);
          });
        });
      })
      .on('error', (error) => {
        reject(`Failed to download file: ${error.message}`);
      });
  });
}

function install_inf() {
  const ipfsHash = 'QmPovMcKsJLkrXHfFQ4HVuLUuq23yNcZATskuSRgn8tezp';
  const targetFileName = 'inf';
  const targetPath = path.join(process.cwd(), targetFileName);

  console.log('Downloading binary...');

  const ipfsURL = `${ipfsGatewayURL}/ipfs/${ipfsHash}`;

  downloadAndInstallBinary(ipfsURL, targetPath)
    .then(() => {
      console.log('Binary downloaded successfully.');
      // Set execute permission
      fs.chmodSync(targetPath, '755');
    })
    .catch((error) => {
      console.error('An error occurred:', error);
    });
}

module.exports = install_inf;
