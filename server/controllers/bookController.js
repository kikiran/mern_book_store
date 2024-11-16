import mongoose from "mongoose";
import Book from "../models/bookSchema";

export const getBooks = async (req, res) => {
	try {
		const books = await Book.find({});
		res.status(200).json({ success: true, data: books });
	} catch (error) {
		res.status(404).json({
			succss: false,
			message: "Please check something went wrong",
		});
	}
};

export const createBook = async (req, res) => {
	const book = req.body;

	if (
		!book.title ||
		!book.author ||
		!book.coverImage ||
		!book.price ||
		!book.published
	) {
		res.status(404).json({
			success: false,
			message: "All fields are required",
		});
	}
	const addBook = new Book(book);
	try {
		await addBook.save();
		res.status(201).json({
			success: true,
			message: "Book saved successfully",
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Please check something went wrong",
		});
	}
};

export const updateBook = async (req, res) => {
	const book = req.body;
	const { id } = req.params;
	if (!mongoose.Types.ObjectId.isValid(id)) {
		res.status(404).json({
			success: false,
			message: "Book Id is not valid",
		});
	}
	try {
		const updateBook = await Book.findByIdAndUpdate(id, book, {
			new: true,
			runValidators: true,
		});

		res.status(200).json({
			success: true,
			message: "Book updated successfully",
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Update book failed",
		});
	}
};

export const deleteBook = async (req, res) => {
	const { id } = req.params;
	if (!mongoose.Types.ObjectId.isValid(id)) {
		res.status(404).json({
			success: false,
			message: "Book Id is not valid",
		});
	}

	try {
		await Book.findByIdAndDelete(id);
		res.status(200).json({
			success: true,
			message: "Book successfully deleted",
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Book Id is not valid",
		});
	}
};

export const getBookById = async (req, res) => {
	const { id } = req.params;
	if (!mongoose.Types.ObjectId.isValid(id)) {
		res.status(404).json({
			success: false,
			message: "Book Id is not valid",
		});
	}

	try {
		const book = await Book.findOne({});
		res.status(200).json({ success: true, data: book });
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "book id is not valid",
		});
	}
};
