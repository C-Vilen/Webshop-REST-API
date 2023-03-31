import * as dataModel from "./data.model.js";
import express, { Request, Response } from "express";

//GET method to retrieve all products
export async function getAllProducts(req:Request, res:Response) {
  try {
    let allProducts = await dataModel.getAllProducts();
    res.json(allProducts);
  } catch (error: unknown){
    // res.statusMessage=
    res.status(400).send((error as Error).message);
  }
}

// GET method to retrieve specific product
export async function getProduct(req:Request, res:Response) {
  try {
    let id = parseInt(req.params.id);
    let customer = await dataModel.getProductByID(id);
    res.json(customer);
  } catch (error) {
    // res.statusMessage=
    res.status(400).send((error as Error).message);
  }
}

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

//POST method to create a customer
export async function postCustomer(req:Request, res:Response) {
  try {
    let newCustomer = req.body;
    await dataModel.createCustomer(newCustomer);
    res.end()
  } catch (error) {
    // res.statusMessage=
    res.status(400).send((error as Error).message);
  }
}