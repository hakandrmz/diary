const { encryptData, decryptData } = require("../aws");

async function init() {
  let plainText = "Hakan";
  console.log("====== Original Text ======");
  console.log(plainText);

  // Encrypting
  let encryptedData = await encryptData(plainText);
  console.log("===== Encrypted Data ======");
  console.log(encryptedData);

  // Decrypting
  let decryptedData = await decryptData(encryptedData);
  console.log("===== Decrypted Data ======");
  console.log(decryptedData);
}

//init();
