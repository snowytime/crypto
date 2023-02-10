import { generateSalt, utf8ToBuffer } from "../index.js";
import { scryptHashing, pbkdf2Hashing } from "./index.js";

describe("Testing the hashing functions", () => {
    it("should be able to generate a scrypt hash", async () => {
        const data = "password";
        const { salt, hash } = await scryptHashing({
            data: utf8ToBuffer(data),
            salt: generateSalt(),
        });
        expect(salt).instanceOf(Buffer);
        expect(hash).instanceOf(Buffer);
    });
    it("should be able to generate a pbkdf2 hash", async () => {
        const data = "password";
        const { salt, hash } = await pbkdf2Hashing({
            data: utf8ToBuffer(data),
            salt: generateSalt(),
        });
        expect(salt).instanceOf(Buffer);
        expect(hash).instanceOf(Buffer);
    });
});
