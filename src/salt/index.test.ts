import test from "ava";

import { generateSalt, utf8ToBuffer } from "#helpers/index.js";
import { scryptHashing, pbkdf2Hashing } from "./index.js";

test("should be able to generate a scrypt hash", async (t) => {
    const data = "password";
    const { salt, hash } = await scryptHashing({
        data: utf8ToBuffer(data),
        salt: generateSalt(),
    });
    t.true(salt instanceof Buffer);
    t.true(hash instanceof Buffer);
});
test("should be able to generate a pbkdf2 hash", async (t) => {
    const data = "password";
    const { salt, hash } = await pbkdf2Hashing({
        data: utf8ToBuffer(data),
        salt: generateSalt(),
    });
    t.true(salt instanceof Buffer);
    t.true(hash instanceof Buffer);
});
