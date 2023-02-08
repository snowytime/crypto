/*
Key derivation function (KDF) is a cryptographic algorithm that
derives an encryption key from a set of options, but most importantly
from a password. The KDF is used to generate a key from a password. This
means that as long as the signing and receiving ends of the encryption
process use the same password, the same key will be generated -- meaning
that there is no need to provide the key directly to the receiving end.

Here is an example of how you could use a KDF function in nodejs:
*/
import crypto from "node:crypto";

interface Arguments {
    algorithm?: string;
    length?: number;
    iterations?: number;
    salt?: Buffer;
    password: string;
    digest?: string;
}
export const generateKdfKey = ({
    password,
    salt = crypto.randomBytes(32),
    iterations = 100000,
    length = 32,
    // the digest algorithm to use (sha512 is the default)
    digest = "sha512",
}: Arguments): Promise<Buffer> => {
    return new Promise((resolve, reject) => {
        crypto.pbkdf2(password, salt, iterations, length, digest, (err, derivedKey) => {
            if (err) {
                reject(err);
            } else {
                resolve(derivedKey);
            }
        });
    });
};

/*
Using this function, as long as the salt, digest, algorithm, iterations,
and length are constant between the sender and receiver, the same password
provided to the function would yield the same key -- which could be used to
encrypt and decrypt data.
*/
