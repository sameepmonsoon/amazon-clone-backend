import crypto from "crypto";

export const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const secret = process.env.TOKEN_SECRET;

  try {
    const decipher = crypto.createDecipher("aes192", secret);
    let decrypted = decipher.update(token, "hex", "utf8");
    decrypted += decipher.final("utf8");
    const user = JSON.parse(decrypted);
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send("Invalid token");
  }
};
