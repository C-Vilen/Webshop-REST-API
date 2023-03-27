import * as fs from "fs";
import * as DATA_FILE from '../data.json';

// return all data from file
export async function getAll() {
  try {
    let dataTxt = fs.readFileSync("../data.json", "utf8");
    console.log(dataTxt);
    let data = JSON.parse(dataTxt);
    return data;
  } catch (err:any) {
    if (err.code === "ENOENT") {
      // file does not exits
      await save([]); // create a new file with ampty array
      return []; // return empty array
    } // // cannot handle this exception, so rethrow
    else throw err;
  }
}

// return all products from file
export async function getAllProducts() {
  let dataArray = await getAll();
  return dataArray;
}

// save array of customers to file
async function save(products = []) {
  let productsTxt = JSON.stringify(products);
  fs.writeFileSync("../data.json", productsTxt)
  // fs.writeFile(DATA_FILE, productsTxt);
}


// // // test function for productId
// function findProduct(productArray, Id) {
//   return productArray.findIndex((currProduct) => currProduct.productId === Id);
// }

// // get product by ID
// export async function getProductByID(productId) {
//   let productArray = await getAllProducts();
//   let index = findProduct(productArray, productId);
//   if (index === -1)
//     throw new Error(`Customer with ID:${productId} doesn't exist`);
//   else return productArray[index];
// }

// create a new customer
// export async function add(newCustomer) {
//   let productArray = await getAll();
//   if  (findProduct(productArray, newCustomer.productId) !== -1)
//     throw new Error(
//       `Customer with Id:${newCustomer.productId} already exists`
//     );
//   productArray.push(newCustomer);
//   await save(productArray);
// }

// update existing customer
// export async function update(productId, customer) {
//   let productArray = await getAll();
//   let index = findProduct(productArray, productId); // findIndex
//   if (index === -1)
//     throw new Error(`Customer with ID:${productId} doesn't exist`);
//   else {
//     productArray[index] = customer;
//     await save(productArray);
//   }
// }

// delete existing customer
// export async function remove(productId) {
//   let productArray = await getAll();
//   let index = findProduct(productArray, productId); // findIndex
//   if (index === -1)
//     throw new Error(`Customer with ID:${productId} doesn't exist`);
//   else {
//     productArray.splice(index, 1); // remove customer from array
//     await save(productArray);
//   }
// }
