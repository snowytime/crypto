import { publicEncrypt, constants } from "crypto";

type RsaEncryptArguments = {
    data: Buffer;
    publicKey: Buffer;
    padding?: number;
};
export function rsaEncrypt({
    data,
    publicKey,
    padding = constants.RSA_PKCS1_OAEP_PADDING,
}: RsaEncryptArguments): Buffer {
    const buffer = publicEncrypt(
        {
            key: publicKey,
            padding,
        },
        data,
    );
    return buffer;
}
