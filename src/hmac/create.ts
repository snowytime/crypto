import crypto from "crypto";

type CreateHmacArguments = {
    data: Buffer;
    secret: Buffer;
    algorithm?: string;
};

export const createHmac = ({ data, secret, algorithm = "sha512" }: CreateHmacArguments): Buffer => {
    const hmac = crypto.createHmac(algorithm, secret);
    hmac.update(data);
    return Buffer.from(hmac.digest("binary"), "binary");
};
