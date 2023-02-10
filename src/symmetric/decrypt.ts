/*
Intro to symmetric decryption
*/
import crypto from "node:crypto";

type DecryptionReturn = Buffer;
interface DecryptionArguments {
    data: Buffer;
    key: Buffer;
    iv: Buffer;
    algorithm?: string;
}

export const symmetricDecrypt = ({
    data,
    key,
    iv,
    algorithm = "aes-256-cbc",
}: DecryptionArguments): Promise<DecryptionReturn> => {
    return new Promise((resolve, reject) => {
        try {
            const decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
            let decrypted = decipher.update(data);
            decrypted = Buffer.concat([decrypted, decipher.final()]);
            resolve(decrypted);
        } catch (e) {
            reject(e);
        }
    });
};
