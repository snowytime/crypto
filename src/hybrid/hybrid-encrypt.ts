import { generateRandomKey, rsaEncrypt, symmetricEncrypt } from "../index.js";

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

type HybridEncryptionArguments = {
    data: Buffer;
    publicKey: Buffer;
    algorithm?: string;
};
export const hybridEncrypt = async ({
    data,
    publicKey,
    algorithm = "aes-256-cbc",
}: HybridEncryptionArguments) => {
    // generate a symmetric key (32 bit by default)
    const symmetricKey = generateRandomKey();
    // perform the main encryption (fast)
    const { iv, data: encryptedData } = await symmetricEncrypt({
        data,
        key: symmetricKey,
        algorithm,
    });
    // encrypt the iv, symmetricKey, and encryptedData with the public key (fast)
    const encryptedSymmetricKey = await rsaEncrypt({
        data: symmetricKey,
        publicKey,
    });
    const encryptedIV = await rsaEncrypt({
        data: iv,
        publicKey,
    });
    const encryptedEncryptedData = await rsaEncrypt({
        data: encryptedData,
        publicKey,
    });
    // return the data
    return {
        key: encryptedSymmetricKey,
        iv: encryptedIV,
        data: encryptedEncryptedData,
    };
};
