const { KmsKeyringNode, encrypt, decrypt } = require("@aws-crypto/client-node");
require("dotenv").config();

const generatorKeyId = process.env.AWS_KEY_ID;

const keyring = new KmsKeyringNode({ generatorKeyId });

const context = {
  stage: "youtube",
  purpose: "youtube demo",
  origin: "us-east-1",
};

exports.encryptData = async (plainText, context) => {
  try {
    const { result } = await encrypt(keyring, plainText, {
      encryptionContext: context,
    });
    return result;
  } catch (e) {
    console.log(e);
  }
};

exports.decryptData = async (encryptedData, context) => {
  try {
    const { plaintext, messageHeader } = await decrypt(keyring, encryptedData);
    console.log("===== Message Header =======");
    console.log(JSON.stringify(messageHeader.encryptionContext));

    Object.entries(context).forEach(([key, value]) => {
      if (messageHeader.encryptionContext[key] === value) {
        console.log("it matched..");
      }
      if (messageHeader.encryptionContext[key] !== value)
        throw new Error("Encryption Context does not match expected values");
    });

    return plaintext.toString();
  } catch (e) {
    console.log(e);
  }
};
