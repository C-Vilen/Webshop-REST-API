// index.js
import express from "express";
import { getAllProducts, getProduct } from "./data.controller.js";

export const dataRouter = express.Router();

// middleware specific to this route
dataRouter.use(express.json());

// route handlers
dataRouter.get("/products", getAllProducts);
dataRouter.get("/products/:id", getProduct);
