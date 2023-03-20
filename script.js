function addUserName() {
  const userName = window.localStorage.getItem("name");
  if (userName !== null) {
    document.getElementById("welcome-text").innerHTML =
      "Goddag " + userName + "!";
    let x = document.getElementById("login-btn");
    x.style.display = "none";
    let y = document.getElementById("logout-btn");
    y.style.display = "block";
  } else {
    document.getElementById("welcome-text").innerHTML = "";
    let x = document.getElementById("logout-btn");
    x.style.display = "none";
  }
}

function logout() {
  localStorage.clear();
  let x = document.getElementById("login-btn");
  x.style.display = "block";
  let y = document.getElementById("logout-btn");
  y.style.display = "none";
  window.location.reload();
}

//Saves title, price, img src and number of products in the basket to local storage
function saveProduct() {
  //retreiving the img src from the URL params
  const urlParams = new URLSearchParams(window.location.search);
  const productImgSrc = urlParams.get("productImgSrc");

  // get the number button element
  const numberBtn = document.getElementById("basketNumber");
  // retrieve the product count from local storage, or initialize it to 0 if it's not present
  let productCount = localStorage.getItem("productCount");

  // add a click event listener to the AddProduct button
  document.getElementById("AddProduct").addEventListener("click", function () {
    // increment the value of the number button
    productCount++;
    numberBtn.innerText = productCount;

    // retrieve the title and price of the product
    const title = document.getElementById("product-title").innerText;
    const price = document.getElementById("product-price").innerText;
    const img = productImgSrc;

    // retrieve the existing cart data from local storage, or initialize it to an empty array if it's not present
    let cartData = JSON.parse(localStorage.getItem("cartData")) || [];

    // add the current product to the cart data array
    cartData.push({ title: title, price: price, img: img, id: productCount });

    // store the updated product count and cart data in local storage
    localStorage.setItem("productCount", productCount);
    localStorage.setItem("cartData", JSON.stringify(cartData));
  });
}

//updating the cart page to show the items saved in the basket(local storage)
function updateCart() {
  let productItems = JSON.parse(localStorage.cartData);
  let newdiv;
  productItems.forEach((item) => {
    newdiv = document.createElement("div");
    newdiv.setAttribute("id", item.id);
    newdiv.innerHTML = `<li class="product-item d-flex justify-content-between lh-condensed"> <div class="purchase-item"><div><img src="${item.img}" width="120px"></div><div><p class="product-name">${item.title}</p><p class="text-muted">ID: 127</p><button class="WhiteButton" onclick="removeItem(${item.id})">Remove</button></div></div><span>1</span><span>
      ${item.price}</span></li>`;
    document.getElementById("product-update-script").appendChild(newdiv);
  });
  getTotalAmount();
}

//calculating the total price of the items
function getTotalAmount() {
  let productItems = JSON.parse(localStorage.cartData);
  let totalAmount = 0;
  productItems.forEach((item) => (totalAmount += parseInt(item.price)));
  document.getElementById("totalAmount").innerText = totalAmount;
}

//Removes the item from the basket and updates number of products and the total price
function removeItem(divIdName) {
  let productItems = JSON.parse(localStorage.cartData);

  filteredProductItems = productItems.filter((item) => item.id !== divIdName); // removes the item from the array

  localStorage.setItem("cartData", JSON.stringify(filteredProductItems)); // update local storage with the new array
  localStorage.setItem("productCount", filteredProductItems.length);
  document.getElementById(divIdName).remove(); // remove the corresponding HTML element from the page
  getTotalAmount(); // update the total amount displayed on the page
  getProductCount(); // update the productCount number displayed
}

function getProductCount() {
  // get the number button element
  const numberBtn = document.getElementById("basketNumber");
  // retrieve the product count from local storage, or initialize it to 0 if it's not present
  let productCount = localStorage.getItem("productCount") || 0;
  // set the initial value of the number button
  numberBtn.innerText = productCount;
}

function sendParams() {
  // Get all product cards
  const productCards = document.querySelectorAll(".card");

  // Loop through each card and modify the href attribute
  productCards.forEach((card) => {
    const productName = card.querySelector("#productName").textContent;
    const productPrice = card.querySelector("#productPrice").textContent;
    const productImgSrc = card
      .querySelector(".product-img")
      .getAttribute("src");
    const urlParams = new URLSearchParams(
      `productName=${encodeURIComponent(
        productName
      )}&productPrice=${encodeURIComponent(
        productPrice
      )}&productImgSrc=${encodeURIComponent(productImgSrc)}`
    );
    const href = card.querySelector("a").getAttribute("href");
    card
      .querySelector("a")
      .setAttribute("href", `${href}?${urlParams.toString()}`);
  });
}
function sendParamsIndex() {
  // Get all product cards
  const carouselItems = document.querySelectorAll(".carousel-item");
  // Get the values of the image source, product name, and product price

  carouselItems.forEach((item) => {
    const productName = item.querySelector("#productName").textContent;
    const productPrice = item.querySelector("#productPrice").textContent;
    const productImgSrc = item
      .querySelector(".product-img")
      .getAttribute("src");
    const urlParams = new URLSearchParams(
      `productName=${encodeURIComponent(
        productName
      )}&productPrice=${encodeURIComponent(
        productPrice
      )}&productImgSrc=${encodeURIComponent(productImgSrc)}`
    );
    const href = item.querySelector("a").getAttribute("href");
    item
      .querySelector("a")
      .setAttribute("href", `${href}?${urlParams.toString()}`);
  });
}

function getProductInfo() {
  // Get the URL parameters
  const urlParams = new URLSearchParams(window.location.search);

  // Retrieve the productName and productPrice values
  const productName = urlParams.get("productName");
  const productPrice = urlParams.get("productPrice");
  const productImgSrc = urlParams.get("productImgSrc");

  // Setting the product values for the current item.
  document.getElementById("title-name").innerText = productName;
  document.getElementById("breadcrumb-update").innerText = productName;
  document.getElementById("product-title").innerText = productName;
  document.getElementById("product-price").innerText = productPrice;
  document.querySelector(".product-img").setAttribute("src", productImgSrc);
}

// $('.carousel .carousel-item').each(function () {
//   var minPerSlide = 1;
//   var next = $(this).next();
//   if (!next.length) {
//   next = $(this).siblings(':first');
//   }
//   next.children(':first-child').clone().appendTo($(this));

//   for (var i = 0; i < minPerSlide; i++) {
//     next=next.next();
//     if (!next.length) {
//       next=$(this).siblings(':first');
//     }
//     next.children(':first-child').clone().appendTo($(this));
//   }
// });
