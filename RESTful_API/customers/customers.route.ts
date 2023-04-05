// index.js
import express from "express";
import { postCustomer} from "./customers.controller.js";

export const customersRouter = express.Router();

// middleware specific to this route
customersRouter.use(express.json());

// route handlers

customersRouter.post("/customers", postCustomer);