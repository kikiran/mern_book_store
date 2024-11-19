"use client";
import { useDispatch, useSelector } from "react-redux";
import { deleteBook, fetchBooks } from "./redux/slice/bookSlice";
import { useEffect, useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { IndianRupee } from "lucide-react";

export default function Home() {
	const [searchTerm, setSearchTerm] = useState("");
	const dispatch = useDispatch();
	const { isLoading, data, isError } = useSelector((state) => state.book);
	const router = useRouter();
	console.log("================================", data);
	useEffect(() => {
		dispatch(fetchBooks());
	}, [dispatch]);

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
		// router.push("/");
	};

	// if (isError) return <div>Error: Something went wrong</div>;

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
								<CardFooter>
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
		</div>
	);
}
