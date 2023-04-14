import Users from "../Models/Users.mjs";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({ ...req.body, password: hash });
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
    next(err);
  }
};

export const signin = (req, res, next) => {
  res.status(200).json({ message: "success" });
};
