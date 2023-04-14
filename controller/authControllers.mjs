import Users from "../Models/Users.mjs";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
// import { handleError } from "../error.js";
export const signup = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new Users({ ...req.body, password: hash });
    await newUser.save();
    const token = jwt.sign({ id: newUser._id }, process.env.JWT);
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
    const token = jwt.sign({ id: user._id }, process.env.JWT);
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
