import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: [String],
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    offerPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    image: {
      type: [String],
      required: true,
    },

    category: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    company: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    inStock: {
      type: Boolean,
      default: true,
      required: true,
    },
    inventory: {
      type: Number,
      required: true,
      min: 0,
    },
    daysToExpiry: {
      type: Number,
      required: true,
      min: 0,
    },
    demand: {
      type: Number,
      required: true,
      min: 1,
      max: 10,
    },
  },
  {
    timestamps: true,
  }
);

productSchema.index({ category: 1, inStock: 1 });

const Product = mongoose.model("Product", productSchema);
export default Product;
