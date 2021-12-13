const openpgp = require('openpgp');
const fs = require('fs');

PRIVATE_KEY_PATH = 'secrets/id_rsa';
PUBLIC_KEY_PATH = 'secrets/id_rsa.pub';

function generateMessage(organization, date) {
  return 'Proof of 1F35C GitHub User Ownership\n' +
         'Signed for: ' + organization + '\n' + 
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

    // TODO: Remove 
    const publicKey = fs.readFileSync(PUBLIC_KEY_PATH).toString();
    console.log(await checkKey(signed, publicKey));

  } catch(err) {
    console.error(err);
  }
})(generateMessage('ABC', new Date()));

// Verify 
async function checkKey(message, publicKeyString) {
  try {
    const signedMessage = await openpgp.readCleartextMessage({ cleartextMessage: message });
    const publicKey = await openpgp.readKey({ armoredKey: publicKeyString });
    return await openpgp.verify({
        message: signedMessage,
        verificationKeys: publicKey
    });

  } catch(err) {
    console.error(err);
  }
}
