const openpgp = require('openpgp');

exports.sign = async (message, privateKeyText) => {
  const privateKey = await openpgp.readPrivateKey({ armoredKey: privateKeyText });
  const unsignedMessage = await openpgp.createCleartextMessage({ text: message });
  const cleartextMessage = await openpgp.sign({
      message: unsignedMessage,
      signingKeys: privateKey
  });
  return cleartextMessage.toString().trim();
}
