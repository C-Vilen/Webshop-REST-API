import * as dataModel from "./categories.model.js";
import express, { Request, Response } from "express";


//GET method to retrieve all categories
export async function getCategories(req:Request, res:Response) {
  try {
    let allCategories = await dataModel.getAllCategories();
    res.json(allCategories);
  } catch (error) {
    // res.statusMessage=
    res.status(400).send((error as Error).message);
  }
}

//GET method to retrieve all categories
export async function getOverCategories(req:Request, res:Response) {
  try {
    let allCategories = await dataModel.getAllOverCategories();
    res.json(allCategories);
  } catch (error) {
    res.status(400).send((error as Error).message);
  }
}

// //GET method to retrieve all products within a specific category
// export async function getProductsByCategory(req:Request, res:Response) {
//   try {
//     let id = parseInt(req.params.id);
//     let category=await dataModel.getProductsByCategory(id);
//     res.json(category);
//   }
//   catch (error) {
//     res.status(400).send((error as Error).message);
//   }
// }