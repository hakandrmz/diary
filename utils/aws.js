const {KmsKeyringNode, encrypt, decrypt} = require("@aws-crypto/client-node");
require("dotenv").config();

const generatorKeyId = process.env.AWS_KEY_ID;

const keyring = new KmsKeyringNode({generatorKeyId});

const context = {
    stage: "demo",
    purpose: "demo",
    origin: "us-east-1",
};
exports.encryptData = async (plainText) => {
    try {
        const {result} = await encrypt(keyring, plainText, {
            encryptionContext: context,
        });
        return result;
    } catch (e) {
        console.log(e);
    }
};

exports.decryptData = async (encryptedData) => {
    try {
        const {plaintext, messageHeader} = await decrypt(keyring, encryptedData);
        console.log("Mesaj Header");
        console.log(JSON.stringify(messageHeader.encryptionContext));

        Object.entries(context).forEach(([key, value]) => {
            if (messageHeader.encryptionContext[key] === value) {
                console.log("Anahtarlar eşleşti.");
            }
            if (messageHeader.encryptionContext[key] !== value)
                throw new Error("Şifreleme içeriği eşleşmedi.");
        });

        return plaintext.toString();
    } catch (e) {
        console.log(e);
    }
};
