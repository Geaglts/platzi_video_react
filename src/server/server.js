import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";

dotenv.config();

const { ENV, PORT } = process.env;

const app = express();

// Development config
if (ENV === "development") {
    app.use(morgan("dev"));
} else {
    app.use(morgan("common"));
}

app.get("/", (req, res) => {
    res.status(200).json({ message: "Todo bien en casa" });
});

app.listen(PORT, (err) => {
    if (err) console.log(err);
    else console.log(`Server running on port ${PORT}`);
});
