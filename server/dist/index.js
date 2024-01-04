"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.get("/", (req, res) => {
    return res.status(200).json({
        success: true,
        message: "Hello world 3",
    });
});
app.listen(4000, () => {
    console.log(`Server Started\t: http://localhost:4000`);
});
