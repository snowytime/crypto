import test from "ava";

import { base64ToBuffer, bufferToBase64, utf8ToBuffer } from "#helpers/index.js";
import { generateRandomKey } from "../index.js";
import { signData, verifySignature } from "./index.js";

test("should be able to sign data", (t) => {
    const data = {
        name: "John Doe",
        age: 30,
        attributes: ["strong", "weak", "smart"],
    };
    const key = generateRandomKey();
    // simulate something that would be present on the server
    const encodedKey = bufferToBase64(key);
    // generate the signature
    const signature = signData({
        data: utf8ToBuffer(JSON.stringify(data)),
        secretKey: base64ToBuffer(encodedKey),
    });
    t.true(signature instanceof Buffer);
});
test("should be able to verify a signature is different", (t) => {
    const originalData = {
        name: "John Doe",
        age: 30,
        attributes: ["strong", "weak", "smart"],
    };
    const differentData = {
        name: "John Does",
        age: 30,
        attributes: ["strong", "weak", "smart"],
    };
    const key = generateRandomKey();
    // simulate something that would be present on the server
    const encodedKey = bufferToBase64(key);
    // generate the signature
    const signature = signData({
        data: utf8ToBuffer(JSON.stringify(originalData)),
        secretKey: base64ToBuffer(encodedKey),
    });
    t.true(signature instanceof Buffer);
    // verify the signature
    const verified = verifySignature({
        data: utf8ToBuffer(JSON.stringify(differentData)),
        signature,
        secretKey: base64ToBuffer(encodedKey),
    });
    t.false(verified);
});
test("should be able to verify a signature is the same", (t) => {
    const originalData = {
        name: "John Doe",
        age: 30,
        attributes: ["strong", "weak", "smart"],
    };
    const otherData = {
        name: "John Doe",
        age: 30,
        attributes: ["strong", "weak", "smart"],
    };
    const key = generateRandomKey();
    // simulate something that would be present on the server
    const encodedKey = bufferToBase64(key);
    // generate the signature
    const signature = signData({
        data: utf8ToBuffer(JSON.stringify(originalData)),
        secretKey: base64ToBuffer(encodedKey),
    });
    t.true(signature instanceof Buffer);
    // verify the signature
    const verified = verifySignature({
        data: utf8ToBuffer(JSON.stringify(otherData)),
        signature,
        secretKey: base64ToBuffer(encodedKey),
    });
    t.true(verified);
});
