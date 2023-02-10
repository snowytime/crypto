import { timingSafeEqual } from "node:crypto";

import { createHmac } from "./create.js";

type VerifyHmacArguments = {
    data: Buffer;
    secret: Buffer;
    hmac: Buffer;
};
export const verifyHmac = ({ data, secret, hmac }: VerifyHmacArguments) => {
    const newHmac = createHmac({
        data,
        secret,
    });
    return timingSafeEqual(hmac, newHmac);
};
