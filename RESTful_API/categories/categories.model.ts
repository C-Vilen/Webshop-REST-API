import * as fs from "fs";
import { ProductInterface, getProductByID } from "../products/products.model"
const CATEGORIES_FILE = "./data/categories.json"

interface CategoryInterface{
  categoryId: number;
  categoryName: String;
  productIds: Array<number>;
}

// return all data from file
export async function getCategoriesFile() {
  try {
    let dataTxt = await fs.readFileSync(CATEGORIES_FILE, "utf-8");
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
  fs.writeFileSync(CATEGORIES_FILE, dataTxt)
}

//return all categories
export async function getAllCategories() {
  let categoryArray = await getCategoriesFile();
  return categoryArray.categories;
}

// Returns specfic categoryArray with associated product objects
export async function getProductsByCategory(categoryId:number) {
  let categoryArray = await getAllCategories();
  let index = categoryArray.findIndex((currCategory:any) => currCategory.categoryId === categoryId)
  let productsArray:any = [];
  for (let productID of categoryArray[index].productsIds) {
    const product = await getProductByID(productID)
    productsArray.push(product)
  }
  // Replace the productsIds array with the new productsArray
  categoryArray[index].productsIds = productsArray;
  if (index===-1)
    throw new Error('Category does not exist');
  else return categoryArray[index];
}