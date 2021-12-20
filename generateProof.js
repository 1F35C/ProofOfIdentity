'use strict';

const PRIVATE_KEY_PATH = 'secrets/id_rsa';
const PUBLIC_KEY_PATH = 'secrets/id_rsa.pub';

const fs = require('fs');
const sign = require('./sign').sign;
const readline = require('readline');

let settings = {
  mode: 'text'
}

async function generateMessage(name, date) {
  return 'Proof of 1F35C GitHub User Ownership\n' +
         'Signed for: ' + name + '\n' + 
         'Date:' + date.toUTCString();
}

function processArgs(args) {
  for (let idx = 0; idx < args.length; ++idx) {
    switch(args[idx]) {
      case '--org':
        settings.mode = 'org';
        break;
      default:
        throw new Error('Unknown option: ' + args[idx]);
    }

  }
}

function getMessage() {
  return new Promise((resolve, reject) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    switch (settings.mode) {
      case 'text':
       let text = '';
        console.log('Enter text (Ctrl-D to stop):');
        rl.on('line', line => {
          text += line + '\n';
        });
        rl.on('close', ()=> {
            resolve(text);
        });
        break
      case 'org':
        rl.question('Enter the name of organization:', org => {
          rl.close();
          resolve(generateMessage(org, new Date()));
        });
        break;
      default:
        reject('Invalid mode');
    }
  });
}
function main(args) {
  processArgs(args);
  (async() => {
    let message = await getMessage();
    try {
      let privateKey = fs.readFileSync(PRIVATE_KEY_PATH).toString();
      console.log(await sign(message, privateKey));
    } catch(err) {
      console.error(err);
    }
  })();
}

main(process.argv.slice(2));
