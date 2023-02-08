/*
Intro to symmetric decryption
*/
import crypto from "node:crypto";

type DecryptionReturn = Buffer;
interface DecryptionArguments {
    encryptedData: Buffer;
    key: Buffer;
    iv: Buffer;
    algorithm?: string;
}

export const symmetricDecrypt = ({
    encryptedData,
    key,
    iv,
    algorithm = "aes-256-cbc",
}: DecryptionArguments): DecryptionReturn => {
    const decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
    let decrypted = decipher.update(encryptedData);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted;
};
