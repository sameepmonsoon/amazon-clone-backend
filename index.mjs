import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/authRoutes.mjs";
import cartRoutes from "./routes/cartRoutes.mjs";
import paymentRoutes from "./routes/paymentRoutes.mjs";
const port = 8000;
const app = express();
app.use(cors({ origin: "*" }));
app.use(cookieParser());
app.use(express.json());
dotenv.config();
const connect = () => {
  mongoose.set("strictQuery", false);
  mongoose
    .connect(process.env.MONGO)
    .then(() => {
      console.log("connected to mongodb database");
    })
    .catch((err) => {
      throw err;
    });
};

// routes
app.use("/auth", authRoutes);
app.use("/cart", cartRoutes);
app.use("/payment", paymentRoutes);

app.listen(port, () => {
  connect();
  console.log("listening to port 8000");
});
