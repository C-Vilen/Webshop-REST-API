import {customersRouter} from "./customers/customers.route"
import { basketsRouter } from "./baskets/baskets.route.js";
import { categoriesRouter } from "./categories/categories.route.js";
import { productsRouter } from "./products/products.route.js";
import express, { Express, Request, Response } from "express";


const app:Express = express();
const port = 3000;

// This is a built-in middleware function in Express. It parses incoming requests with JSON payloads.
app.use(express.json());

// paths '/customer' are handled by customerRouter
app.use(customersRouter, basketsRouter,categoriesRouter,productsRouter);

// Allow access control from different port i.e. the react webshop project.
app.use((req, res, next) => {
  //cors implement here
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/', (req:Request, res:Response) => {
  res.send('Express + TypeScript Server');
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

