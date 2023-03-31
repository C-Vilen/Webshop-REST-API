import * as fs from "fs";
const DATA_FILE = "./data.json";

//Types for JSON objects
interface Customer{
  customerId: number;
  customerName: String;
  basketId : number;
  password: String;
}
interface Basket{
basketId: number;
totalPrice: number;
productIds: Array<number>;
}
interface Product{
  productId: number;
  productName: String;
  productDescription: String;
  productPrice: number;
  imgSrc: String;
}
interface Category{
  categoryId: number;
  categoryName: String;
  productIds: Array<Product>;
}

// return all data from file
export async function getAll() {
  try {
    let dataTxt = await fs.readFileSync(DATA_FILE, "utf-8");
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
  fs.writeFileSync(DATA_FILE, dataTxt)
}

// return all products without productDescription from file
export async function getAllProducts() {
  let dataArray = await getAll();
  let productArray = dataArray.products;
  let outputDataArray: Array<Product> = productArray.map((element:Product) => {
    const { productDescription, ...rest } = element; // using object destructuring to remove `productDescription`
    return rest;
  });
  return outputDataArray;
}

//return all products
async function getAllProductsWithDetails() {
  let dataArray = await getAll();
  return dataArray.products;
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
    throw new Error(`Customer with ID:${productId} doesn't exist`);
  else return productArray[index];
}

// Checks if customer with specific ID exists
function findCustomer(customerArray:Array<Customer>, Id:number) {
  return customerArray.findIndex(
    (currCustomer) => currCustomer.customerId === Id
  );
}

//generate a new ID for customer
function getCustomerID(customerArray: Array<Customer>) {
  let newId:number = 1;
  customerArray.forEach(element => { 
    if (element.customerId >= newId) {
      newId = element.customerId + 1;
    }
  });
  return newId;
}

//generate a new ID for basket
function getBasketID(basketArray: Array<Basket>) {
  let newId:number = 1;
  basketArray.forEach(element => { 
    if (element.basketId >= newId) {
      newId = element.basketId + 1;
    }
  });
  return newId;
}

//Saves a customer to data.JSON
async function saveCustomer(customer:Customer) {
  let existingData = fs.readFileSync(DATA_FILE, "utf-8");
  let existingCustomers = JSON.parse(existingData);
  existingCustomers.customers.push(customer);
  console.log(customer);
  let updatedData = JSON.stringify(existingCustomers);
  fs.writeFileSync(DATA_FILE, updatedData);
}

// create a new customer with unique customerID and basketID
export async function createCustomer(newCustomer:Customer) {
  let dataArray = await getAll();
  //generates new customerID
  let customerArray: Array<Customer> = dataArray.customers;
  let newCustomerId: number = getCustomerID(customerArray);
  newCustomer.customerId = newCustomerId;
  //generates new basketID
  let basketArray: Array<Basket> = dataArray.baskets;
  let newBasketId: number = createBasket(basketArray);
  newCustomer.basketId = newBasketId;
  //check if customer already exists
  if (findCustomer(customerArray, newCustomer.customerId) !== -1 )
    throw new Error(
      `Customer with Id:${newCustomer.customerId} already exists`
    );
  await saveCustomer(newCustomer);
}

//Saves a basket to data.JSON
async function saveBasket(newBasketId:number) {
  let existingData = fs.readFileSync(DATA_FILE, "utf-8");
  let existingBaskets = JSON.parse(existingData);
  let newBasket: Basket = { basketId: newBasketId, totalPrice: 0, productIds:[]}
  console.log(newBasket)
  existingBaskets.baskets.push(newBasket);
  let updatedData = JSON.stringify(existingBaskets);
  fs.writeFileSync(DATA_FILE, updatedData);
}

//creates a new basket with unique ID
function createBasket(basketArray: Array<Basket>) {
  let newBasketId = getBasketID(basketArray);
  saveBasket(newBasketId);
  return newBasketId;
}

//return all categories
export async function getAllCategories() {
  let dataArray = await getAll();
  return dataArray.categories;
}