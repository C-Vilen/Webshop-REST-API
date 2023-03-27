import * as productModel from "./data.model.js";

export async function getAllProducts(res:any) {
  try {
    let allProducts = await productModel.getAllProducts();
    res.json(allProducts);
  } catch (error:any){
    // res.statusMessage=
    res.status(400).send(error.message);
  }
}

// export async function getProduct(req?:any, res?:any) {
//   try {
//     let id = parseInt(req.params.id);
//     let customer = await productModel.getProductByID(id);
//     res.json(customer);
//   } catch (error) {
//     // res.statusMessage=
//     res.status(400).send(error.message);
//   }
// }
