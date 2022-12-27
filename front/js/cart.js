const cartArray = Object.entries(localStorage);
const cartContent = JSON.parse(localStorage.getItem("cart")) || [];

const cartItems = document.getElementById("cart__items");

let totalItemPrice = 0;
let sumOfQuantities = 0; // quantité totale d'articles
let totalCartPrice = 0; // somme des totaux de tous les

const displayCartItems = cartItem => {
  const cartArticle = document.createElement("article");
  cartArticle.classList.add("cart__item");
  cartArticle.dataset.id = cartItem.id;
  cartArticle.dataset.color = cartItem.color;
  cartItems.appendChild(cartArticle);

  const cartItemImg = document.createElement("div");
  cartItemImg.classList.add("cart__item__img");
  cartArticle.appendChild(cartItemImg);

  const itemImg = document.createElement("img");
  itemImg.setAttribute("src", cartItem.imageUrl);
  itemImg.setAttribute("alt", cartItem.altTxt);
  cartItemImg.appendChild(itemImg);

  const cartItemContent = document.createElement("div");
  cartItemContent.classList.add("cart__item__content");
  cartArticle.appendChild(cartItemContent);

  const cartItemDescription = document.createElement("div");
  cartItemDescription.classList.add("cart__item__content__description");
  cartItemContent.appendChild(cartItemDescription);

  const cartItemName = document.createElement("h2");
  cartItemName.textContent = cartItem.name;
  cartItemDescription.appendChild(cartItemName);

  const cartItemColor = document.createElement("p");
  cartItemColor.textContent = cartItem.color;
  cartItemDescription.appendChild(cartItemColor);

  const cartItemPrice = document.createElement("p");
  const cartItemPriceValue = Number(cartItem.price);
  cartItemPrice.textContent = cartItemPriceValue + "€";
  cartItemDescription.appendChild(cartItemPrice);

  const cartItemSettings = document.createElement("div");
  cartItemSettings.classList.add("cart__item__content__settings");
  cartItemContent.appendChild(cartItemSettings);

  const cartItemSettingsQuantity = document.createElement("div");
  cartItemSettingsQuantity.classList.add(
    "cart__item__content__settings__quantity"
  );
  cartItemSettings.appendChild(cartItemSettingsQuantity);

  const cartItemQuantity = document.createElement("p");
  cartItemQuantity.textContent = "Qté : ";
  cartItemSettingsQuantity.appendChild(cartItemQuantity);

  const itemQuantityInput = document.createElement("input");
  itemQuantityInput.type = "number";
  itemQuantityInput.classList.add("itemQuantity");
  itemQuantityInput.name = "itemQuantity";
  itemQuantityInput.min = "1";
  itemQuantityInput.max = "100";
  itemQuantityInput.value = cartItem.quantity;
  const itemQuantityInputValue = Number(cartItem.quantity);
  cartItemSettingsQuantity.appendChild(itemQuantityInput);

  const cartItemSettingsDelete = document.createElement("div");
  cartItemSettingsDelete.classList.add("cart__item__content__settings__delete");
  cartItemSettings.appendChild(cartItemSettingsDelete);

  const cartItemDelete = document.createElement("p");
  cartItemDelete.classList.add("deleteItem");
  cartItemDelete.textContent = "Supprimer";
  cartItemSettingsDelete.appendChild(cartItemDelete);

  sumOfQuantities += itemQuantityInputValue;
  totalItemPrice = cartItemPriceValue * itemQuantityInputValue; // prix x qnté pour chaque article
  // console.log(totalCartPrice);
  totalCartPrice += totalItemPrice++;
}
cartContent.forEach(displayCartItems);

const totalQuantity = document.getElementById("totalQuantity");
totalQuantity.textContent = sumOfQuantities;

const totalPrice = document.getElementById("totalPrice");
totalPrice.textContent = totalCartPrice;


