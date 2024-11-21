"use client";
import { useDispatch, useSelector } from "react-redux";
import {
	deleteBook,
	fetchBookById,
	fetchBooks,
	updateBook,
} from "./redux/slice/bookSlice";
import { useEffect, useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { IndianRupee } from "lucide-react";
import Modal from "@/components/ui/modal";

export default function Home() {
	const [searchTerm, setSearchTerm] = useState("");
	const dispatch = useDispatch();
	const { isLoading, data, selectedBook, isError } = useSelector(
		(state) => state.book
	);
	const router = useRouter();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [formValues, setFormValues] = useState({
		title: "",
		author: "",
		price: "",
		published: "",
	});

	const openModal = (bookId) => {
		setIsModalOpen(true);
		dispatch(fetchBookById(bookId));
	};
	const closeModal = () => setIsModalOpen(false);

	useEffect(() => {
		dispatch(fetchBooks());
	}, [dispatch]);

	useEffect(() => {
		if (selectedBook) {
			setFormValues({
				title: selectedBook?.data?.title,
				author: selectedBook?.data?.author,
				price: selectedBook?.data?.price,
				published: selectedBook?.data?.published,
			});
		}
	}, [selectedBook]);

	const filteredBooks = data?.data?.filter(
		(book) =>
			book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
			book.author.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const addNewBook = () => {
		router.push("/new");
	};

	const deleteBookHandler = (bookId) => {
		dispatch(deleteBook(bookId));
		router.push("/");
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log("formValues", selectedBook);

		dispatch(
			updateBook({ bookId: selectedBook?.data?._id, newBook: formValues })
		)
			.unwrap()
			.then((result) => {
				console.log("Book updated successfully:", result);
				setIsModalOpen(false);
				dispatch(fetchBooks());
			})
			.catch((error) => {
				console.error("Failed to update book:", error.message);
			});
		router.push("/");
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormValues((prev) => ({ ...prev, [name]: value }));
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-100 p-8">
			<div className="max-w-6xl mx-auto">
				<Button onClick={addNewBook}>Add</Button>
				<header className="mb-8 text-center">
					<h1 className="text-4xl font-bold text-amber-800 mb-2 flex items-center justify-center">
						<BookOpen className="mr-2" /> Bookworm's Haven
					</h1>
					<p className="text-amber-700">
						Discover your next literary adventure
					</p>
				</header>

				<div className="mb-8 relative">
					<Input
						type="text"
						placeholder="Search books by title or author..."
						className="w-full pl-10 pr-4 py-2 rounded-full border-2 border-amber-300 bg-white shadow-md text-amber-900 placeholder-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
					<Search
						className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-400"
						size={20}
					/>
				</div>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
					{!isLoading &&
					filteredBooks &&
					filteredBooks?.length !== 0 ? (
						filteredBooks.map((book) => (
							<Card
								key={book._id}
								className="overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:scale-105 bg-white border border-amber-200"
							>
								<img
									src={book.coverImage}
									alt={book.title}
									className="w-full h-48 object-cover"
								/>
								<CardContent className="p-4">
									<h2 className="text-xl font-semibold mb-1 text-amber-900">
										{book.title}
									</h2>
									<p className="text-sm text-amber-700 mb-2">
										{book.author}
									</p>
									<div className="flex justify-between items-center">
										<div className="flex justify-start items-center">
											<span>
												<IndianRupee />
											</span>
											<span className="text-lg font-bold text-amber-600">
												{book.price}
											</span>
										</div>
										<span className="text-sm text-amber-500">
											Year: {book.published}
										</span>
									</div>
								</CardContent>
								<CardFooter className="gap-4">
									<Button
										className="w-full bg-orange-400"
										onClick={() => openModal(book._id)}
									>
										Update
									</Button>
									<Button
										className="w-full"
										onClick={() =>
											deleteBookHandler(book._id)
										}
									>
										Delete
									</Button>
								</CardFooter>
							</Card>
						))
					) : (
						<div>
							<h1>No Books</h1>
						</div>
					)}
				</div>
			</div>
			<Modal isOpen={isModalOpen} closeModal={closeModal}>
				<h2 className="text-xl font-semibold mb-4">Update Book</h2>
				{selectedBook && selectedBook?.data?.length !== 0 ? (
					<form onSubmit={handleSubmit}>
						<div className="mb-4">
							<label className="block text-sm font-medium text-gray-700">
								Title
							</label>
							<input
								type="text"
								name="title"
								value={formValues.title}
								onChange={handleChange}
								className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
								required
							/>
						</div>
						<div className="mb-4">
							<label className="block text-sm font-medium text-gray-700">
								Author
							</label>
							<input
								type="text"
								name="author"
								value={formValues.author}
								onChange={handleChange}
								className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
								required
							/>
						</div>
						<div className="mb-4">
							<label className="block text-sm font-medium text-gray-700">
								Price
							</label>
							<input
								type="number"
								name="price"
								value={formValues.price}
								onChange={handleChange}
								className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
								required
							/>
						</div>
						<div className="mb-4">
							<label className="block text-sm font-medium text-gray-700">
								Published Year
							</label>
							<input
								type="number"
								name="published"
								value={formValues.published}
								onChange={handleChange}
								className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
								required
							/>
						</div>
						<div className="flex justify-end gap-4">
							<button
								type="button"
								onClick={closeModal}
								className="px-4 py-2 bg-gray-300 rounded-md text-gray-700 hover:bg-gray-400"
							>
								Cancel
							</button>
							<button
								type="submit"
								className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
							>
								Update
							</button>
						</div>
					</form>
				) : (
					"No content"
				)}
			</Modal>
		</div>
	);
}
