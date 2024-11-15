import Book from "../models/bookSchema";

export const getBooks = async (req, res) => {
	try {
        const books = await Book.find({})
		res.status(200).json({ success: true, data: books });
	} catch (error) {
		res.status(404).json({
			succss: false,
			message: "Please check something went wrong",
		});
	}

export const createBook = async (req, res) => { 
    const book = req.body;

    if(!book.title || !book.author || !book.coverImage || !book.price || !book.published) {
        res.status(404).json({success: false, message: "All fields are required"});
    }
    const addBook = new Book(book);
    try {
        await addBook.save();
        res.status(201).json({success: true, message: "Book saved successfully"});
    }catch (error) {
        res.status(500).json({
            success: false,
            message: "Please check something went wrong",
        });
    }

}

export const updateBook = async (req, res) => { 
    const book = req.body;
    const { id} = req.params

}