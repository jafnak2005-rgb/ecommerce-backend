import mongoose from "mongoose";

const productVariantSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    size: {
      type: String,
      required: true,
      trim: true,
    },

    color: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
    },

    stock: {
      type: Number,
      required: true,
      default: 0,
    },

    sku: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },

    image: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

const ProductVariant = mongoose.model(
  "ProductVariant",
  productVariantSchema
);

export default ProductVariant;