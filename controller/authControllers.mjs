import Users from "../Models/Users.mjs";
import bcrypt from "bcryptjs";
import crypto from "crypto";

const generateToken = (length) => {
  return crypto.randomBytes(length).toString("hex");
};

export const signup = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const token = generateToken(16); // generate a 16-byte token
    const newUser = new Users({
      ...req.body,
      password: hash,
      token: token, // assign token to the new user
    });
    await newUser.save();
    const { password, ...othersData } = newUser._doc;
    res
      .cookie("access_token", token, {
        maxAge: 24 * 60 * 60 * 1000, // 1 day
        httpOnly: true,
        sameSite: "strict",
      })
      .status(200)
      .json({ token: token, ...othersData });
  } catch (err) {
    const errorMessage =
      'Error creating user: MongoServerError: E11000 duplicate key error collection: test.users index: username_1 dup key: { username: "admin" }';
    const duplicateKeyError = "E11000 duplicate key error";
    const usernameKey = "index: username_1";
    const existingUser = await Users.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already exists." });
    }
    if (
      errorMessage.includes(duplicateKeyError) &&
      errorMessage.includes(usernameKey)
    ) {
      res.status(409).json({
        message: "Please choose a different username.",
      });
    } else {
      res.status(500).send("Internal server error.");
    }
  }
};
export const signin = async (req, res, next) => {
  try {
    const user = await Users.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(401)
        .json({ message: "Account not found. Please sign up to continue." });
    }
    const passwordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!passwordMatch) {
      return res
        .status(401)
        .json({ message: "Incorrect password. Please try again." });
    }
    const token = generateToken(16); // generate a new token
    user.token = token; // update the token field of the authenticated user
    await user.save();
    const { password, ...othersData } = user._doc;
    res
      .cookie("access_token", token, {
        maxAge: 24 * 60 * 60 * 1000, // 1 day
        httpOnly: true,   
        sameSite: "strict",
      })
      .status(200)
      .json({ token: token, ...othersData });
  } catch (err) {
    next(err);
  }
};
