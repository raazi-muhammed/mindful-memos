import express, { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import userRoutes from "./routes/user.routes";
import adminRoutes from "./routes/admin.routes";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

import "./database/connectDb";
import errorHandler from "./middlewares/errorHandler";

app.use(
    cors({
        origin: "http://localhost:8080",
        credentials: true,
    })
);

app.get("/", (req: Request, res: Response) => {
    return res.status(200).json({
        success: true,
        message: "Hello world",
    });
});

app.use("/user", userRoutes);
app.use("/admin", adminRoutes);

app.use(errorHandler);

app.listen(4000, () => {
    console.log(`Server Started\t: http://localhost:4000`);
});
