import mongoose from "mongoose";

export async function databaseConnection(URI: string) {
  try {
    await mongoose.connect(URI);
    console.log("mongodb connection successfull");
  } catch (error) {
    console.error("MongoDB connection error", error);
    process.exit(1);
  }
}
