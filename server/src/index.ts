import express, { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
dotenv.config();

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

import "./database/connectDb";
import { appRouter } from "./routers/index";

app.use(
    cors({
        origin: "http://localhost:8080",
        credentials: true,
    })
);

app.use("/api/v1", createExpressMiddleware({ router: appRouter }));

app.listen(4000, () => {
    console.log(`Server Started\t: http://localhost:4000`);
});

export type AppRouter = typeof appRouter;
