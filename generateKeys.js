'use strict';

const openpgp = require('openpgp');
const fs = require('fs');
const path = require('path');
const process = require('process');

const sign = require('./sign').sign;

const NAME ='1F35C';
const EMAIL = '95659230+1F35C@users.noreply.github.com';

const PRIVATE_KEY_PATH = 'secrets/id_rsa';
const PUBLIC_KEY_PATH = 'secrets/id_rsa.pub';
const PUBLIC_KEY_JS_PATH = 'src/id_rsa.pub.tsx';
const EXAMPLE_MESSAGE_JS_PATH = 'src/example.tsx';
const PUBLIC_KEY_JS_VARIABLE = 'pubkey';
const VALID_EXAMPLE_VARIABLE = 'validExample';
const INVALID_EXAMPLE_VARIABLE = 'invalidExample';

const SIGNED_EXAMPLE_TEXT = "This message was signed with the private key that is currently active";
const INVALID_EXAMPLE =
`-----BEGIN PGP SIGNED MESSAGE-----
Hash: SHA256

This message was signed with a different private key
-----BEGIN PGP SIGNATURE-----

wsFzBAEBCAAGBQJhvjrZACEJEK8WujUv4/UnFiEEqzjuybmkbhVdQLywrxa6
NS/j9Se6VRAAg/cogw1vDZZQGVouup0vEiz5gBDSMXXlQd/RgqP/ggZHtMkx
LQCmvvjsWkKE5a2ufblbD9ox3WdwGXJ8ww2GGtWZFdgZ9SjNBbXi5B4p5qBR
Ty9h3DMAowI9g2sD7Gv/eR8UfQvvQ8iWst1FGXyEsQNeGRopy6ucPqST1che
/9Am+mfonA3Oox935XcszmToQhFCjrhwaZHWlT3JP5wB06iC+WQQ0Q7B1pR4
kQzXcWVzrxP4E/RrdTXznlI3Sv+f9s0/kHCO401TaApVpZavDnszDZZRc9h6
WH76y73DZfkfqQGaRvTYR/TWox8mJQodHAdFmC23TTIuDZI/MT8Ab6G4aGiz
+EAm84jntlTVbhhTduK/wxhYZ0hgNp/IoPl/lEmQVlFb+fjR6XpCEz7HUA20
ATukxvka468g+xTe1lpOlkcET23jZjlFYiRYe1laQfpaOIsiarpmK12t9Zku
iE9PufTjcTtXFdmnTHqtnRMmR9z4v6Op+aGv36YUo1Z6s6T2cCx6W1+NqjB+
xVUSbvX7/15W0q/PILMmJFHsbo5Z7Mi3q+TgNMckPblBJLAYAbpm36hOBXfD
ZG1Y0tqIc77OmERq1QK/+PW9v3uvNL6tH4AAAtUfg1VFbq43uO5q7+J7sI3f
rq8Hp7aBVwEd6aDibKatzwjaCpfE0aLwH0U=
=DNkV
-----END PGP SIGNATURE-----`;

let settings = {
  dryrun: false,
  backup: true
};

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
    if (settings.dryrun) {
      console.log(filepath + ":");
      console.log(data);
      console.log();
      return;
    }

    mkdirForFileIfNotExists(PRIVATE_KEY_PATH);
    if (settings.backup && fs.statSync(filepath, { throwIfNoEntry: false })) {
      fs.copyFileSync(filepath, getBackupFilepath(filepath));
    }
    fs.writeFileSync(filepath, data);
}

function processArgs(args) {
  for (let idx = 0; idx < args.length; ++idx) {
    switch(args[idx]) {
      case '--dry-run':
        settings.dryrun = true;
        break;
      case '--no-backup':
        settings.backup = false;
        break;
      default:
        throw new Error('Unknown option: ' + args[idx]);
    }

  }
}

function main(args) {
  processArgs(args);
  (async () => {
    let { privateKey, publicKey } = await openpgp.generateKey({
        type: 'rsa',
        rsaBits: 4096,
        userIDs: [{ name: NAME, email: EMAIL }],
        format: 'armored'
    });

    let signedExample = await sign(SIGNED_EXAMPLE_TEXT, privateKey);
    let exampleJS =
        wrapAsVariable(VALID_EXAMPLE_VARIABLE, signedExample) + '\n' +
        wrapAsVariable(INVALID_EXAMPLE_VARIABLE, INVALID_EXAMPLE);

    try {
      safeWriteFile(PUBLIC_KEY_JS_PATH, wrapAsVariable(PUBLIC_KEY_JS_VARIABLE, publicKey));
      safeWriteFile(EXAMPLE_MESSAGE_JS_PATH, exampleJS);
      safeWriteFile(PUBLIC_KEY_PATH, publicKey);
      safeWriteFile(PRIVATE_KEY_PATH, privateKey);
    } catch(err) {
      console.error(err);
    }
  })().catch((err) => {
    console.error('We ran into an error:');
    console.error(err);
  });
}
main(process.argv.slice(2));
