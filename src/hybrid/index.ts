import crypto from "crypto";

const ALGORITHM = "aes-256-cbc";
const ENCRYPT_FORMAT = "base64";

const generateKeyPair = async () => {
    return new Promise((resolve, reject) => {
        crypto.generateKeyPair(
            "rsa",
            {
                modulusLength: 4096,
                publicKeyEncoding: {
                    type: "spki",
                    format: "pem",
                },
                privateKeyEncoding: {
                    type: "pkcs8",
                    format: "pem",
                },
            },
            (err, publicKey, privateKey) => {
                if (err) {
                    reject(err);
                    return;
                }

                resolve({
                    publicKey: Buffer.from(publicKey).toString("base64"),
                    privateKey: Buffer.from(privateKey).toString("base64"),
                });
            },
        );
    });
};

const encryptWithPublicKey = (publicKey: string, plaintext: string) => {
    const publicKeyBuf = Buffer.from(publicKey, ENCRYPT_FORMAT);
    const encrypted = crypto.publicEncrypt(publicKeyBuf, Buffer.from(plaintext));
    return encrypted.toString(ENCRYPT_FORMAT);
};

const decryptWithPrivateKey = (privateKey: string, encrypted: string) => {
    const privateKeyBuf = Buffer.from(privateKey, ENCRYPT_FORMAT);
    const decrypted = crypto.privateDecrypt(privateKeyBuf, Buffer.from(encrypted, ENCRYPT_FORMAT));
    return decrypted.toString();
};

const encrypt = async (plaintext: string, publicKey: string) => {
    const symmetricKey = crypto.randomBytes(32);
    const iv = crypto.randomBytes(16);

    const cipher = crypto.createCipheriv(ALGORITHM, symmetricKey, iv);
    let encrypted = cipher.update(plaintext, "utf8", ENCRYPT_FORMAT);
    encrypted += cipher.final(ENCRYPT_FORMAT);

    const encryptedSymmetricKey = encryptWithPublicKey(publicKey, symmetricKey.toString("hex"));
    const encryptedIV = encryptWithPublicKey(publicKey, iv.toString("hex"));

    return {
        encrypted,
        encryptedSymmetricKey,
        encryptedIV,
    };
};

const decrypt = async (
    encryptedMessage: string,
    encryptedSymmetricKey: string,
    encryptedIV: string,
    privateKey: string,
) => {
    const symmetricKey = Buffer.from(
        decryptWithPrivateKey(privateKey, encryptedSymmetricKey),
        "hex",
    );
    const iv = Buffer.from(decryptWithPrivateKey(privateKey, encryptedIV), "hex");

    const decipher = crypto.createDecipheriv(ALGORITHM, symmetricKey, iv);
    let decrypted = decipher.update(encryptedMessage, ENCRYPT_FORMAT, "utf8");
    decrypted += decipher.final("utf8");

    return decrypted;
};

