import mongoose from "mongoose";

async function connectDB() {
  if (mongoose.connections[0].readyState) return;
  mongoose.set("strictQuery", false);
  console.log("MONGODB_URL =>", process.env.MONGODB_URL);
  await mongoose.connect(process.env.MONGODB_URL);
  console.log("Connected to DB 💚⚡✅");
}

export default connectDB;
