PRIVATE_KEY_PATH = 'secrets/id_rsa';
PUBLIC_KEY_PATH = 'secrets/id_rsa.pub';

const fs = require('fs');
const sign = require('./sign').sign;

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

function generateMessage(name, date) {
  return 'Proof of 1F35C GitHub User Ownership\n' +
         'Signed for: ' + name + '\n' + 
         'Date:' + date.toUTCString();
}

readline.question('Enter the name of organization:', org => {
  let message = generateMessage(org, new Date());
  (async() => {
    try {
      let privateKey = fs.readFileSync(PRIVATE_KEY_PATH).toString();
      console.log(await sign(message, privateKey));
    } catch(err) {
      console.error(err);
    } finally {
      readline.close();
    }
  })();
});

