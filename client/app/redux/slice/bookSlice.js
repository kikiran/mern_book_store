import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

console.log("API_URLAPI_URLAPI_URLAPI_URLAPI_URL", process);
export const fetchBooks = createAsyncThunk("fetchBooks", async () => {
	const res = await fetch(baseURL);
	if (!res.ok) {
		throw new Error("Failed to fetch books");
	}
	return res.json();
});

export const createBook = createAsyncThunk("createBook", async (newBook) => {
	const res = await fetch(baseURL, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(newBook),
	});
});

export const deleteBook = createAsyncThunk(
	"deleteBook",
	async (bookId, { rejectWithValue }) => {
		try {
			const res = await fetch(`${baseURL}/${bookId}`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
			});
			if (!res.ok) {
				const errorData = await res.json();
				return rejectWithValue(errorData);
			}
			return bookId;
		} catch (error) {
			return rejectWithValue({
				message: error.message || "Something went wrong",
			});
		}
	}
);

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

		//create book
		builder.addCase(createBook.pending, (state, action) => {
			state.isLoading = true;
			state.isError = true;
		});
		builder.addCase(createBook.fulfilled, (state, action) => {
			state.isLoading = false;
			if (Array.isArray(state.data)) {
				state.data.push(action.payload);
			}
		});
		builder.addCase(createBook.rejected, (state, action) => {
			state.isLoading = false;
			state.isError = action.payload || "Failed to add book";
		});

		//delete book
		builder.addCase(deleteBook.pending, (state, action) => {
			state.isLoading = true;
			state.isError = true;
		});
		builder.addCase(deleteBook.fulfilled, (state, action) => {
			state.isLoading = false;
			if (Array.isArray(state.data)) {
				state?.data?.filter((book) => book.id !== action.payload);
			}
		});
		builder.addCase(deleteBook.rejected, (state, action) => {
			state.isLoading = false;
			state.isError = action.payload || "Failed to delete book";
		});
	},
});

export default bookSlice.reducer;
