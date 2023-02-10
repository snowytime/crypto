import crypto from "node:crypto";

import { base64ToBuffer, bufferToBase64, generateRandomKey, utf8ToBuffer } from "../index.js";
import { signData, verifySignature } from "./index.js";

describe("Testing the signing functions", () => {
    it("should be able to sign data", () => {
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
        expect(signature).instanceOf(Buffer);
    });
    it("should be able to verify a signature is different", () => {
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
        expect(signature).instanceOf(Buffer);
        // verify the signature
        const verified = verifySignature({
            data: utf8ToBuffer(JSON.stringify(differentData)),
            signature,
            secretKey: base64ToBuffer(encodedKey),
        });
        expect(verified).equals(false);
    });
    it("should be able to verify a signature is the same", () => {
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
        expect(signature).instanceOf(Buffer);
        // verify the signature
        const verified = verifySignature({
            data: utf8ToBuffer(JSON.stringify(otherData)),
            signature,
            secretKey: base64ToBuffer(encodedKey),
        });
        expect(verified).equals(true);
    });
});