// console.log(
//     await encrypt(
//         "hello world",
//         "LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0KTUlJQ0lqQU5CZ2txaGtpRzl3MEJBUUVGQUFPQ0FnOEFNSUlDQ2dLQ0FnRUEyYUxpclpIdFMzZGFjeVk2RHBwdApZV2ZqL3BTWmJQYUt0TmU4QXhaZWRnN0VGRXFYQU1GbWNsaTlNdmdGdXltclo0NGpud2hiem1JSlVabHlJR1ZqCno4ZlRRUkptNGZVSG5GT0M3aU9JM0R4Tm5DTytBQlFkYWZzNzlITFRUbkV2MkZOemhjcjlmeU1HMDkvR3FrczYKdk9vNkwyaVZHNGFKRHFxOWVVQWF5c0lKdGNPdlJuMkJrRXBlRmRoelV1M1F0UVlvRDhXRFhyamhqaDZsOHZUSgphZ2tCNjZ4NmNkN1lGUlhmQmllM081dGd6WFpKMksxUHdrKytrblBhdkE2a1pXTUEyQWFIa1ZGTmlTMFpWRmNPClY0YjQzNXdBL3lVZXZ2VjB2MkhQbUhaTkxIRE11d2taN1pXd0pZdlF2MHQrMUR3c2E5WW8wKzJvbkdKNFN2SU8KQ01lNUF6SDFKdElDVytoZE03S2g0NU0xd09zamhBQkJ1SU5kVUkwRVVsN0JRZDUzTzdjZXFvSTMxSmN6d2hXbQpoT29rRFhGVGNrR1l5LzY4ZUlBc1lsbjFGaUpDclBXRHd2ekltQWxFYTJKc2U2WC8zRmc3MDVtUDlRbHJKOWtBCkR6QVF3bG9pNzJiTG5Od3ZIUlNyV1ptUElLNTJrc1Vxbjg3YzJRdldKd0Uxc0ZUVlY5QVc0Y3hNTkROd2Y5ak8KRHg2SHlIR2UzbzhDWmc3bURYK2FkLzFoZFJWbDVWT0hSRGJmNDk4MnFzRndNMVZjeEtWZyt4QTRQdUl3M1kvaQpMWnkyL0Nld3JFbUpoVXU4WWd5d0JYRTV2eTVUWklvZ1VUaWF4c2VjVVpsditQRG1kRFRxUGYzTXlxQjNoVHFoCmhmRkRMUzRnWEFCLzhtemRaZlVuRGw4Q0F3RUFBUT09Ci0tLS0tRU5EIFBVQkxJQyBLRVktLS0tLQo",
//     ),
// );

