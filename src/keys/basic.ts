/*
You might be thinking: "I should use KDF to derive a random key" but you really
don't need to do that. KDF is designed to be very expensive, since the key is
using a string (password) that might be easy to guess -- but nevertheless, it
is still a string. If you are using a random key, then you don't need to use
KDF, since the key is already random and there is no need to make it more
random. You can just use the key as is.

Here is a very simple, but useful example of how to generate a random key:
*/
import { randomBytes } from "crypto";

export const generateRandomKey = (keySize = 32): Buffer => {
    return randomBytes(keySize);
};

/*
By default, the key size is 32 bytes, which is 256 bits. You can change the key
size by passing a different value to the function. The key size is in bytes,
so if you want a 128-bit key, then you should pass 16 as the key size.

Note that the key size is not the same as the key length. The key size is the
number of bytes that the key is made of, while the key length is the number of
bits that the key is made of. For example, a 256-bit key is 32 bytes long.

Its not a good idea to use a key size that is less than 16 bytes, and not
more than 32 bytes. If you use a key size that is less than 16 bytes, then the
key will be too weak. If you use a key size that is more than 32 bytes, then
the key will be too long -- and very expensive to use.
*/
