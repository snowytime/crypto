import test from "ava";

import {
    generateRandomKey,
    generateKdfKey,
    generateRsaPair,
    generateEccPair,
    generateDhKeys,
} from "./index.js";

test("should be able to generate a basic key", (t) => {
    const key = generateRandomKey();
    t.true(key instanceof Buffer);
});
test("should be able to generate a kdf key", async (t) => {
    const key = await generateKdfKey({
        password: "password",
    });
    t.true(key instanceof Buffer);
});
test("should be able to generate a rsa pair", async (t) => {
    const { publicKey, privateKey } = await generateRsaPair();
    t.true(privateKey instanceof Buffer);
    t.true(publicKey instanceof Buffer);
});
test("should be able to generate an ecc pair", async (t) => {
    const { publicKey, privateKey } = generateEccPair();
    t.true(privateKey instanceof Buffer);
    t.true(publicKey instanceof Buffer);
});
test("should be able to generate a dh pair", async (t) => {
    const { publicKey, sharedSecret } = generateDhKeys();
    t.true(publicKey instanceof Buffer);
    t.true(sharedSecret instanceof Buffer);
});
