import * as dataModel from "./data.model.js";
import express, { Request, Response } from "express";

export async function getAllProducts(req:Request, res:Response) {
  try {
    let allProducts = await dataModel.getAllProducts();
    res.json(allProducts);
  } catch (error: unknown){
    // res.statusMessage=
    res.status(400).send((error as Error).message);
  }
}

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


export async function getCategories(req:Request, res:Response) {
  try {
    let allCategories = await dataModel.getAllCategories();
    res.json(allCategories);
  } catch (error) {
    // res.statusMessage=
    res.status(400).send((error as Error).message);
  }
}


export async function postCustomer(req:Request, res:Response) {
  try {
    let newCustomer = req.body;
    await dataModel.addCustomer(newCustomer);
    res.end()
  } catch (error) {
    // res.statusMessage=
    res.status(400).send((error as Error).message);
  }
}


