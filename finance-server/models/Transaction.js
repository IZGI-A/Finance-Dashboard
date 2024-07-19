import mongoose from "mongoose";
import { loadType } from "mongoose-currency";

const { Schema } = mongoose;
loadType(mongoose);

const currencyOptions = {
  type: mongoose.Types.Currency,
  currency: "USD",
  get: (value) => value / 100,
};

const TransactionSchema = new Schema(
  {
    buyer: currencyOptions,
    amount: currencyOptions,
    productIds: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ]
  },
  { timestamps: true, toJSON: { getters: true } }
);

const Transaction = mongoose.model("Transaction", TransactionSchema);

export default Transaction;
