import jwt from "jsonwebtoken";

export const authenticateToken = (req, res, next) => {
  // const token = req.cookies.access_token;
  // to authorize the token received from the header of the api
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return 401, "You are not authenticated";

  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) return next(createError(403, "Token is invalid"));
    req.user = user;
    next();
  });
};
