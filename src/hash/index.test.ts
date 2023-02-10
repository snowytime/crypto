import { compareSaltedHashes, hash } from "./index.js";

describe("Testing the hashing function", () => {
    it("Should be able to create a hash", () => {
        const hashedText = hash({ text: "Hello World" });
        expect(hashedText).instanceOf(Buffer);
    });
    it("Should be able to compare identical hashes", async () => {
        const hashedText = hash({ text: "Hello World" });
        const hashedText2 = hash({ text: "Hello World" });
        const isSame = compareSaltedHashes(hashedText, hashedText2);
        expect(isSame).equals(true);
    });
    it("Should be able to detect different hashes", async () => {
        const hashedText = hash({ text: "Hello World" });
        const hashedText2 = hash({ text: "Hello World 2" });
        const isSame = compareSaltedHashes(hashedText, hashedText2);
        expect(isSame).equals(false);
    });
});
