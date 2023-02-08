import * as crypto from "crypto";

export const diffieHellmanKeyExchange = () => {
    const dh = crypto.createDiffieHellman(256);
    const publicKey = dh.generateKeys();
    const sharedSecret = dh.computeSecret(publicKey);
    return { publicKey, sharedSecret };
};
