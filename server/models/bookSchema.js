import mongoose from "mongoose";

const booksSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		author: {
			type: String,
			required: true,
		},
		coverImage: {
			type: String,
			required: true,
		},
		published: {
			type: Number,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
	},
	{ timestamps: true }
);

const Book = mongoose.model("Book", booksSchema);

export default Book;
