import { configureStore } from "@reduxjs/toolkit";
import bookReducer from "./slice/bookSlice";

export const store = configureStore({
	reducer: {
		book: bookReducer,
	},
});
