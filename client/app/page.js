"use client";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks } from "./redux/slice/bookSlice";
import { useEffect } from "react";

export default function Home() {
	const dispatch = useDispatch();
	const { isLoading, data, isError } = useSelector((state) => state.book);

	useEffect(() => {
		dispatch(fetchBooks());
	}, [dispatch]);

	if (isLoading) return <div>Loading...</div>;
	if (isError) return <div>Error: {errorMessage}</div>;

	console.log("================================", data);
	return (
		<div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
			<main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
				<h1 className="text-3xl">Wlcome</h1>
			</main>
		</div>
	);
}
