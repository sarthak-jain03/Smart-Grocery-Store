import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import DataConnect from "./config/DataConnect.js"; 
dotenv.config();
import userRoutes from "./routes/user.routes.js";
import sellerRoutes from "./routes/seller.routes.js";
import productRoutes from "./routes/product.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import addressRoutes from "./routes/address.routes.js";
import orderRoutes from "./routes/order.routes.js";
import { connectCloudinary } from "./config/cloudinary.js";

import { scheduleDailyUpdates } from "./cronJobs/dailyUpdater.js";

const app = express();

await connectCloudinary();

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));
app.use(cookieParser());
app.use(express.json());


app.use("/images", express.static("uploads"));
app.use("/api/user", userRoutes);
app.use("/api/seller", sellerRoutes);
app.use("/api/product", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/address", addressRoutes);
app.use("/api/order", orderRoutes);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  DataConnect();
  scheduleDailyUpdates();
  console.log(`Server is running on port ${PORT}`);
});