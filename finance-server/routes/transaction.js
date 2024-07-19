import express from "express";
import Transaction from "../models/Transaction.js";

const router = express.Router();

router.get("/transactions", async (request, response) => {
    try {
        const Transactions = await Transaction.find();
        response.status(200).json(Transactions);
    }
    catch (error) {
       response.status(404).json({ message: error.message });
    }
});
export default router;