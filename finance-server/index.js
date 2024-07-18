import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import Kpi from "./models/KPI.js";
import kpiRoutes from "./routes/kpi.js";
import {kpis} from "./data/data.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use("/finance", kpiRoutes);

const URL = process.env.MONGO_URL;
const PORT = process.env.PORT || 9000;
console.log(URL);

mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
   
    }).then(async () => {
        app.listen(PORT, () => 
            console.log(`SERVER is running on port ${PORT}`)
            );

        {/* To upload data porperly */}
        await mongoose.connection.db.dropDatabase();
        Kpi.insertMany(kpis);
    }).catch((error) => console.log("failed to connect to db", error));