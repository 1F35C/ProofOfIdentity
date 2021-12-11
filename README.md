# Signature Verifier 
This GitHub page provides proof of ownership of this GitHub user using digital signature.

## Process 
1. Proof of ownership of the GitHub is requested.
2. The owner will generate a message and a digital signature signed with their private key, then send it to the requester.
3. The requester can use the GitHub page, which contains the public key, to confirm that the message was signed by the owner.

## Motivation
This is an experiment to see if there is a viable method for someone to keep an annonymous GitHub account, but still be able to prove ownership for any potential job applications/collaborations.

## Limitations
This process guarantees that unauthorized third party cannot claim ownership of this GitHub user.
However, from the requester's perspective, receiving a correct signed message does not necessarily prove that the alleged owner does indeed own the repository.
It is possible for the real owner to sign the message for someone else, allowing them to take credit as the owner of the GitHub repository, resulting in something like an intentional man-in-the-middle attack.

## Possible mitigations 
1. The requester can ask sensitive information to be signed, such as government identification numbers.
If there exists a fake owner, asking the real owner to sign the message would onvolve exposing this information to the real owner, which introduces risk of identity theft for fake ownership.
Care must be taken so that this information is not compromised  when being transmitted/received by the requester.
2. In a situation where payments are made in cryptocurrency, the GitHub application can be modified to sign the message using the cryptocurrency wallet to be paid to.
If a fake owner wants the message signed, they will need to share their cryptocurrency private key with the real owner, which introduces a serious financial risk for faking ownership.
