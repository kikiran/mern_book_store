import mongoose from "mongoose";

export const connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGO_URI);
		console.log("Connected DB Successfully", conn.connection.host);
	} catch (error) {
		console.log("Error connecting to Mongoose", error);
		process.exit(1);
	}
};
