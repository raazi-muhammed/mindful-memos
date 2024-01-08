import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import schedule from "node-schedule";
dotenv.config();

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
    express.json({
        limit: "50mb",
    })
);

import "./database/connectDb";
import { appRouter } from "./routers/index";
import { sendNoteToMailingList } from "./controllers/admin.controllers";

app.use(
    cors({
        origin: "http://localhost:8080",
        credentials: true,
    })
);

app.use(
    "/api/v1",
    createExpressMiddleware({
        router: appRouter,
        createContext: ({ req, res }) => {
            return { authorization: req.headers.authorization };
        },
    })
);

app.listen(4000, () => {
    console.log(`Server Started\t: http://localhost:4000`);
});

/* For sending emails everyday */
const CORN_JOB_EXPRESSION = "0 9 */24 * *"; //At 09:00 AM, every 24 days ("0 9 */24 * *")
// */5 * * * * - every 5 min // for testing

schedule.scheduleJob(CORN_JOB_EXPRESSION, async function () {
    try {
        const report = await sendNoteToMailingList();
        console.log(`Mail send at ${new Date()}`);
        console.log(
            `Report
        `,
            report
        );
    } catch (error) {
        console.log(`Mail send failed at ${new Date()}`);
    }
});

export type AppRouter = typeof appRouter;
