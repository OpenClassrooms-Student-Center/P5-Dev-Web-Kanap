const cart = [];

treatmentDataLocalStorage();

cart.forEach((item) => treatmentDataCart(item));

// Fonction récupération des données des produits du localstorage

function treatmentDataLocalStorage() {
  const item = JSON.parse(localStorage.getItem("cart"));
  cart.push(item);
}

// Fonction traitement des données des produits du localstorage

function treatmentDataCart(item) {
  if (!item) {
    const titleCart = document.querySelector("h1");
    const sectionCart = document.querySelector(".cart");
    titleCart.innerHTML = "Votre panier est vide !";
    sectionCart.style.display = "none";
  } else {
    for (i = 0; i < item.length; i++) {
      const cartItem = treatmentCartItem(item);

      const cartDivImg = treatmentCartImg(item);
      cartItem.appendChild(cartDivImg);

      const cartItemContent = treatmentCartContentDescription(item);
      cartItem.appendChild(cartItemContent);

      const cartItemContentSettings = treatmentCartContentSettings(item);
      cartItem.appendChild(cartItemContentSettings);
      displayArticle(cartItem);
    }
  }
}

// Fonction insertion de l'id et de la couleur des produits

function treatmentCartItem(item) {
  const cartItem = document.createElement("article");
  cartItem.classList.add("cart__item");
  cartItem.dataset.id = item[i].id;
  cartItem.innerHTML = item[i].color;
  return cartItem;
}

// Fonction récupération de l'id cart__items pour insertion

function displayArticle(cartItem) {
  document.querySelector("#cart__items").appendChild(cartItem);
}

// Fonction insertion des images et des alttxt

function treatmentCartImg(item) {
  const cartDivImg = document.createElement("div");
  cartDivImg.className = "cart__item__img";

  const cartImg = document.createElement("img");
  cartDivImg.appendChild(cartImg);
  cartImg.src = item[i].img;
  cartImg.alt = item[i].alt;
  cartDivImg.appendChild(cartImg);
  return cartDivImg;
}

// Fonction création div

function treatmentCartContent(item) {
  const cartItemContent = document.createElement("div");
  cartItemContent.className = "cart__item__content";

  const cartItemContentDescription = treatmentCartContentDescription(item);
  const cartItemContentSettings = treatmentCartContentSettings(item);

  cartItemContent.appendChild(cartItemContentDescription);
  cartItemContent.appendChild(cartItemContentSettings);

  return cartItemContent;
}

// Fonction insertion des éléments

function treatmentCartContentDescription(item) {
  const cartItemContentDescription = document.createElement("div");
  cartItemContentDescription.className = "cart__item__content__description";

  // Insertion des noms

  const cartTitle = document.createElement("h2");
  cartItemContentDescription.appendChild(cartTitle);
  cartTitle.innerHTML = item[i].name;

  // Insertion des couleurs

  const cartColor = document.createElement("p");
  cartTitle.appendChild(cartColor);
  cartColor.innerHTML = item[i].color;
  cartColor.style.fontSize = "20px";

  // Insertion des prix

  const cartPrice = document.createElement("p");
  cartItemContentDescription.appendChild(cartPrice);
  cartPrice.innerHTML = item[i].price + " € ";
  return cartItemContentDescription;
}

// Fonction création div

function treatmentCartContentSettings(item) {
  const cartItemContentSettings = document.createElement("div");
  cartItemContentSettings.className = "cart__item__content__settings";
  quantityContentSettings(cartItemContentSettings, item);
  return cartItemContentSettings;
}

// Fonction insertion des quantités

function quantityContentSettings(cartItemContentSettings, item) {
  const cartContentSettingsQuantity = document.createElement("div");
  cartItemContentSettings.appendChild(cartContentSettingsQuantity);
  cartContentSettingsQuantity.className =
    "cart__item__content__settings__quantity";

  const cartQuantity = document.createElement("p");
  cartContentSettingsQuantity.appendChild(cartQuantity);
  cartQuantity.innerHTML = "Qté : " + item[i].quantity;

  // Insertion bouton quantité

  const input = document.createElement("input");
  cartContentSettingsQuantity.appendChild(input);
  input.type = "number";
  input.classList.add("itemQuantity");
  input.name = "itemQuantity";
  input.min = "1";
  input.max = "100";
  input.value = item[i].quantity;
}
