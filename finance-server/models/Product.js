import mongoose from "mongoose";
import { loadType } from "mongoose-currency";

const { Schema } = mongoose;
loadType(mongoose);

const currencyOptions = {
  type: mongoose.Types.Currency,
  currency: "USD",
  get: (value) => value / 100,
};

const ProductSchema = new Schema(
  {
    price: currencyOptions,
    expense: currencyOptions,
    transactions: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Transaction",
      },
    ]
  },
  { timestamps: true, toJSON: { getters: true } }
);

const Product = mongoose.model("Product", ProductSchema);

export default Product;
