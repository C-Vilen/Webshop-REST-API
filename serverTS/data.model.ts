import * as fs from "fs";
const DATA_FILE = "./data.json";

// return all data from file
export async function getAll() {
  try {
    let dataTxt = await fs.readFileSync(DATA_FILE, "utf-8");
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
  return dataArray.products;
}

// save array of customers to file
async function save(products = []) {
  let productsTxt = JSON.stringify(products);
  fs.writeFileSync("./data.json", productsTxt)
  // fs.writeFile(DATA_FILE, productsTxt);
}


// // // test function for productId
function findProduct(productArray:any, Id:any) {
  return productArray.findIndex((currProduct:any) => currProduct.productId === Id);
}


// // get product by ID
export async function getProductByID(productId:number) {
  let productArray = await getAllProducts();
  let index = findProduct(productArray, productId);
  if (index===-1)
    throw new Error(`Customer with ID:${productId} doesn't exist`);
  else return productArray[index];
}

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

// test function for customer ID
function findCustomer(customerArray:Array<Customer>, Id:number) {
  return customerArray.findIndex(
    (currCustomer) => currCustomer.customerId === Id
  );
}

function getCustomerID(customerArray: Array<Customer>) {
  let newId:number = 1;
  customerArray.forEach(element => { 
    if (element.customerId >= newId) {
      newId = element.customerId + 1;
    }
  });
  return newId;
}

function getBasketID(basketArray: Array<Basket>) {
  let newId:number = 1;
  basketArray.forEach(element => { 
    if (element.basketId >= newId) {
      newId = element.basketId + 1;
    }
  });
  return newId;
}

async function saveCustomer(customer:Customer) {
  let existingData = fs.readFileSync(DATA_FILE, "utf-8");
  let existingCustomers = JSON.parse(existingData);
  existingCustomers.customers.push(customer);
  console.log(customer);
  let updatedData = JSON.stringify(existingCustomers);
  fs.writeFileSync(DATA_FILE, updatedData);
}
// create a new customer
export async function addCustomer(newCustomer:Customer) {
  let dataArray = await getAll();
  let customerArray: Array<Customer> = dataArray.customers;
  let basketArray: Array<Basket> = dataArray.basket;

  let newCustomerId: number = getCustomerID(customerArray);
  newCustomer.customerId = newCustomerId;
  let newBasketId: number = createBasket(basketArray);
  newCustomer.basketId = newBasketId;
  if (findCustomer(customerArray, newCustomer.customerId) !== -1 )
    throw new Error(
      `Customer with Id:${newCustomer.customerId} already exists`
    );
  await saveCustomer(newCustomer);
}

async function saveBasket(newBasketId:number) {
  let existingData = fs.readFileSync(DATA_FILE, "utf-8");
  let existingBaskets = JSON.parse(existingData);
  let newBasket: Basket = { basketId: newBasketId, totalPrice: 0, productIds:[]}
  console.log(newBasket)
  existingBaskets.basket.push(newBasket);
  let updatedData = JSON.stringify(existingBaskets);
  fs.writeFileSync(DATA_FILE, updatedData);
}

function createBasket(basketArray: Array<Basket>) {
  let newBasketId = getBasketID(basketArray);
  saveBasket(newBasketId);
  return newBasketId;
}

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
