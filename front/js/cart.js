const cartContent = JSON.parse(localStorage.getItem("cart")) || [];
// transforme le panier JSON en objet

cartContent.forEach((cartItem) => {
  fetch("http://localhost:3000/api/products/" + cartItem.id) // Requête pour récupérer les json dans Product.js et les url pour chaque id de produit
    .then((res) => res.json())
    .then((product) => displayCartItems(cartItem, product));
});

const updateQuantityAndPrice = () => {
  let totalQuantity = 0;
  let totalArticlePrice = 0;
  let totalCartPrice = 0;
  const articles = document.querySelectorAll("article.cart__item");

  articles.forEach((article) => {
    const articleQuantity = article.querySelector(".itemQuantity").value;
    totalQuantity += parseInt(articleQuantity);
    const articlePrice = parseInt(article.querySelector(".cart__item__content__description p:nth-of-type(2)").textContent);
    totalArticlePrice = articlePrice * articleQuantity;
    totalCartPrice += totalArticlePrice;
  });
  document.querySelector("#totalPrice").textContent = totalCartPrice;
  document.querySelector("#totalQuantity").textContent = totalQuantity;
};

const displayCartItems = (cartItem, product) => {
  //affiche un article
  const cartItems = document.getElementById("cart__items");
  // pointe vers #cart__items où on veut mettre l'article
  const cartArticle = document.createElement("article"); // crée l'élément HTML article
  cartArticle.classList.add("cart__item"); // ajoute une classe à article
  cartArticle.dataset.id = cartItem.id; // ajoute un data-id à article
  cartArticle.dataset.color = cartItem.color; // ajoute un data-color à article
  cartItems.appendChild(cartArticle); // article est créé avec ses attributs comme enfant de "cart__items"

  const createImgWrapper = () => {
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
  };
  createImgWrapper();

  const cartItemContent = document.createElement("div");
  cartItemContent.classList.add("cart__item__content");
  cartArticle.appendChild(cartItemContent);
  //div content créée avec sa classe

  const cartItemDescription = document.createElement("div");
  cartItemDescription.classList.add("cart__item__content__description");
  cartItemContent.appendChild(cartItemDescription);
  //div description créée avec sa classe

  const createItemName = () => {
    const cartItemName = document.createElement("h2");
    cartItemName.textContent = product.name;
    cartItemDescription.appendChild(cartItemName);
    // h2 name créé
  };
  createItemName();

  const createItemColor = () => {
    const cartItemColor = document.createElement("p");
    cartItemColor.textContent = cartItem.color;
    cartItemDescription.appendChild(cartItemColor);
    // p color créé
  };
  createItemColor();

  const createItemPrice = () => {
    const cartItemPrice = document.createElement("p");
    const cartItemPriceValue = Number(product.price);
    cartItemPrice.textContent = cartItemPriceValue + "€";
    cartItemDescription.appendChild(cartItemPrice);
    //p price créé
  };
  createItemPrice();

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
      const itemToDelete = cartContent.findIndex((itemInCart) => cartItem.id === itemInCart.id && cartItem.color === itemInCart.color); // donne l'index de l'article cliqué
      cartContent.splice(itemToDelete); // supprime du cart l'article cliqué de façon permanente

      const articleToDelete = document.querySelector(`article[data-id="${cartItem.id}"][data-color="${cartItem.color}"]`); // pointe l'article correspondant à l'item
      articleToDelete.remove(); // supprime l'article du HTML

      updateQuantityAndPrice();
      storage();
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

  updateQuantityAndPrice();

  itemQuantityInput.addEventListener("change", updateQuantityAndPrice); // écoute le change de l'input et exécute l'update

  itemQuantityInput.addEventListener("change", () => {
    // écoute le change de l'input
    let newItemQuantity = document.querySelector(".itemQuantity").value; // pointe vers value de itemQuantity pour y mettre la nouvelle value

    const itemToUpdate = cartContent.findIndex((article) => article.id === cartItem.id && article.color === cartItem.color); // récupère l'index de l'article à updater

    if (itemToUpdate != -1) {
      // si l'article existe, alors :
      newItemQuantity = Number(itemQuantityInput.value); //remplace la quantié par la nouvelle valeur dans le panier
    }
    cartItem.quantity = newItemQuantity; // recalcule la somme des quantités en tenant compte des nouvelles valeurs dans le panier
  });
};

const storage = () => {
  document.addEventListener("click", () => {
    // écoute le click sur le document
    localStorage.setItem("cart", JSON.stringify(cartContent));
    updateQuantityAndPrice();
  }, [cartContent]); // remplace le contenu du localStorage par celui du cartContent afin de sauvegarder dans le cache le panier après avoir quitter la page
    updateQuantityAndPrice();
};
updateQuantityAndPrice();
storage();
  
