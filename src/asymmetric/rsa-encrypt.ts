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
}: RsaEncryptArguments): Promise<Buffer> {
    return new Promise((resolve, reject) => {
        try {
            const buffer = publicEncrypt(
                {
                    key: publicKey,
                    padding,
                },
                data,
            );
            resolve(buffer);
        } catch (error) {
            reject(error);
        }
    });
}
