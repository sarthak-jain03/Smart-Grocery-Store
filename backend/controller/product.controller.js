import Product from "../models/product.model.js";
import { spawn } from "child_process";
import path from "path";

export const addProduct = async (req, res) => {
  try {
    const {
      name,
      price,
      description,
      category,
      company,
      inventory,
      daysToExpiry,
      demand,
    } = req.body;

    const images = req.files?.map((file) => file.filename);

    if (
      !name || !price || !description || !category || !company ||
      inventory === undefined || daysToExpiry === undefined || demand === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    
    let offerPrice = price;

    const scriptPath = path.join(process.cwd(), "predictor.py");

    const prediction = spawn("python", [
      scriptPath,
      name,
      company,
      category,
      price,
      daysToExpiry,
      inventory,
      demand,
    ]);

    let result = "";
    prediction.stdout.on("data", (data) => {
      result += data.toString();
    });

    prediction.stderr.on("data", (data) => {
      console.error(`Python error: ${data.toString()}`);
    });

    prediction.on("close", async (code) => {
      if (code === 0 && result) {
        offerPrice = parseFloat(result.trim());
      }

      const product = new Product({
        name,
        price,
        offerPrice,
        description: description.split(",").map((d) => d.trim()),
        category,
        company,
        image: images,
        inventory,
        daysToExpiry,
        demand,
        inStock: true,
      });

      const savedProduct = await product.save();

      return res.status(201).json({
        success: true,
        product: savedProduct,
        message: "Product added successfully",
      });
    });
  } catch (error) {
    console.error("Error in addProduct:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server error while adding product",
    });
  }
};



export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, products });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, product });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

export const changeStock = async (req, res) => {
  try {
    const { id, inStock } = req.body;
    if (!id || typeof inStock !== "boolean") {
      return res.status(400).json({
        success: false,
        message: "Product ID and stock status (true/false) are required",
      });
    }

    const product = await Product.findByIdAndUpdate(id, { inStock }, { new: true });
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.status(200).json({
      success: true,
      product,
      message: "Stock updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