const orderButton = document.querySelector("#order"); // pointe le bouton Commander
orderButton.addEventListener("click", (event) => {
  // écoute le click sur order et va contrôler :
  if (cartContent.length == 0) { //si le panier est vide
    event.preventDefault(); // ne pas envoyer form
    alert("Votre panier est vide. Veuillez sélectionner des articles, SVP");// message d'alerte si panier vide
    return; // pour arrêter
  };
});

const firstNameInput = document.querySelector("#firstName"); // pointe vers l'input prénom
const lastNameInput = document.querySelector("#lastName"); // pointe vers l'input nom
const addressInput = document.querySelector("#address"); // pointe vers l'input adresse
const cityInput = document.querySelector("#city"); // pointe vers l'input ville
const emailInput = document.querySelector("#email"); // pointe vers l'input e-mail

const nameRegex = /^[a-zA-Z\-\'\s]+$/; // limite le contenu à des lettres, tirets, espaces et apostrophes, et autorise plusieurs mots
const addressRegex = /^[a-zA-Z0-9\s\,\'\-]*$/;
const emailRegex = /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/;

firstNameInput.addEventListener("input", (event) => {
  event.preventDefault();
  let firstNameInputContent = firstNameInput.value; // valeur de l'input prénom (string)
  const firstNameError = document.querySelector("#firstNameErrorMsg"); // pointe le message d'erreur
  let nameRegexFNTest = nameRegex.test(firstNameInputContent); // teste la string dans input prénom et retourne true ou false
  if (nameRegexFNTest === false) {
    event.preventDefault();
    firstNameError.textContent = "Le prénom doit être composé de lettres (le tiret et l'apostrophe sont acceptés)"; // insère ce texte dans le message d'erreur
    firstNameInput.focus(); // remet le curseur dans l'input
    return false;
  } else {
    firstNameError.textContent = "";
  };
});
lastNameInput.addEventListener("input", (event) => {
  event.preventDefault();
  let lastNameInputContent = lastNameInput.value; // valeur de l'input nom (string)
  const lastNameError = document.querySelector("#lastNameErrorMsg"); // pointe le message d'erreur
  let nameRegexLNTest = nameRegex.test(lastNameInputContent); // teste la string dans input prénom et retourne true ou false
  if (nameRegexLNTest === false) {
    event.preventDefault();
    lastNameError.textContent = "Le nom doit être composé de lettres (le tiret et l'apostrophe sont acceptés)"; // insère ce texte dans le message d'erreur
    lastNameInput.focus();
    return false;
  } else {
    lastNameError.textContent = "";
  };
});
addressInput.addEventListener("input", (event) => {
  event.preventDefault();
  let addressInputContent = addressInput.value;
  const addressError = document.querySelector("#addressErrorMsg"); // pointe le message d'erreur
  let addressRegexTest = addressRegex.test(addressInputContent);
  if (addressRegexTest === false) {
    event.preventDefault();
    addressError.textContent = "Format d'adresse non conforme"; // insère ce texte dans le message d'erreur
    addressInput.focus();
    return false;
  } else {
    addressError.textContent = "";
  };
});

cityInput.addEventListener("input", (event) => {
  event.preventDefault();
  let cityInputContent= cityInput.value;
  const cityError = document.querySelector("#cityErrorMsg"); // pointe le message d'erreur
  let cityRegexTest = nameRegex.test (cityInputContent);
  if (cityRegexTest === false) {
    event.preventDefault();
    cityError.textContent = "Le nom de la ville doit être composé de lettres (le tiret et l'apostrophe sont acceptés)"; // insère ce texte dans le message d'erreur
    cityInput.focus();
    return false;
  } else {
    cityError.textContent = "";
  }
});

emailInput.addEventListener("input", (event) => {
  event.preventDefault();
  let emailInputContent = emailInput.value
  const emailError = document.querySelector("#emailErrorMsg"); // pointe le message d'erreur
  let emailRegexTest= emailRegex.test(emailInputContent);
  if (emailRegexTest === false) {
    event.preventDefault();
    emailError.textContent = "Format d'adresse mail non conforme"; // insère ce texte dans le message d'erreur
    emailInput.focus();
    return false;
  } else {
    emailError.textContent = "";
  }
});
// fetch("http://localhost:3000/api/products/order") // Requête pour poster les datas

//     .then((res) => res.json())
//     .then((product) => displayCartItems(cartItem, product)); 

  

