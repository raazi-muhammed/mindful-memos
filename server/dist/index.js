"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const admin_routes_1 = __importDefault(require("./routes/admin.routes"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
require("./database/connectDb");
const errorHandler_1 = __importDefault(require("./middlewares/errorHandler"));
app.use((0, cors_1.default)({
    origin: "http://localhost:8080",
    credentials: true,
}));
app.get("/", (req, res) => {
    return res.status(200).json({
        success: true,
        message: "Hello world",
    });
});
app.use("/user", user_routes_1.default);
app.use("/admin", admin_routes_1.default);
app.use(errorHandler_1.default);
app.listen(4000, () => {
    console.log(`Server Started\t: http://localhost:4000`);
});
