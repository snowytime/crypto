import test from "ava";

import { compareSaltedHashes, hash } from "./index.js";

test("Should be able to create a hash", (t) => {
    const hashedText = hash({ text: "Hello World" });
    t.true(hashedText instanceof Buffer);
});
test("Should be able to compare identical hashes", async (t) => {
    const hashedText = hash({ text: "Hello World" });
    const hashedText2 = hash({ text: "Hello World" });
    const isSame = compareSaltedHashes(hashedText, hashedText2);
    t.true(isSame);
});
test("Should be able to detect different hashes", async (t) => {
    const hashedText = hash({ text: "Hello World" });
    const hashedText2 = hash({ text: "Hello World 2" });
    const isSame = compareSaltedHashes(hashedText, hashedText2);
    t.false(isSame);
});
