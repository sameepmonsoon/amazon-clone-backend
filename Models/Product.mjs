import mongoose from "mongoose";

const ProductSchema = mongoose.Schema(
  {
    id: { type: Number },
    title: { type: String },
    price: { type: Number },
    description: { type: String },
    category: { type: String },
    image: { type: String },
    rating: {
      rate: { type: Number },
      count: { type: Number },
    },
  },
  { timestamps: true }
);

export default mongoose.model("Product", ProductSchema);
