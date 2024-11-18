import express from "express";
import {
	createBook,
	deleteBook,
	getBookById,
	getBooks,
	updateBook,
} from "../controllers/bookController.js";

const router = express.Router();

//Get Books
router.get("/", getBooks);

//Get Book by id
router.get("/:id", getBookById);

//Add Book
router.post("/", createBook);

//update book
router.put("/", updateBook);

//delete book
router.delete("/", deleteBook);

export default router;
