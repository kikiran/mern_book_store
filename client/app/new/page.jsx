"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BookPlus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { createBook } from "../redux/slice/bookSlice";

export default function AddBook() {
	const dispatch = useDispatch();
	const [title, setTitle] = useState("");
	const [author, setAuthor] = useState("");
	const [coverImage, setCoverImage] = useState("");
	const [published, setPublished] = useState("");
	const [price, setPrice] = useState("");
	const router = useRouter();
	const { isLoading, isError } = useSelector((state) => state.book);

	const handleSubmit = (e) => {
		e.preventDefault();
		// Here you would typically send this data to your backend API
		const newBook = { title, author, coverImage, published, price };
		dispatch(createBook(newBook));
		// After successful submission, redirect to the book list page
		router.push("/");
	};

	const backToHomePage = () => {
		router.push("/");
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-100 p-8">
			<Card className="max-w-md mx-auto">
				<CardHeader>
					<CardTitle className="text-2xl font-bold text-amber-800 flex items-center justify-center">
						<BookPlus className="mr-2" /> Add New Book
					</CardTitle>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit} className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="title" className="text-amber-700">
								Title
							</Label>
							<Input
								id="title"
								value={title}
								onChange={(e) => setTitle(e.target.value)}
								required
								className="border-amber-300 focus:ring-amber-500"
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="author" className="text-amber-700">
								Author
							</Label>
							<Input
								id="author"
								value={author}
								onChange={(e) => setAuthor(e.target.value)}
								required
								className="border-amber-300 focus:ring-amber-500"
							/>
						</div>
						<div className="space-y-2">
							<Label
								htmlFor="imageUrl"
								className="text-amber-700"
							>
								Image URL
							</Label>
							<Input
								id="imageUrl"
								type="url"
								value={coverImage}
								onChange={(e) => setCoverImage(e.target.value)}
								className="border-amber-300 focus:ring-amber-500"
							/>
						</div>
						<div className="space-y-2">
							<Label
								htmlFor="publishedYear"
								className="text-amber-700"
							>
								Published Year
							</Label>
							<Input
								id="publishedYear"
								type="number"
								min="1000"
								max={new Date().getFullYear()}
								value={published}
								onChange={(e) => setPublished(e.target.value)}
								required
								className="border-amber-300 focus:ring-amber-500"
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="price" className="text-amber-700">
								Price
							</Label>
							<Input
								id="price"
								type="number"
								value={price}
								onChange={(e) => setPrice(e.target.value)}
								required
								className="border-amber-300 focus:ring-amber-500"
							/>
						</div>
						<Button
							type="submit"
							className="w-full bg-amber-600 hover:bg-amber-700 text-white"
						>
							Add Book
						</Button>
						<Button
							type="submit"
							className="w-full bg-red-400 hover:bg-amber-700 text-white"
							onClick={backToHomePage}
						>
							Cancel
						</Button>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
