const cartContent = JSON.parse(localStorage.getItem("cart")) || [];
// transforme le panier JSON en objet

const updateQuantityAndPrice = () => {
  let totalQuantity = 0;
  let totalArticlePrice = 0;
  let totalCartPrice = 0;
  const articles = document.querySelectorAll("article.cart__item");

  articles.forEach((article, cartItem) => {
    const articleQuantity = article.querySelector(".itemQuantity").value;
    totalQuantity += parseInt(articleQuantity);

    const articlePrice = parseInt(article.querySelector(".cart__item__content__description p:nth-of-type(2)").textContent);
    totalArticlePrice = articlePrice * articleQuantity;

    totalCartPrice += totalArticlePrice;
  });
  document.querySelector("#totalPrice").textContent = totalCartPrice;
  document.querySelector("#totalQuantity").textContent = totalQuantity;

  };
cartContent.forEach((cartItem) => {
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
    (deleteItem = () => {
      const itemToDelete = cartContent.find((itemInCart) => cartItem.id === itemInCart.id && cartItem.color === itemInCart.color);
      cartContent.splice(itemToDelete);

      localStorage.removeItem("cart");
      const inputDelete = event.target;
      const articleToDelete = inputDelete.closest(".cart__item");
      console.log(articleToDelete); // renvoie l'item cliqué

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

  itemQuantityInput.addEventListener("change", updateQuantityAndPrice);

  updateQuantityAndPrice();
  itemQuantityInput.addEventListener("change", () => {
    let newItemQuantity = document.querySelector(".itemQuantity").value;

    const itemToUpdate = cartContent.findIndex((article) => article.id === cartItem.id && article.color === cartItem.color); // récupère l'index de l'article à updater

    if (itemToUpdate != -1) {
      newItemQuantity = itemQuantityInput.value;
    }
    cartItem.quantity = newItemQuantity;
    console.log(cartItem.quantity, newItemQuantity);
    
  });

};
  document.addEventListener("change", () => {
  // const cartItemToSave = JSON.stringify(cartItem);
  localStorage.setItem("cart", JSON.stringify(cartContent));
  console.log(cartContent);
}, [cartContent]);
  

