import { randomBytes } from "node:crypto";

export const generateSalt = (length = 16) => {
    return Buffer.from(randomBytes(length).toString("binary"), "binary");
};
