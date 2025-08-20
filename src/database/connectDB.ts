import mongoose from "mongoose";

export async function ConnectDB() {
  if (!process.env.MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable");
  }
  if (mongoose.connection.readyState === 1) {
    console.log("db already connected");
    return
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log("db connected successfully")
  } catch (error) {
    console.log("db error", error);
  }
}
