"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_2 = require("@trpc/server/adapters/express");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json({
    limit: "50mb",
}));
require("./database/connectDb");
const index_1 = require("./routers/index");
app.use((0, cors_1.default)({
    origin: "http://localhost:8080",
    credentials: true,
}));
app.use("/api/v1", (0, express_2.createExpressMiddleware)({ router: index_1.appRouter }));
app.listen(4000, () => {
    console.log(`Server Started\t: http://localhost:4000`);
});
