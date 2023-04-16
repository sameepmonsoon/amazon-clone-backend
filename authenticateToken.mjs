const crypto = require("crypto");

const token = "..."; // your encrypted token
const secret = "your-secret-key"; // your secret key
const iv = Buffer.alloc(16, 0); // your initialization vector (IV)

const decipher = crypto.createDecipheriv("aes-192-cbc", secret, iv);
let decrypted = decipher.update(token, "hex", "utf8");
decrypted += decipher.final("utf8");

console.log(decrypted); // should print the decrypted token
