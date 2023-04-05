import * as fs from "fs";
import { ProductInterface } from "../products/products.model"
const CATEGORIES_FILE = "./data/categories.json"

interface CategoryInterface{
  categoryId: number;
  categoryName: String;
  productIds: Array<ProductInterface>;
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
  let dataArray = await getCategoriesFile();
  return dataArray.categories;
}