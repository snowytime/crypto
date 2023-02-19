import test from "ava";

import { utf8ToBuffer } from "#helpers/index.js";
import { createHmac } from "../index.js";
import { verifyHmac } from "./verify.js";

test("Should be able to create a HMAC", (t) => {
    const secret = "my secret";
    const data = "some data";
    const hmacSignature = createHmac({
        data: utf8ToBuffer(data),
        secret: utf8ToBuffer(secret),
    });
    t.true(hmacSignature instanceof Buffer);
});
test("Should be able to verify a HMAC", (t) => {
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
    t.true(verified);
});
test("should fail if hmac does not match", (t) => {
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
    t.false(verified);
});
