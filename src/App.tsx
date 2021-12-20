import React from 'react';
import { FC, ReactElement, useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { pubkey } from './id_rsa.pub';
import { validExample, invalidExample } from './example';
import * as openpgp from 'openpgp';

//TODO: Remove
console.log(validExample);
console.log(invalidExample);

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

var msg = `
-----BEGIN PGP SIGNED MESSAGE-----
Hash: SHA256

Proof of 1F35C GitHub User Ownership
Signed for: ABC
Date:Thu, 16 Dec 2021 00:30:34 GMT
-----BEGIN PGP SIGNATURE-----

wsFzBAEBCAAGBQJhuoiqACEJEAewVL2K4IIUFiEEO0G9ic1OqZ/j/7ZHB7BU
vYrgghRkzxAAmwuLOWhwQmsKhoyLEbl84dedim1cX2spOOWk4cVwzuYstyza
7EPW2txXGwEqGk8jgN+rEAaac9EFPLqBIn+PI+ukKx0l3K9GUzvYYBHTU3QF
kECqHPsfmJCoF54Ce30fLoIkN/PxmJVBDrWlhJ0ORURRGKntGaX0WC8iDVBL
+k3wBjYEtFpB2S8FYUA/ZWB2HPaKb0tNCsf2xjPNlgfHsme6OfV5Qo2t7Hu6
8cHsOfOypwIO6+sDK0HGpPfb6htW55K/xRsJuxYvEw0ySamcQz3Q+CDPiydR
EOgz8PqW+ubgJN6ydCyCsx/mG6KfFSvIqzo2iJdhb7pJtKc/3yFftVhQT9uO
1wW77+vUEYDfjqBIESyWxxOMu4HKjHiPqRuWaIuf7jwc1hXGYNc/xR4/nkdt
GkOQs+8t/sBC2Le2/JYbBhV+YCIX5GmT7O61repBLyOpClmJNeKndjBXi90K
gB2M73DAGA9awglyJ/8//n5bkjuAoLx1NgFbc2qadcVvti0xL7GT8PEBTa6W
K8N0DO20m7ZNdvMp2Y/3GyVhTUiOhka8QfoEQJGBWHLPJQnim7sCFYACKyie
BWfO5+se4urGfJG1FfPHd791vOlKTe2gPQcig3xC6x1VFDb7OFyrmzdw/K6+
voeAecfg1DvkkipjAl7RLnqwRzh/KgLBlQk=
=6nuz
-----END PGP SIGNATURE-----
`;

var msg_error = `
-----BEGIN PGP SIGNED MESSAGE-----
Hash: SHA256

Proof of 1F35C GitHub User Ownership
Signed for: ABC
Date:Thu, 16 Dec 2021 00:27:44 GMT
-----BEGIN PGP SIGNATURE-----

wsFzBAEBCAAGBQJhuogAACEJECPOE7yfPkrZFiEEnKKyrnlckw7SKRSKI84T
vJ8+StktLRAAmuYXgCdF7DcbjBNoEJuvJSVM/2Tx+IBoaO/3ohMvEIo6cUkM
CbxtrqY+trBZN304Z6Rt0QTD1+P3p4AWUaXvHsdb/nkSzBbAojGSLiMpUY2y
VCiX0sZFs6PQbFULbglVobLq9TwAnubWgtTPxV8/1W6wztBVSyEsh0YXN+Qr
AtuYfZTzBT4qtXFJllOqITC/ShV+rhi/K8EeTa3XyN6D701ycqxlW+mdi/PY
8nRivqk6Kv6BkH0dFlIi/IPdaNmUQGYR3wbENW5uR5gaXSTRJDnR2rlTSGMP
T88vs9l3l7zv2LS3xxxnuF5Z4iBiXM1aANqe7l4vbJ4dPrx1mzkugozaS8Sh
NSBmkMds8PmHYADa3QnW/iGqXYTVXKMMJfH94Z3mENXjyFaZmHOp+o9OcOpF
BRqN/ADN+cHvaFYgEMpAKdtNVe0vYUUewBvmA+7jX3uSPKaTORj75l2WCPzl
fK7o+wtwpAqme+bhJsTKg7c54xKFKtp9WLRWfj/8hjPByj9cBeSsvPCUBb+s
6nOH7yTp29MQu/Um2Ub0liC4TIuyIzDGwu9sCxWsCwuBrV5UcPt5nxmOf9CK
tDYb9YrWPtC4Do3uVOP4G9SlHVuj3hyYcywVyHnu8ej7S95Yh6ksNWpeDWSF
fZCzhASsUl6WZSKZDSPOGV5z6WbZifJbnEA=
=ppKB
-----END PGP SIGNATURE-----
`;

(async() => {
  try {
    console.log(await checkKey(msg, pubkey));
  } catch(err) {
    console.error(err);
  }
})();

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
      <img className="icon" src="stopwatch.svg" />
      <br />
      <span className="status">
        Loading...
      </span>
    </div>
  );
};

const Verified = (): JSX.Element => {
  return (
    <div className="box-section centered loading">
      <img className="icon" src="success.svg" />
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
      <img className="icon" src="error.svg" />
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
      break;
    case PGPState.Verified:
      return Verified();
      break;
    case PGPState.Failed:
      return Failed({ error: result.error ?? "unknown" });
      break;
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
					<textarea className="signature-field" onChange={ (evt) => { setMessage(evt.target.value); } } autoFocus={ true } />
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
