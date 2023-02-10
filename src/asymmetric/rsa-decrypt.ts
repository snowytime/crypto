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
}: RsaDecryptArguments): Promise<Buffer> {
    return new Promise((resolve, reject) => {
        try {
            const buffer = privateDecrypt(
                {
                    key: privateKey,
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
