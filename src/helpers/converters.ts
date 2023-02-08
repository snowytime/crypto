export function bufferToHex(buffer: Buffer): string {
    return buffer.toString("hex");
}

export function hexToBuffer(hex: string): Buffer {
    return Buffer.from(hex, "hex");
}

export function bufferToBase64(buffer: Buffer): string {
    return buffer.toString("base64");
}

export function base64ToBuffer(base64: string): Buffer {
    return Buffer.from(base64, "base64");
}

export const bufferToUtf8 = (buffer: Buffer): string => buffer.toString();

export const utf8ToBuffer = (utf8: string): Buffer => Buffer.from(utf8, "utf8");
