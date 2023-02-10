/*
Used for asymmetric encryption and decryption of data.
The choice between rsa and ecc is really down to the
computational resources of the device that is doing
the encryption and decryption. Smaller devices (phones)
benefit from this as compared to a computer that has far
more computational resources to spare.

ECC is faster at both encryption and decryption when
compared to RSA.

Here is a function that creates a pair of ecc keys
that are returned as buffers.
*/
import { createECDH } from "node:crypto";

export const generateEccPair = (curve = "prime256v1") => {
    const ecdh = createECDH(curve);
    const publicKey = ecdh.generateKeys();
    const privateKey = ecdh.getPrivateKey();
    return {
        publicKey: Buffer.from(publicKey),
        privateKey: Buffer.from(privateKey),
    };
};
