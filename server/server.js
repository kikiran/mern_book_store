import express from "express";
import dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT || 8089;

const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", async (req, res) => {
	res.status(200).json("Welcome to Book Store app");
});

app.listen(port, () => {
	console.log("listening on port " + port);
});
