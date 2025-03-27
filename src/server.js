import express from "express";
import cors from "cors";
import pino from "pino-http";
import dotenv from "dotenv";
dotenv.config();

export const startServer = () => {
    const app = express();

    app.use(cors());
    app.use(express.json());
    // app.use(pino({
    //     transport: {
    //         target: "pino-pretty"
    //     }
    // }));

    app.get("/", (req, res) => {
        res.json({
            message: "Server start succesfully"
        });
    });
    app.use((req, res) => {
        res.status(404).json({
            message: `${req.url}not found`
        });
    });
    app.use((error, req, res, next) => {
        res.status(500).json({
            message: error.message,
        });
    });
    const port= Number(process.env.PORT);
    app.listen(port, () => console.log(`Server running on ${port} port`));

};