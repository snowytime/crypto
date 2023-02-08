/*
In cryptography hashing is a one way function that takes an input and produces a fixed length output.
The has is a one way function because it is not possible to reverse the process and get the input from the output.

To keep with the binary standard in cryptography, this hashing function will return a buffer. Understandably this
is not a very user friendly format, so the buffer will need to be converted to whatever format you choose.

Note: Bare hashing is not a secure way to store passwords. It is not slow enough to prevent brute force attacks.

Remember I have a few conversion functions to get started with.
*/
import { createHash, timingSafeEqual } from "node:crypto";

type HashArguments = {
    text: string;
    algorithm?: string;
};
export const hash = ({ text, algorithm = "sha512" }: HashArguments): Buffer => {
    const hashedText = createHash(algorithm).update(text);
    return Buffer.from(hashedText.digest("binary"), "binary");
};

// comparing salts using the timingSafeEqual function
// also works for comparing salted hashes
export const compareSaltedHashes = (hash1: Buffer, hash2: Buffer) => {
    return timingSafeEqual(hash1, hash2);
};
