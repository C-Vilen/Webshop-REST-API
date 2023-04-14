import * as fs from "fs";
const PRODUCTS_FILE = "./data/products.json"

//Types for JSON objects

export interface ProductInterface{
  productId: number;
  productName: String;
  productDescription: String;
  productPrice: number;
  imgSrc: String;
}

// return all data from file
export async function getProductsFile() {
  try {
    let dataTxt = await fs.readFileSync(PRODUCTS_FILE, "utf-8");
    let data = JSON.parse(dataTxt);
    return data;
  } catch (err:any) {
    if (err.code === "ENOENT") {
      // file does not exits
      await saveDefaultArray([]); // create a new file with ampty array
      return []; // return empty array
    } // // cannot handle this exception, so rethrow
    else throw err;
  }
}
// saves an empty array to data.JSON if array does not exist
async function saveDefaultArray(data = []) {
  let dataTxt = JSON.stringify(data);
  fs.writeFileSync(PRODUCTS_FILE, dataTxt)
}

// return all products without productDescription from file
export async function getAllProducts() {
  let productArray = await getProductsFile();
  let outputDataArray: Array<ProductInterface> = productArray.map((element:ProductInterface) => {
    const { productDescription, ...rest } = element; // using object destructuring to remove `productDescription`
    return rest;
  });
  return outputDataArray;
}

//return all products
async function getAllProductsWithDetails() {
  let dataArray = await getProductsFile();
  return dataArray;
}

// checks if product ID already exist
function findProduct(productArray:any, Id:any) {
  return productArray.findIndex((currProduct:any) => currProduct.productId === Id);
}

//return product with specific ID
export async function getProductByID(productId:number) {
  let productArray = await getAllProductsWithDetails();
  let index = findProduct(productArray, productId);
  if (index===-1)
    throw new Error(`Product with ID:${productId} doesn't exist`);
  else return productArray[index];
}

