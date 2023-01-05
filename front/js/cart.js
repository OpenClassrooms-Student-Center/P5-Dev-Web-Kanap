const cartContent = JSON.parse(localStorage.getItem("cart")) || [];
// transforme le panier JSON en objet

let totalItemPrice = 0; // prix total par article
let sumOfQuantities = 0; // quantité totale d'articles
let totalCartPrice = 0; // somme des prix totaux de tous les articles
let newTotal = 0; // nouveau prix total du panier

cartContent.forEach(cartItem => {
  // const cartItemId = new URL(location.href).searchParams.get("id"); // récupère l'id des produits disponibles
fetch("http://localhost:3000/api/products/" + cartItem.id) // Requête pour récupérer les json dans Product.js et les url pour chaque id de produit
.then((res) => res.json())
.then((product) => displayCartItems(cartItem, product));
});

const displayCartItems = (cartItem, product) => {
  //affiche un article

  const cartItems = document.getElementById("cart__items");
  // pointe vers #cart__items

  // crée un article et son contenu dans le HTML
  const cartArticle = document.createElement("article"); // crée l'élément HTML article
  cartArticle.classList.add("cart__item"); // ajoute une classe à article
  cartArticle.dataset.id = cartItem.id; // ajoute un data-id à article
  cartArticle.dataset.color = cartItem.color; // ajoute un data-color à article
  cartItems.appendChild(cartArticle); // article est créé avec ses attributs comme enfant de "cart__items"

  // crée la div image de l'article et son contenu dans l'HTML
  const cartItemImg = document.createElement("div");
  cartItemImg.classList.add("cart__item__img");
  cartArticle.appendChild(cartItemImg);
  // div img créée avec sa classe, enfant de "article"

  const itemImg = document.createElement("img");
  itemImg.setAttribute("src", product.imageUrl);
  itemImg.setAttribute("alt", product.altTxt);
  cartItemImg.appendChild(itemImg);
  // élément img créé avec ses attributs, enfant de "cart__item__img"

  // crée le contenu de l'item du panier
  const cartItemContent = document.createElement("div");
  cartItemContent.classList.add("cart__item__content");
  cartArticle.appendChild(cartItemContent);
  //div content créée avec sa classe

  const cartItemDescription = document.createElement("div");
  cartItemDescription.classList.add("cart__item__content__description");
  cartItemContent.appendChild(cartItemDescription);
  //div description créée avec sa classe

  const cartItemName = document.createElement("h2");
  cartItemName.textContent = product.name;
  cartItemDescription.appendChild(cartItemName);
  // h2 name créé

  const cartItemColor = document.createElement("p");
  cartItemColor.textContent = cartItem.color;
  cartItemDescription.appendChild(cartItemColor);
  // p color créé

  const cartItemPrice = document.createElement("p");
  const cartItemPriceValue = Number(product.price);
  cartItemPrice.textContent = cartItemPriceValue + "€";
  cartItemDescription.appendChild(cartItemPrice);
  //p price créé

  const cartItemSettings = document.createElement("div");
  cartItemSettings.classList.add("cart__item__content__settings");
  cartItemContent.appendChild(cartItemSettings);
  //div settings créée avec sa classe

  const cartItemSettingsQuantity = document.createElement("div");
  cartItemSettingsQuantity.classList.add("cart__item__content__settings__quantity");
  cartItemSettings.appendChild(cartItemSettingsQuantity);
  // div quantity créée avec sa classe

  const cartItemSettingsDelete = document.createElement("div");
  cartItemSettingsDelete.classList.add("cart__item__content__settings__delete");
  cartItemSettings.appendChild(cartItemSettingsDelete);

  cartItemSettingsDelete.addEventListener(
    "click",
    (deleteItem = (event) => {
      const itemToDelete = cartContent.find((itemInCart) => cartItem.id === itemInCart.id && cartItem.color === itemInCart.color);
      cartContent.splice(itemToDelete);
      console.log(itemToDelete); // renvoie l'item cliqué

      // const inputDelete = event.target;
      // const articleToDelete = inputDelete.closest(".cart__item")

      //supprimer l'article contenant le dataset id et color identique à ceux correspondant de itemToDelete
    })
  );

  const cartItemDelete = document.createElement("p");
  cartItemDelete.classList.add("deleteItem");
  cartItemDelete.textContent = "Supprimer";
  cartItemSettingsDelete.appendChild(cartItemDelete);
  // p delete créé avec son content

  const cartItemQuantity = document.createElement("p");
  cartItemQuantity.textContent = "Qté : ";
  cartItemSettingsQuantity.appendChild(cartItemQuantity);
  // p quantity créé

  const itemQuantityInput = document.createElement("input");
  itemQuantityInput.type = "number";
  itemQuantityInput.classList.add("itemQuantity");
  itemQuantityInput.name = "itemQuantity";
  itemQuantityInput.min = "1";
  itemQuantityInput.max = "100";
  itemQuantityInput.value = cartItem.quantity;
  cartItemSettingsQuantity.appendChild(itemQuantityInput);
  // input quantity créé avec ses attributs
  

  itemQuantityInput.addEventListener("change", () => handleChange(cartItem.id, cartItem.color, cartItem.quantity));
  const handleChange = (id, color, quantity) => {
    const itemInCart = cartContent.find((cartItem) => cartItem.id === id && cartItem.color === color);

    const input = document.getElementsByClassName("itemQuantity");
    const newQuantity = input.quantity;
    console.log(newQuantity);
  }

  //   const newCartTotal = document.getElementById("totalPrice");
  //   newCartTotal.textContent = newTotal;

  //   newTotal += Number(newValue) * cartItem.price;
  //   console.log(newTotal);
  // }
  //   // newItemTotalPrice =
  //   totalCartPrice += totalItemPrice++;
  //   //   let newTotal = 0;
  //   //   newTotal += newItemTotalPrice;
  
  let itemQuantityInputValue = Number(cartItem.quantity);
  sumOfQuantities += itemQuantityInputValue;
  totalItemPrice = cartItemPriceValue * itemQuantityInputValue;
  totalCartPrice += totalItemPrice++;
};
// cartContent.forEach(displayCartItems);




