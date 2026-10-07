import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema(
  {
    productVariant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductVariant",
      required: true,
      unique: true,
    },

    reserved: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Inventory = mongoose.model(
  "Inventory",
  inventorySchema
);

export default Inventory;