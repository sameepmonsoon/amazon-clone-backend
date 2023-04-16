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
      .json({ token: token, _id, ...othersData });
  } catch (err) {
    res.status(400).json({ message: "Error creating user: " + err.message });
  }
};
export const signin = async (req, res, next) => {
  try {
    const user = await Users.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const passwordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
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
