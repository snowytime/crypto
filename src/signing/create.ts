import { createHash, createHmac } from "node:crypto";

type SignDataArguments = {
    data: Buffer;
    secretKey: Buffer;
};
export function signData({ data, secretKey }: SignDataArguments): Buffer {
    const hash = createHash("sha256");
    hash.update(data);
    const hashedData = hash.digest();

    const hmac = createHmac("sha256", secretKey);
    hmac.update(hashedData);

    return hmac.digest();
}
