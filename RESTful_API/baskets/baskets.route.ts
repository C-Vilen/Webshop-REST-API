// index.js
import express from "express";
import { } from "./baskets.controller.js";

export const basketsRouter = express.Router();

// middleware specific to this route
basketsRouter.use(express.json());

// route handlers
