import mongoose from "mongoose";
import { loadType } from "mongoose-currency";

const { Schema } = mongoose;
loadType(mongoose);

const currencyOptions = {
  type: mongoose.Types.Currency,
  currency: "USD",
  get: (value) => value / 100,
};

const monthlyDataSchema = new Schema(
  {
    month: {
      type: String,
      required: true,
    },
    revenue: currencyOptions,
    expenses: currencyOptions,
    operationalExpenses: currencyOptions,
    nonOperationalExpenses: currencyOptions,
  },
  { toJSON: { getters: true } }
);

const dailyDataSchema = new Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    revenue: currencyOptions,
    expenses: currencyOptions,
  },
  { toJSON: { getters: true } }
);

const KPISchema = new Schema(
  {
    totalProfit: currencyOptions,
    totalRevenue: currencyOptions,
    totalExpenses: currencyOptions,
    expensesByCategory: {
      type: Map,
      of: currencyOptions,
    },
    monthlyData: [monthlyDataSchema],
    dailyData: [dailyDataSchema],
  },
  { timestamps: true, toJSON: { getters: true } }
);

const KPI = mongoose.model("KPI", KPISchema);

export default KPI;
