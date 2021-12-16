const openpgp = require('openpgp');
const fs = require('fs');

PRIVATE_KEY_PATH = 'secrets/id_rsa';
PUBLIC_KEY_PATH = 'secrets/id_rsa.pub';

function generateMessage(name, date) {
  return 'Proof of 1F35C GitHub User Ownership\n' +
         'Signed for: ' + name + '\n' + 
         'Date:' + date.toUTCString();
}

// Sign 
(async(message) => {
  try {
    const privateKey = await openpgp.readPrivateKey({ armoredKey: fs.readFileSync(PRIVATE_KEY_PATH).toString() });
    const unsignedMessage = await openpgp.createCleartextMessage({ text: message });
    const cleartextMessage = await openpgp.sign({
        message: unsignedMessage,
        signingKeys: privateKey
    });
    signed = cleartextMessage.toString();
    console.log(signed);
  } catch(err) {
    console.error(err);
  }
})(generateMessage('ABC', new Date()));


