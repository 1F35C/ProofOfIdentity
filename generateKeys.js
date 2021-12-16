const openpgp = require('openpgp');
const fs = require('fs');
const path = require('path');

const NAME ='1F35C';
const EMAIL = '95659230+1F35C@users.noreply.github.com';

const PRIVATE_KEY_PATH = 'secrets/id_rsa';
const PUBLIC_KEY_PATH = 'secrets/id_rsa.pub';
const PUBLIC_KEY_JS_PATH = 'src/id_rsa.pub.tsx';
const PUBLIC_KEY_JS_VARIABLE = 'pubkey';

function wrapAsVariable(variableName, data, isTypescript) {
  if (isTypescript) {
    return 'export const ' + variableName + ': string = `' + data + '`;';
  }
  return 'export const ' + variableName + ' = `' + data + '`;';
}

function mkdirForFileIfNotExists(filepath) {
    let fullDir = path.join(__dirname, filepath.substring(0, filepath.lastIndexOf('/')));
    fs.mkdirSync(fullDir, {recursive: true});
}

function getBackupFilepath(filepath) {
  let dateComponent = Date.now().toString();
  return filepath + '.bak.' + dateComponent;
}

function safeWriteFile(filepath, data) {
    mkdirForFileIfNotExists(PRIVATE_KEY_PATH);
    if (fs.statSync(filepath, { throwIfNoEntry: false })) {
      fs.copyFileSync(filepath, getBackupFilepath(filepath));
    }
    fs.writeFileSync(filepath, data);
}

// Generate
(async () => {
  let { privateKey, publicKey } = await openpgp.generateKey({
      type: 'rsa',
      rsaBits: 4096,
      userIDs: [{ name: NAME, email: EMAIL }],
      format: 'armored'
  });
  try {
    safeWriteFile(PUBLIC_KEY_JS_PATH, wrapAsVariable(PUBLIC_KEY_JS_VARIABLE, publicKey));
    safeWriteFile(PUBLIC_KEY_PATH, publicKey);
    safeWriteFile(PRIVATE_KEY_PATH, privateKey);
  } catch(err) {
    console.error(err);
  }
})();

