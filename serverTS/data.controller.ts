import * as productModel from "./data.model.js";
import express, { Request, Response } from "express";

export async function getAllProducts(req:Request, res:Response) {
  try {
    let allProducts = await productModel.getAllProducts();
    res.json(allProducts);
  } catch (error: unknown){
    // res.statusMessage=
    res.status(400).send((error as Error).message);
  }
}

// export async function getProduct(req:Request, res:Response) {
//   try {
//     let id = parseInt(req.params.id);
//     let customer = await productModel.getProductByID(id);
//     res.json(customer);
//   } catch (error) {
//     // res.statusMessage=
//     res.status(400).send(error.message);
//   }
// }
