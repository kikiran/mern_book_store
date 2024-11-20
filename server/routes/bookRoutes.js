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
router.put("/:id", updateBook);

//delete book
router.delete("/:id", deleteBook);

export default router;
