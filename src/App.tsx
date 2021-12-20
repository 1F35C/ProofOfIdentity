import React from 'react';
import { ReactElement, useState, useEffect } from 'react';
import './App.css';
import { pubkey } from './id_rsa.pub';
import { validExample, invalidExample } from './example';
import * as openpgp from 'openpgp';

const GITHUB_URL = "https://github.com/1F35C/signature-verifier";
function getGithubFileURL(filepath: string) {
  return GITHUB_URL + '/blob/main/' + filepath;
};

async function checkKey(message: string, publicKeyString: string) : Promise<boolean> {
  if (!message || message.length === 0) {
    throw new Error("Message is empty");
  }
  let signedMessageAsync = await openpgp.readCleartextMessage({ cleartextMessage: message });
  let publicKeyAsync = openpgp.readKey({ armoredKey: publicKeyString });
  let [signedMessage, publicKey] = await Promise.all([signedMessageAsync, publicKeyAsync]);
  let verifyOptions: any = {
      message: signedMessage,
      verificationKeys: publicKey,
      expectSigned: true
  };
  let result = await openpgp.verify(verifyOptions);
  return await result.signatures[0].verified;
}

enum PGPState {
  Hidden,
  Loading,
  Verified,
  Failed
};

type PGPResult = {
  state: PGPState;
  error: string | undefined;
};

const Loading = (): JSX.Element => {
  return (
    <div className="box-section centered loading">
      <img className="icon" src="stopwatch.svg" alt=""/>
      <br />
      <span className="status">
        Verifying...
      </span>
    </div>
  );
};

const Verified = (): JSX.Element => {
  return (
    <div className="box-section centered loading">
      <img className="icon" src="success.svg" alt=""/>
      <br />
      <span className="status">
        Verified
      </span>
    </div>
  );
}

const Failed = ({ error } : { error: string }): JSX.Element => {
  return (
    <div className="box-section centered loading">
      <img className="icon" src="error.svg" alt=""/>
      <br />
      <span className="status">
        Verification Failed
      </span>
      <br />
      <span className="detail">
        { error }
      </span>
    </div>
  );
}

function getResultView(result: PGPResult): JSX.Element {
  switch (result.state) {
    case PGPState.Hidden:
      return (<div />);
    case PGPState.Loading:
      return Loading();
    case PGPState.Verified:
      return Verified();
    case PGPState.Failed:
      return Failed({ error: result.error ?? "unknown" });
    default:
      throw new Error('Invalid result value');
  }
}

function App(): ReactElement {
  let [message, setMessage] = useState<string>("");
  let [result, setResult] = useState<PGPResult>({ state: PGPState.Hidden, error: undefined });

  useEffect(() => {
    if (message === "") {
      setResult({ state: PGPState.Hidden, error: undefined });
    } else {
      setResult({ state: PGPState.Loading, error: undefined });
      checkKey(message, pubkey)
          .then(() => {
            setResult({ state: PGPState.Verified, error: undefined });
          })
          .catch((err) => {
            setResult({ state: PGPState.Failed, error: err.message });
          });
    }
  }, [message]);

  return (
    <div className="App">
      <div className="box">
				<div className="box-section">
					<h1>Signature Verifier</h1>
				</div>
				<div className="box-section">
					Please paste your signed signature below:
					<textarea className="signature-field" onChange={ (evt) => { setMessage(evt.target.value); } } autoFocus={ true } value={ message } />
          <button onClick={ () => { setMessage(validExample); } }>Valid Example</button>
          <button onClick={ () => { setMessage(invalidExample); } }>Invalid Example</button>
				</div>
				{getResultView(result)}
			</div>
      <div className="box">
        <h2>What?</h2>
        <p>
          This is a webpage where you can check whether a message was written by the owner of this repository.
        </p>
        <h2>Why?</h2>
        <p>
          Mostly for educational purposes. This was a good chance to learn more about RSA, and how to use it in practice.
        </p>
        <p>
          Later, this could be useful if I wanted to take credit for this GitHub user in real life without compromising anonymity on the web.
          E.g. Sending a potential employer a signed message that they can verify on this page.
        </p>
        <h2>How?</h2>
        <p>
          This project uses <a href="https://en.wikipedia.org/wiki/RSA_(cryptosystem)">RSA asymmetric cryptography</a> to verify the source of signed messages.
        </p>
        <p>
          First a private/public key pair is generated using RSA.
          The private key can be used to sign a message, and the public key can be used to verify the message.
        </p>
        <p>
          The private key should be safeguarded, only accessible to the person signing messages.
          The public key can be sent out to anyone who wants to verify the message, as the public key cannot be used to sign messages.
          In this case, the public key is embedded to the webpage for easy signature verification.
        </p>
        <ul>
          <li><a href={ getGithubFileURL('generateKeys.js') }>generateKeys.js</a> is used to generate the private/public key pair, storing the private key in a gitignored directory, and updating JS to use the new public key.</li>
          <li><a href={ getGithubFileURL('generateProof.js') }>generateProof.js</a> is used to generate a message that is signed with a private key.</li>
        </ul>
        For more information, here's the <a href={ GITHUB_URL }>repository</a>!
        <h2>Attributions</h2>
        <ul>
          <li><a href="">openpgp.js</a> for RSA implementation (key generation/signing/signature verification)</li>
          <li><a href="https://www.svgrepo.com/collection/essential-collection/1">svgrepo.com</a> for icons</li>
        </ul>
      </div>
    </div>
  );
}


export default App;
