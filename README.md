# Signature Verifier 
This GitHub page provides a way to verify a message came from the owner of the repository.

## Process 
1. generateKeys.js is executed. This will create the private/public key pair, and update the webpage with the new public key.
2. generateProof.js is executed. This will return a message signed using the private key.
3. This message can be sent to the recipient.
4. The recipient can use this to check that the message was indeed signed by the owner of the repository.

## Motivation
This is an experiment to see if there is a viable method for someone to keep an annonymous GitHub account, but still be able to easily prove ownership for any potential job applications/collaborations.

Obvious side effect of this is that no one else can masquerade as the owner of this GitHub user (without actually hacking the GitHub account).

## Additional thoughts on trustless-ness
From the perspective of the repository owner, this system allows me to sign messages and allow others to verify them in a trustless manner.

However, as a recipient of the signed message, receiving a correctly signed message does not necessarily prove that the sender of the message owns the repository, only that they have direct/indirect access to the private key.

Let's say there is a faker who is trying to fake ownership of this repository, which would normally be impossible, given the strength of RSA.
However, if the faker and the real owner are working in concert, the real owner could allow the faker to take credit as the owner of the GitHub repository, by signing messages in their stead, and they can do this with minimal risk, without sharing the private key or the actual GitHub account.

**Possible mitigations**

Because it is not possible to decouple the private key and the ability to sign messages for others, mitigations must come from other sources:
1. The proof recipient can ask sensitive information to be signed, such as government identification numbers.

   If there exists a fake owner, asking the real owner to sign the message would involve exposing this information to the real owner, which introduces risk of identity theft.

2. Similarly, in a situation where the cryptocurrency transactions ride on the proof of ownership of the repository (e.g. for contract/employment), the GitHub application can be modified to sign the message using the cryptocurrency wallet to be paid to.

   If a fake owner wants the message signed, they will need to share their cryptocurrency private key with the real owner, which introduces a serious financial risk for faking ownership.
