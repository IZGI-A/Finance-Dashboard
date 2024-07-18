import express from "express";
import Kpi from "../models/KPI.js";

const router = express.Router();

router.get("/kpis", async (request, response) => {
    try {
        const kpis = await Kpi.find();
        response.status(200).json(kpis);
    }
    catch (error) {
       response.status(404).json({ message: error.message });
    }
});
export default router;