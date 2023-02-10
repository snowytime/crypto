import {
    base64ToBuffer,
    bufferToBase64,
    bufferToUtf8,
    generateRsaPair,
    utf8ToBuffer,
} from "../index.js";
import { rsaEncrypt, rsaDecrypt } from "./index.js";

describe("Testing asymmetric encryption functions", () => {
    it("Should be able to encrypt and decrypt a string", async () => {
        const { publicKey, privateKey } = await generateRsaPair();
        // convert the keys to another format (i.e. something a db might handle)
        const message = "Hello world";
        const encodedPublicKey = bufferToBase64(publicKey);
        const encodedPrivateKey = bufferToBase64(privateKey);
        // encrypt
        const encrypted = await rsaEncrypt({
            data: utf8ToBuffer(message),
            publicKey: base64ToBuffer(encodedPublicKey),
        });
        // decrypt
        const decrypted = await rsaDecrypt({
            data: encrypted,
            privateKey: base64ToBuffer(encodedPrivateKey),
        });
        // check
        expect(bufferToUtf8(decrypted)).equals(message);
    });
});