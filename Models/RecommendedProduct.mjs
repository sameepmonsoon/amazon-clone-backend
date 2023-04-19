import mongoose from "mongoose";

const RecommendedProductSchema = mongoose.Schema(
  {
    recommendedProducts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("RecommendedProduct", RecommendedProductSchema);
