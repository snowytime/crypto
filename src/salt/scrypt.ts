/*
Scrypt hashing is a more secure way to hash passwords. It is a memory intensive function, which makes it
harder to crack. It is also a lot slower than pbkdf2, which makes it harder to brute force.
*/
import { scryptSync } from "node:crypto";

type SaltHashingArguments = {
    text: string;
    salt: Buffer;
    length?: number;
};

export const scryptHashing = ({ text, salt, length = 64 }: SaltHashingArguments) => {
    const hash = scryptSync(text, salt, length);
    return {
        salt,
        hash,
    };
};
