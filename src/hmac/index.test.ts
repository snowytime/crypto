import { createHmac, utf8ToBuffer } from "../index.js";
import { verifyHmac } from "./verify.js";

describe("Testing the HMAC function", () => {
    it("Should be able to create a HMAC", () => {
        const secret = "my secret";
        const data = "some data";
        const hmacSignature = createHmac({
            data: utf8ToBuffer(data),
            secret: utf8ToBuffer(secret),
        });
        expect(hmacSignature).instanceOf(Buffer);
    });
    it("Should be able to verify a HMAC", () => {
        const secret = "my secret";
        const data = "some data";
        const hmacSignature = createHmac({
            data: utf8ToBuffer(data),
            secret: utf8ToBuffer(secret),
        });
        const verified = verifyHmac({
            data: utf8ToBuffer(data),
            secret: utf8ToBuffer(secret),
            hmac: hmacSignature,
        });
        expect(verified).equals(true);
    });
    it("should fail if hmac does not match", () => {
        const secret = "original secret";
        const data = "my data";
        const hmacSignature = createHmac({
            data: utf8ToBuffer(data),
            secret: utf8ToBuffer(secret),
        });
        const verified = verifyHmac({
            data: utf8ToBuffer(data),
            secret: utf8ToBuffer("new secret"),
            hmac: hmacSignature,
        });
        expect(verified).equals(false);
    });
});
