import * as fs from "fs";
import { ProductInterface, getProductByID } from "../products/products.model"
const CATEGORIES_FILE = "./data/categories.json"

interface OverCategoryInterface{
  overCategory: String;
  ocId: Number;
  subCategories: Array<object>
}

interface SubCategoryInterface{
  categoryId: Number;
  categoryName: String;
  productsIds: Array<Number>;
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
  let categoryArray:OverCategoryInterface = await getCategoriesFile();
  return categoryArray;
}

//return all over categories without sub categories
export async function getAllOverCategories() {
  let categoryArray = await getCategoriesFile();

  let outputCategoryArray:OverCategoryInterface = categoryArray.categories.map((category: { overCategory: String; ocId: Number; }) => {
    return {
      overCategory: category.overCategory,
      ocId: category.ocId
    };
  });

  return outputCategoryArray;
}

//return all subcategories from a specific overcategory ID
export async function getOverCategoryByOcID(ocId: number) {
  let categoryArray = await getCategoriesFile();

  let filteredCategory = categoryArray.categories.find((category: { ocId: number; }) => {
    return category.ocId === ocId;
  });

  if (filteredCategory) {
    let outputCategory = filteredCategory.subCategories.map((subCategory: { categoryId: Number; categoryName: String; productsIds: Array<Number>; }) => {
      return {
        categoryId: subCategory.categoryId,
        categoryName: subCategory.categoryName,
        productsIds: subCategory.productsIds
      };
    });

    return {
      overCategory: filteredCategory.overCategory,
      ocId: filteredCategory.ocId,
      subCategories: outputCategory
    };
  } else {
    throw new Error('overcategory does not exist');
  }
}

// Returns all products associated to subcategory
export async function getProductsBySubCategory(ocID: number, categoryId: number) {
  let overCategory = await getOverCategoryByOcID(ocID);
  let subCategory;
  if (overCategory != null) {
    subCategory = overCategory.subCategories.find((sub:any) => sub.categoryId === categoryId);
  }
  if (!subCategory) {
    throw new Error('Overcategory or Subcategory does not exist');
  }

  let productsArray = await Promise.all(
    subCategory.productsIds.map((productId: number) => getProductByID(productId))
  );

  // Remove the 'description' field from each product object
  productsArray = productsArray.map(({ productDescription, ...rest }) => rest);

  subCategory.products = productsArray;

  return subCategory.products;
}