console.log(
    await decrypt(
        "AN7NfRRMoMBqY0H9HR2FPA==",
        "F2ua0JAaxwGHlXWRfeiWGjj600Fo1E3OntvsoMID3Ls/6AGwxGtKgPPpTxJe6qeqYa+cmfTHf38pUCyA+QWTF3X/EuRVBT0vk7mCDZqT+QLqFtCjNDW15KgcIjHKYB7vCM2AuGf+LgTWDcPTKX4fTa5zFjqZuig52MVaVpgqI34/YNJIV2b1I3CuvvMUbijZKrjel3nBOkILqbhuykbckGNApl5av6buyHgTFXMH4Fi4jLthyiXKFl8WcT/hxOw/6n0Xa2wdqt9MWOtPvy5S0mhwtIB+ssBSjEakzm4OhXLXMfHkXCLk211RRhaQAJFw47Cg9tuoCyN4SBQiOMr+xB341geMbtSpJU7JD+rIqHZd8nmIOjxZ5SzroPkN05Oh8JeE7fPBCZXfKTpWdvW4MvOfWqGzpj52XsUQHlY8femDPWUgGsEjZirCcF2hLqeJmRHQ0jKWvnIbHQJQ3qGXf+3TphzrW9g/Q6XvOtBzSCJZT2mwbBBeI2+VeJqCLxu0gKBKSAiu9JucvoZFGyT70GWwxne6Srwv5b8F/+7YfzAXJRnqJ/DRHcsE8MwNAMJ6hJZN4hRXjefVoA+T4glnKi2x1qhVFP2nsCms5VWPWBPO2ZCL8hcrhcxLW0WINYjgNF8Kx0nlV8lb7LS169Oo/c1pk1oVYTxAK4hCoWgwfLA=",
        "yOrMVjrnloI1Olq9IM3IFMMZj6lOcCV7mZeOOoNWQrBxj2tdwScUsJvoSytimMBQw+7lr1gmnhQZ5Kd68VjT0SPouo8qscTM2+uFgmofT+VziFII78mhbli6tINt14rbCFp7DOZorLNqXQG/e4VjnAJEf1+TX/wb1OB8lA49OLwDTSvfVXLUjsWZE8T7Or6f2F9lY5GrBquXwtYxIWGURYnPqmtgt0iUH+C7N5WTk6IpH8JYCPQLQqJhVoHfsMJ0t0lDV4eh2hcCBgplFPvWNRc3XbbpQnTiWsdbmhOKD3dRREByDrK9SEti1qsieosaZGbep/A2renqOQweRoCzVP0gDH4/JECl5Xgy8GOVqIPhRBdY0Ysyd7aRa+H54w8k6L2MvWVrt3IyKGA1V6EFS2bqMWUF19HihAiYOY6pmGBpuI7LyeJ8ksfC6ILZfc9NuY4eVl72x/0OzrPIMofRcWM4CFLbWhmyVooa2qUnKLvaBKdp5royyxko/QzjQlC5aC+K8GH6xQ1isrks7NurFStsA5KeptqA3dIZCD1DuFc0Rig7Xo2+P8Iv7IBWNjt5ZmQiI81bkkyV8acuyhJz0Ae3zq2NJrEPFgRuqO66FG2/G8NhQxUNTFCxXw5TehuN9hXkT3iyxi2xGMEIJ25dklTMGAzA/LO9fxCqh40dD1Y=",
        "LS0tLS1CRUdJTiBQUklWQVRFIEtFWS0tLS0tCk1JSUpRZ0lCQURBTkJna3Foa2lHOXcwQkFRRUZBQVNDQ1N3d2dna29BZ0VBQW9JQ0FRRFpvdUt0a2UxTGQxcHoKSmpvT21tMWhaK1ArbEpsczlvcTAxN3dERmw1MkRzUVVTcGNBd1daeVdMMHkrQVc3S2F0bmppT2ZDRnZPWWdsUgptWElnWldQUHg5TkJFbWJoOVFlY1U0THVJNGpjUEUyY0k3NEFGQjFwK3p2MGN0Tk9jUy9ZVTNPRnl2MS9Jd2JUCjM4YXFTenE4NmpvdmFKVWJob2tPcXIxNVFCckt3Z20xdzY5R2ZZR1FTbDRWMkhOUzdkQzFCaWdQeFlOZXVPR08KSHFYeTlNbHFDUUhyckhweDN0Z1ZGZDhHSjdjN20yRE5ka25ZclUvQ1Q3NlNjOXE4RHFSbFl3RFlCb2VSVVUySgpMUmxVVnc1WGh2amZuQUQvSlI2KzlYUy9ZYytZZGswc2NNeTdDUm50bGJBbGk5Qy9TMzdVUEN4cjFpalQ3YWljClluaEs4ZzRJeDdrRE1mVW0wZ0piNkYwenNxSGprelhBNnlPRUFFRzRnMTFRalFSU1hzRkIzbmM3dHg2cWdqZlUKbHpQQ0ZhYUU2aVFOY1ZOeVFaakwvcng0Z0N4aVdmVVdJa0tzOVlQQy9NaVlDVVJyWW14N3BmL2NXRHZUbVkvMQpDV3NuMlFBUE1CRENXaUx2WnN1YzNDOGRGS3RabVk4Z3JuYVN4U3FmenR6WkM5WW5BVFd3Vk5WWDBCYmh6RXcwCk0zQi8yTTRQSG9mSWNaN2Vqd0ptRHVZTmY1cDMvV0YxRldYbFU0ZEVOdC9qM3phcXdYQXpWVnpFcFdEN0VEZysKNGpEZGorSXRuTGI4SjdDc1NZbUZTN3hpRExBRmNUbS9MbE5raWlCUk9Kckd4NXhSbVcvNDhPWjBOT285L2N6SwpvSGVGT3FHRjhVTXRMaUJjQUgveWJOMWw5U2NPWHdJREFRQUJBb0lDQUJTMGpYSkw3dEorTVduQkdrYm5aRDZmCkhxN0t2bW9DYnFIVDRIdyt0WS92eWJIUWd0czhpeDJYMmJBdXJvVG02dnE0S0NWcUt5blFZK2lTZTZ3ZldVYWMKVVRuZ29VOGYrN0JndFpVb1prM2xvdENYQ2UyQi9HWm4wNFZuSXpsVVJXUUVWSHBISEtUcTFTeDFIcloyMzhpMwpVLy9NcUZydENyOE5lV2MrdFEzVE5nOUg1YllFSEw1NGhNajVSY2QrL3BzcVVjZG1XQ0E3NEtHZnd0UUJlK1FOCnBWUWhuYWlWdGVNVHFKc3lUaGxxcCtRRU8vUlVVTUZBeXZXdDlnSnNOakc3SUlwczNKcnpyRGUveGFnamZDYlIKblgzUW5ydW5jV3hqZDg3NVpFR3lCNWVSeDdpSG5pTGZXZG5JbW55SWx6Rmo1Q29DUHZJaXF5YnRxMW9kK3oybgpucTBUdDhZNldacTBtSjArSTBBUkVHL2t6UlNpcnZvMzVUb3hnOSt1cEdnWCs3dmZmVFMzY0JjRnRRYUFnbklKCnlEMHhXUVhmRjE1QkN5M0ZlMmtVVjhNbG92V0VoZFUwWGl3Z3ZtS1pGQWtacDlWcnlFMGwvanZyTU9MSTlNVFQKbGhkSkIrMGhZdHVMNVhEanFaZnZrekh1WUVHckE5RjF4NXVKZ2txQ084Z056TGxwQUJZVTBZLzQrcVRxemhSRgp4NjJKMlM1bHJJRUE1OUs0MVFJZUpkcVhHdFRlTlVPak1kWWRKdVc3NllaaWFZRGxKSHYzZGNoK2REcmIwcUplCmhUN25GTDcwTllZL3Mwejg2akUwcDV4OHhQS3FrRUtRTWlkMHZ3Y2wzUEt1K244SUNqb3pIb0xWMHJ3ejhBM0cKa1RiK0txSFo3V0dCSmNwOWhVZUpBb0lCQVFENXV2c0xGb0ZIcCtKUmhlZDJtdE9jU0phREh2MHcyVkRLTUwxRgo0MG8rdnd3b1lQTjRGanVNWVh1RmZoaGZ2OW8waW1jU0phRlpFc2czd0pGSVlBWFl5RU5KeTlkUlh3R2Q4UEVaCjljWklnK2o4T0cyYWk4cHBTUXBUNUdFZ0lwU2pYTmtiSTJSdytrcFg3VFR1dzArbzdOTVY2djBzUVdHREJsdVoKQUFMTUZ6MG84UXpETjVMOHFQbDZXK0haTWw0SEphbVhLZ2FnQXg5OURzVGtWMGNYUERoaTJlU1JqUStwOFgrSwpRY0RxWjRzVGx1UlRmbkx1YjZ3bnBueEpNMUs5QjVhbVNDOUk1MkZvNjRUMnk2RmNnTDlMRVo2Zk85Sktma0VLClY4MGdEZElzck9aR0JTYW5WbjRrUEVOQnUyUjU1a01DR1JjOWdtcTZITVV6ZG8vZEFvSUJBUURmR2FLNGw3TWcKTHRQVDRjWTZ4bzBPbUxXL3pVangxSzQ1MzlWUGdKRWR2eXdMNkE1aXRhYW1lcVV6TmlCamlpNDE1WkZ5NjFWUgpRUVd3cStNL3pCZUpUNm1HT0RiRUVwNWhYMThMYzhuejUwQnZoUW1ycktHQThQd2tPbk1OSXJaYmVoc2drSzJaCnpsUHNOOXMxMjd6ZHZkK29vZXNjY1ZVNU1jcU5Qb0x5OWpOaU9LanI0Y1NjcUZSSHU4L1RPVnAycnFQOERjYkcKN1plNXdjakRyTll4dkVMYm9SRXQ5TFd6cThoRTBmb3dhRm8vajNZSXFYUzJyQW9UZkJRcWZ5TVc0aldvcks5aQpGakdob2liYjNuazdmVXRyZUthSEg1TG9LMlpmNi9WanZkcVFtMXIvb3RxWkVpaXJJMUhMRVN2K0tKVkp6Nnl5CjdVdFNEQ1pFSkZGckFvSUJBUURibmFYY2NHUXN3ZVZ6MEJCbjYyeWhDZXpqVHNOV3pDWVNTWjZKOFlKL2Y3K1AKV3dPQjNmdHNUdVl6MVZwV0NnQTVLR1hRUGF1UkM4VnIwanR4ckpBM3ZwWCtOZmNiSmpQajA5b1QvR0h0cjZPYQorM3pYNW91UTM1em5mZlkwTG5VTTNVQkliMjJMTlhGZnRjbFJHQTNiL3JqN2szWW1EekZUNnFsdStlVjcyZ3Y5CkQwOHI5cG1hL0hhNU5raDltNSs1SlZQcERocFphYVd0Y3VtUDdYa2xZOTRxZ0hoVHovdXdkaUsxVVhINE1pcksKaFc0eVJ3ZUh6RWxYYlQvcmwranhOOVV5VWxUVEJqaFI3cDAxOUlucE1ZZ0kybXZtbU5Nc2s2OWJDeS9uT29CVQpyWkNzanljWkRpVk1kSHFwT2NUNHRwakRKWkdjbEM2TGtYV1M5bmM1QW9JQkFCbkd5SG96Yk1ySEhrcFl4Nko2CjFrbGRjNEpab1pmdlRzSDVEcGhFN245Vld5MTAvbFNCVUdQanY3cVBBbWI5ekNFR0NTd1I3S1dhc2FHYitvR2cKZndlcVlKZlZYdDZBbURQLzVPZFoxWGVNdkhFbUdkdnY4aWtIcnRvd3RxSko1Ry9sUjhVWGNqZFhFM016Y094awpHd296cWVlOTdZQTN4L1QzdjhOWitaOUF1dWNhVE1vVUo3ZEI2NXJ1SkREdmEzaFM3VGR1RUExajNpZmtMK0lMCjBpT2s4TVNYYzNpdjBWNlU5bXFkS0I3M3I1V3dhWjdPbFdHVnR3UlJUYk1yUlU2YmpEK1UxQjZ0R2NibkNUNVcKRWdQQmtqazBrMmtCU09QeVA3M05jV2k0d3N2Nlp5VXFGNytmelhzWWRaYlV3UlI0YytjM1MyalE2ZWJzNkc3dgpFMGtDZ2dFQWR1TlRVY0lieHBEWStDckx1aDN4dmdXWW9MQzUrdC9WcVVVL3N1SjlqYzVpYjJVcDNXS2x4VnpLCkVvSmhJM2IrRHBQQVQrMTlFOXVDaVQ4dzJ1cmk0Y29wWmFVMHNkekdLTWVzazd5Myt1MzhRTms1OFVoNSs1cUYKVFlOSEtGcGpLak5FZ2h3U2wvekJuTnpDdzgvR1VJOFpXZUFSaDJ4UFlIZUlMMGUzU0Nib1ZHbDAxZEhBclhhdAp6ay9Dekt1WmpjTXJURm5BSGYxdTlkV0l0dDhycy9VMWh3OUZmUjVkNHIzeThMa0NIUGJ3NksydzlTemdXZ1VKCnBaWWwxNjMrK1BuV2JaWkRNN2VlVkR6aUtrL3djdDdGWnhnNDArZW9vUnlEQkJ0OThUUCsrVHZkeDNFb2VEK0EKU29HZm1KbW81WVhMb1huRHltaytMT2JRZTVpdEJ3PT0KLS0tLS1FTkQgUFJJVkFURSBLRVktLS0tLQo",
    ),
);
