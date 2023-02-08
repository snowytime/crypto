import crypto from "crypto";

type CreateHmacArguments = {
    text: string;
    secret: string;
    algorithm?: string;
};

export const createHmac = ({ text, secret, algorithm = "sha512" }: CreateHmacArguments) => {
    const hmac = crypto.createHmac(algorithm, secret);
    hmac.update(text);
    return Buffer.from(hmac.digest("binary"), "binary");
};

type VerifyHmacArguments = {
    text: string;
    secret: string;
    hmac: Buffer;
};
export const verifyHmac = ({ text, secret, hmac }: VerifyHmacArguments) => {
    const newHmac = createHmac({
        text,
        secret,
    });
    return crypto.timingSafeEqual(hmac, newHmac);
};
