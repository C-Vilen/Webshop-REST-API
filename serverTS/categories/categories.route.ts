// index.js
import express from "express";
import { getCategories } from "./categories.controller.js";

export const categoriesRouter = express.Router();

// middleware specific to this route
categoriesRouter.use(express.json());

// route handlers
categoriesRouter.get("/categories", getCategories)
