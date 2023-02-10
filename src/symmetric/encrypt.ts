/*
Intro to symmetric encryption

Symmetric encryption is a type of encryption where the same key is used to encrypt and decrypt the data.
This function uses the Buffer format for the key that is passed in, and returns the encrypted data in the Buffer format.

If you would want to pass it a hex or base64 encoded key, you would need to convert the key to a Buffer first, and
the same goes for the output, you would need to convert that as well.

Storing things as buffers is a very tedious thing to do, so its common to convert them to hex or base64 strings. By
doing this you must ensure that the receiving end of the data is expecting the same format as the sending end.
*/
import crypto from "node:crypto";

interface EncryptionReturn {
    iv: Buffer;
    data: Buffer;
}
interface EncryptionArguments {
    data: Buffer;
    key: Buffer;
    algorithm?: string;
}
export const symmetricEncrypt = ({
    data,
    key,
    algorithm = "aes-256-cbc",
}: EncryptionArguments): Promise<EncryptionReturn> => {
    // the iv is used to ensure that the same string is encrypted differently each time
    return new Promise((resolve, reject) => {
        try {
            const iv = crypto.randomBytes(16);
            const cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
            let encrypted = cipher.update(data);
            encrypted = Buffer.concat([encrypted, cipher.final()]);
            resolve({ iv, data: encrypted });
        } catch (e) {
            reject(e);
        }
    });
};
