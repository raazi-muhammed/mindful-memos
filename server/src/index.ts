import express, { Request, Response } from "express";

const app = express();

app.get("/", (req: Request, res: Response) => {
    return res.status(200).json({
        success: true,
        message: "Hello world 3",
    });
});

app.listen(4000, () => {
    console.log(`Server Started\t: http://localhost:4000`);
});
