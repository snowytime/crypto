import {
    generateRandomKey,
    generateKdfKey,
    generateRsaPair,
    generateEccPair,
    generateDhKeys,
} from "./index.js";

describe("Testing the key generation function", () => {
    it("should be able to generate a basic key", () => {
        const key = generateRandomKey();
        expect(key).instanceOf(Buffer);
    });
    it("should be able to generate a kdf key", async () => {
        const key = await generateKdfKey({
            password: "password",
        });
        expect(key).instanceOf(Buffer);
    });
    it("should be able to generate a rsa pair", async () => {
        const { publicKey, privateKey } = await generateRsaPair();
        expect(privateKey).instanceOf(Buffer);
        expect(publicKey).instanceOf(Buffer);
    });
    it("should be able to generate an ecc pair", async () => {
        const { publicKey, privateKey } = generateEccPair();
        expect(privateKey).instanceOf(Buffer);
        expect(publicKey).instanceOf(Buffer);
    });
    it("should be able to generate a dh pair", async () => {
        const { publicKey, sharedSecret } = generateDhKeys();
        expect(publicKey).instanceOf(Buffer);
        expect(sharedSecret).instanceOf(Buffer);
    });
});
