# Signature Verifier 
This GitHub page provides a way to verify a message came from the owner of the repository.

## Process 
1. generateKeys.js is executed. This will create the private/public key pair, and update the webpage with the new public key.
2. generateProof.js is executed. This will return a message signed using the private key.
3. This message can be sent to the recipient.
4. The recipient can use the github.io page to check that the message was indeed signed by the owner of the repository.

## Motivation
This is an experiment to see if there is a viable method for someone to keep an annonymous GitHub account, but still be able to easily prove ownership for any potential job applications/collaborations.

One side effect of this is that no one else can masquerade as the owner of this GitHub user (without actually hacking the GitHub account and changing the public key).

## Additional thoughts on trustless-ness
From the perspective of the repository owner, this system allows me to sign messages and allow others to verify them in a mostly-trustless manner. (GitHub is implied to be a trusted entity since it is hosting the code.)

However, as a recipient of the signed message, receiving a correctly signed message does not necessarily prove that the sender of the message owns the repository, only that the sender has a direct/indirect access to the private key.

Let's say there is a faker who is trying to fake ownership of this repository, which would normally be impossible, given the strength of RSA.
However, if the faker and the real owner are working in concert, the real owner could allow the faker to take credit as the owner of the GitHub repository, by signing messages in their stead, and they can do this with minimal risk, without sharing the private key or the actual GitHub account.

**Possible mitigations**

Because it is not possible to decouple the private key and the ability to sign messages for others, mitigations must come from other sources.
For example, the proof recipient can ask sensitive information to be signed, such as government identification numbers.
If there exists a fake owner, asking the real owner to sign the message would involve exposing this information to the real owner, which introduces risk of identity theft.