// addition des input quantity pour obtenir nombre total d'articles dans le panier

// const newItemQuantityInput =
//   document.getElementsByClassName("itemQuantity").value; // pointe vers la valeur qu'on veut updater
// const newQuantityInput = itemQuantityInputValue;
// const cartItemColorText = cartItemColor.innerHTML;

// console.log(cartItemId);
// console.log(cartItemColorText);
// console.log(itemQuantityInput.value);

// itemQuantityInput.addEventListener("change", () => {
//   // écoute le change de l'input

//   const handleChange = (change) => {
//     // const article = input.closest(".cart__item")

//     // const itemInCart = cartContent.findIndex(
//     //   (article) =>
//     //   article.dataset.id === cartItemId && article.dataset.color === cartItem.color
// const createTotalQuantity = () => {};
// const totalQuantity = document.getElementById("totalQuantity");
// // pointe vers #totalQuantity
// totalQuantity.textContent = sumOfQuantities;
// // insère le résultat de sumOfQuantities dans #totalQuantity
// createTotalQuantity();

// const createTotalPrice = () => {};
// const totalPrice = document.getElementById("totalPrice");
// // pointe vers #totalPrice
// totalPrice.textContent = totalCartPrice;
// // insère le résultat de totalCartPrice dans #totalPrice
// createTotalPrice();


const totalQuantity = document.getElementById("totalQuantity");
// pointe vers #totalQuantity
totalQuantity.textContent = sumOfQuantities;
// insère le résultat de sumOfQuantities dans #totalQuantity

const totalPrice = document.getElementById("totalPrice");
// pointe vers #totalPrice
totalPrice.textContent = totalCartPrice;
// insère le résultat de totalCartPrice dans #totalPrice

// exécute displayCartItem pour chaque article du panier
