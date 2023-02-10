/*
Used for asymmetric encryption and decryption of data.
RSA is slower than ECC, but is more secure. For general
use cases the choice between the two is really down to
the computational resources of the device that is doing
the encryption and decryption. Smaller devices (phones)
benefit from ECC as compared to a computer that has far
more computational resources to spare.

For any case where security is paramount, RSA is the
preferred choice.

Here is a function that generates a pair of RSA keys:
*/
import { generateKeyPair } from "crypto";

export const generateRsaPair = (): Promise<{ publicKey: Buffer; privateKey: Buffer }> => {
    return new Promise((resolve, reject) => {
        generateKeyPair(
            "rsa",
            {
                modulusLength: 2048,
                publicKeyEncoding: {
                    type: "spki",
                    format: "pem",
                },
                privateKeyEncoding: {
                    type: "pkcs8",
                    format: "pem",
                },
            },
            (err, publicKey, privateKey) => {
                if (err) {
                    reject(err);
                    return;
                }

                resolve({
                    publicKey: Buffer.from(publicKey),
                    privateKey: Buffer.from(privateKey),
                });
            },
        );
    });
};
