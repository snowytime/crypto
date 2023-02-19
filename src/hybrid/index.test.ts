import test from "ava";

import { base64ToBuffer, bufferToBase64, bufferToUtf8, utf8ToBuffer } from "#helpers/index.js";
import { generateRsaPair } from "../index.js";
import { hybridDecrypt, hybridEncrypt } from "./index.js";

test("Should be able to encrypt and decrypt a string", async (t) => {
    const { publicKey, privateKey } = await generateRsaPair();
    // convert the keys to another format (i.e. something a db might handle)
    const message = "Hello world";
    const encodedPublicKey = bufferToBase64(publicKey);
    const encodedPrivateKey = bufferToBase64(privateKey);
    // encrypt
    const { data, iv, key } = await hybridEncrypt({
        data: utf8ToBuffer(message),
        publicKey: base64ToBuffer(encodedPublicKey),
    });
    // decrypt
    const decrypted = await hybridDecrypt({
        data,
        key,
        privateKey: base64ToBuffer(encodedPrivateKey),
        iv,
    });
    // check
    t.is(bufferToUtf8(decrypted), message);
});
