/*
Ahh salting hashes. Hashes are really easy to generate, but they are also really easy to crack. An
attacher can generate a hash of a password and then try to crack it by generating hashes of every
possible password and comparing them to the hash they have. If they find a match, they have cracked
the password. This is why we salt hashes. Salting hashes is a way to make it harder to crack a hash.

When hashing, use a salt. Note that salting does not inherently make a hash more secure, it just makes
it more annoying to crack.

Note that this function will return an object with a salt and a hash, both of which are Buffers. It will
need to be processed before it can be used and/or saved.
*/
import { pbkdf2 } from "node:crypto";

type Pbkdf2Arguments = {
    data: Buffer;
    salt: Buffer;
    algorithm?: string;
    iterations?: number;
    length?: number;
};
type Pbkdf2Return = {
    salt: Buffer;
    hash: Buffer;
};
// function that generates the salted hash, and returns the original salt
export const pbkdf2Hashing = ({
    data,
    salt,
    algorithm = "sha512",
    iterations = 100000,
    length = 64,
}: Pbkdf2Arguments): Promise<Pbkdf2Return> => {
    return new Promise((resolve, reject) => {
        pbkdf2(data, salt, iterations, length, algorithm, (err, derivedKey) => {
            if (err) {
                reject(err);
            } else {
                resolve({
                    salt,
                    hash: derivedKey,
                });
            }
        });
    });
};
