import { constants, privateDecrypt } from "crypto";

type RsaDecryptArguments = {
    data: Buffer;
    privateKey: Buffer;
    padding?: number;
};
export function rsaDecrypt({
    data,
    privateKey,
    padding = constants.RSA_PKCS1_OAEP_PADDING,
}: RsaDecryptArguments): Buffer {
    const buffer = privateDecrypt(
        {
            key: privateKey,
            padding,
        },
        data,
    );
    return buffer;
}
