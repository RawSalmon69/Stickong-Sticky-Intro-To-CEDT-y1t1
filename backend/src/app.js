import express from "express";
import cors from "cors";
import ItemRoute from "./routes/itemRoute.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use("/items", ItemRoute);

export default app;
