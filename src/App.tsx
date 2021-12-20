import React from 'react';
import { ReactElement, useState, useEffect } from 'react';
import './App.css';
import { pubkey } from './id_rsa.pub';
import { validExample, invalidExample } from './example';
import * as openpgp from 'openpgp';

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
      Description of this webpage
      </div>
    </div>
  );
}


export default App;
