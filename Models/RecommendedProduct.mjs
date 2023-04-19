import mongoose from "mongoose";

const RecommendedProductSchema = mongoose.Schema(
  {
    recommendedProducts: [
      {
        type: Array,
        ref: "Product",
        default: [],
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("RecommendedProduct", RecommendedProductSchema);
