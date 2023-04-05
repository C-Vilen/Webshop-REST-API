import * as fs from "fs";
const BASKETS_FILE = "./data/baskets.json";

//Types for JSON objects
export interface BasketInterface{
basketId: number;
totalPrice: number;
productIds: Array<number>;
}

// return all data from file
export async function getBasketFile() {
  try {
    let dataTxt = await fs.readFileSync(BASKETS_FILE, "utf-8");
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
  fs.writeFileSync(BASKETS_FILE, dataTxt)
}


//generate a new ID for basket
function getBasketID(basketArray: Array<BasketInterface>) {
  let newId:number = 1;
  basketArray.forEach(element => { 
    if (element.basketId >= newId) {
      newId = element.basketId + 1;
    }
  });
  return newId;
}

//Saves a basket to data.JSON
async function saveBasket(newBasketId:number) {
  let existingData = fs.readFileSync(BASKETS_FILE, "utf-8");
  let existingBaskets = JSON.parse(existingData);
  let newBasket: BasketInterface = { basketId: newBasketId, totalPrice: 0, productIds:[]}
  existingBaskets.push(newBasket);
  let updatedData = JSON.stringify(existingBaskets);
  fs.writeFileSync(BASKETS_FILE, updatedData);
}

//creates a new basket with unique ID
export function createBasket(basketArray: Array<BasketInterface>) {
  let newBasketId = getBasketID(basketArray);
  saveBasket(newBasketId);
  return newBasketId;
}
