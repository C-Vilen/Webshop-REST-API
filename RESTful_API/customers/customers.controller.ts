import * as dataModel from "./customers.model.js";
import express, { Request, Response } from "express";

//POST method to create a customer
export async function postCustomer(req:Request, res:Response) {
  try {
    let newCustomer = req.body;
    await dataModel.createCustomer(newCustomer);
    res.status(201).send('Customer created successfully');
  } catch (error) {
    // res.statusMessage=
    res.status(404).send((error as Error).message);
  }
}