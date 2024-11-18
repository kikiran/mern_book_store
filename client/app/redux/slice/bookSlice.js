import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchBooks = createAsyncThunk("fetchBooks", async () => {
	const res = await fetch("https://jsonplaceholder.typicode.com/todos");
	if (!res.ok) {
		throw new Error("Failed to fetch books");
	}
	return res.json();
});

const bookSlice = createSlice({
	name: "book",
	initialState: {
		isLoading: false,
		data: [],
		isError: false,
	},

	extraReducers: (builder) => {
		builder.addCase(fetchBooks.pending, (state, action) => {
			state.isLoading = true;
		});
		builder.addCase(fetchBooks.fulfilled, (state, action) => {
			state.isLoading = false;
			state.data = action.payload;
		});
		builder.addCase(fetchBooks.rejected, (state, action) => {
			state.isLoading = true;
			state.isError = true;
		});
	},
});

export default bookSlice.reducer;
