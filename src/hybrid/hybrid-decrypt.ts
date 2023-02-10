/*
Hybrid Encryption

issue:
- symmetric encryption is very fast but not secure when the key is exposed
- asymmetric encryption is very secure but very slow

notes:
- asymmetric encryption is faster at encrypting buffers than stringified data

Conclusion:
- using hybrid encryption you generate a symmetric key for each request, use the
key to encrypt the data string to Buffer. Then use the public key provided by
the asymmetric encryption to encrypt the result of the symmetric encryption.
(i.e. the encrypted data, iv, and the symmetric key)
*/

import { rsaDecrypt, symmetricDecrypt } from "../index.js";

type HybridDecryptionArguments = {
    key: Buffer;
    iv: Buffer;
    data: Buffer;
    privateKey: Buffer;
};
export const hybridDecrypt = async ({ key, iv, data, privateKey }: HybridDecryptionArguments) => {
    // first use privateDecrypt to decrypt the data
    const decryptedKey = await rsaDecrypt({
        data: key,
        privateKey,
    });
    const decryptedIv = await rsaDecrypt({
        data: iv,
        privateKey,
    });
    const decryptedData = await rsaDecrypt({
        data,
        privateKey,
    });
    // use the symmetric key to decrypt the data
    return symmetricDecrypt({
        data: decryptedData,
        iv: decryptedIv,
        key: decryptedKey,
    });
};
