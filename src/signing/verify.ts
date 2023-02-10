import { timingSafeEqual } from "node:crypto";
import { signData } from "./create.js";

type Arguments = {
    data: Buffer;
    signature: Buffer;
    secretKey: Buffer;
};
export function verifySignature({ data, signature, secretKey }: Arguments) {
    const calculatedSignature = signData({
        data,
        secretKey,
    });
    return timingSafeEqual(signature, calculatedSignature);
}
