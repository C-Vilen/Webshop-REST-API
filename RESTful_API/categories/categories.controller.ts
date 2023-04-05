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
