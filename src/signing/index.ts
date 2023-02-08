/*
Signing is a process that involves a similar process as the HMAC approach, the
difference being that the signing process uses a private key to sign data, and
the verification process uses a public key to verify the signature.

HMAC is a symmetric process, meaning that the same key is used to sign and
verify the signature.
*/
import crypto from "crypto";

type SignArguments = {
    data: string;
    privateKey: string;
    algorithm?: string;
};
export async function signData({
    data,
    privateKey,
    algorithm = "SHA256",
}: SignArguments): Promise<Buffer> {
    const sign = crypto.createSign(algorithm);
    sign.update(data);
    return sign.sign(privateKey);
}

type VerifyArguments = {
    data: string;
    signature: Buffer;
    publicKey: string;
};
export async function verifySignature({
    data,
    signature,
    publicKey,
}: VerifyArguments): Promise<boolean> {
    const verify = crypto.createVerify("SHA256");
    verify.update(data);
    return verify.verify(publicKey, signature);
}
