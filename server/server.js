import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import books from "./routes/bookRoutes.js";
dotenv.config();

const port = process.env.PORT || 8089;

const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/books", books);

const startServer = () => {
	try {
		connectDB();
		app.listen(port, () => {
			console.log("listening on port " + port);
		});
	} catch (error) {
		console.log("Something wrong with your server", error);
		process.exit(1);
	}
};

startServer();