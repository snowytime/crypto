/*
Scrypt hashing is a more secure way to hash passwords. It is a memory intensive function, which makes it
harder to crack. It is also a lot slower than pbkdf2, which makes it harder to brute force.
*/
import { scrypt } from "node:crypto";

type ScryptArguments = {
    data: Buffer;
    salt: Buffer;
    length?: number;
};
type ScryptReturn = {
    salt: Buffer;
    hash: Buffer;
};
export const scryptHashing = async ({
    data,
    salt,
    length = 64,
}: ScryptArguments): Promise<ScryptReturn> => {
    return new Promise((resolve, reject) => {
        scrypt(data, salt, length, (err, hash) => {
            if (err) {
                reject(err);
            } else {
                resolve({
                    salt,
                    hash,
                });
            }
        });
    });
};
