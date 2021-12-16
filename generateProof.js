PRIVATE_KEY_PATH = 'secrets/id_rsa';
PUBLIC_KEY_PATH = 'secrets/id_rsa.pub';

const openpgp = require('openpgp');
const fs = require('fs');

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

function generateMessage(name, date) {
  return 'Proof of 1F35C GitHub User Ownership\n' +
         'Signed for: ' + name + '\n' + 
         'Date:' + date.toUTCString();
}

async function sign(message) {
    const privateKey = await openpgp.readPrivateKey({ armoredKey: fs.readFileSync(PRIVATE_KEY_PATH).toString() });
    const unsignedMessage = await openpgp.createCleartextMessage({ text: message });
    const cleartextMessage = await openpgp.sign({
        message: unsignedMessage,
        signingKeys: privateKey
    });
    return cleartextMessage.toString();
}


readline.question('Enter the name of organization:', org => {
  let message = generateMessage(org, new Date());
  (async() => {
    try {
      console.log(await sign(message));
    } catch(err) {
      console.error(err);
    } finally {
      readline.close();
    }
  })();
});

