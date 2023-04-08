// index.js
import express from "express";
import { addProductToBasket, getBasketProducts } from "./baskets.controller.js";

export const basketsRouter = express.Router();

// middleware specific to this route
basketsRouter.use(express.json());

// route handlers
basketsRouter.post('/baskets/:customerid/:productid', addProductToBasket);
basketsRouter.get('/baskets/:customerid', getBasketProducts)