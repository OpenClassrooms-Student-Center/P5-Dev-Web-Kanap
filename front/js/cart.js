const cartContent = JSON.parse(localStorage.getItem("cart")) || [];
// transforme le panier JSON en objet

cartContent.forEach((cartItem) => {
  fetch("http://localhost:3000/api/products/" + cartItem.id) // Requête pour récupérer les json dans Product.js et les url pour chaque id de produit
    .then((res) => res.json())
    .then((product) => displayCartItems(cartItem, product));
});

const updateQuantityAndPrice = () => {
  // met à jour le pris et la quantité du panier
  let totalQuantity = 0;
  let totalArticlePrice = 0;
  let totalCartPrice = 0;
  const articles = document.querySelectorAll("article.cart__item"); // pointe vers toute classe cart__item contenue dans chaque article

  articles.forEach((article) => {
    //
    const articleQuantity = article.querySelector(".itemQuantity").value; // récupère la value de la classe itemQuantity
    totalQuantity += parseInt(articleQuantity); // parseInt convertit une string en number
    const articlePrice = parseInt(article.querySelector(".cart__item__content__description p:nth-of-type(2)").textContent); // récupère le contenu string du 2nd p (correspond à la quantité) et le transforme en number
    totalArticlePrice = articlePrice * articleQuantity; // total par article (non affiché)
    totalCartPrice += totalArticlePrice; // somme de tous les totaux par article (prix du panier)
  });
  document.querySelector("#totalPrice").textContent = totalCartPrice; // envoie le résultat de totalCartPrice dans le contenu de #totalPrice
  document.querySelector("#totalQuantity").textContent = totalQuantity; // idem que précédemment pour #totalQuantity
};

const displayCartItems = (cartItem, product) => {
  //affiche un article
  const cartItems = document.getElementById("cart__items");
  // pointe vers #cart__items où on veut mettre l'article
  const createArticle = () => {
    const cartArticle = document.createElement("article"); // crée l'élément HTML article
    cartArticle.classList.add("cart__item"); // ajoute une classe à article
    cartArticle.dataset.id = cartItem.id; // ajoute un data-id à article
    cartArticle.dataset.color = cartItem.color; // ajoute un data-color à article
    cartItems.appendChild(cartArticle); // article est créé avec ses attributs comme enfant de "cart__items"

    createImgWrapper(product, cartArticle);

    const createItemContent = () => {
      const cartItemContent = document.createElement("div");
      cartItemContent.classList.add("cart__item__content");
      //div content créée avec sa classe
      cartArticle.appendChild(cartItemContent);

      const createItemDescription = () => {
        const cartItemDescription = document.createElement("div");
        cartItemDescription.classList.add("cart__item__content__description");
        cartItemContent.appendChild(cartItemDescription);
        //div description créée avec sa classe

        const createItemName = (product) => {
          const cartItemName = document.createElement("h2");
          cartItemName.textContent = product.name;
          cartItemDescription.appendChild(cartItemName);
          // h2 name créé
        };
        createItemName(product);

        const createItemColor = (cartItem) => {
          const cartItemColor = document.createElement("p");
          cartItemColor.textContent = cartItem.color;
          cartItemDescription.appendChild(cartItemColor);
          // p color créé
        };
        createItemColor(cartItem);

        const createItemPrice = (product) => {
          const cartItemPrice = document.createElement("p");
          const cartItemPriceValue = Number(product.price);
          cartItemPrice.textContent = cartItemPriceValue + "€";
          cartItemDescription.appendChild(cartItemPrice);
          //p price créé
        };
        createItemPrice(product);
      };
      createItemDescription();

      const createItemSettings = () => {};
      const cartItemSettings = document.createElement("div");
      cartItemSettings.classList.add("cart__item__content__settings");
      cartItemContent.appendChild(cartItemSettings);
      //div settings créée avec sa classe

      const createSettingsQuantity = () => {};
      const cartItemSettingsQuantity = document.createElement("div");
      cartItemSettingsQuantity.classList.add("cart__item__content__settings__quantity");
      cartItemSettings.appendChild(cartItemSettingsQuantity);
      // div quantity créée avec sa classe

      const createItemQuantity = () => {};
      const cartItemQuantity = document.createElement("p");
      cartItemQuantity.textContent = "Qté : ";
      cartItemSettingsQuantity.appendChild(cartItemQuantity);
      // p quantity créé

      const createInputQuantity = () => {};
      const itemQuantityInput = document.createElement("input");
      itemQuantityInput.type = "number";
      itemQuantityInput.classList.add("itemQuantity");
      itemQuantityInput.name = "itemQuantity";
      itemQuantityInput.min = "1";
      itemQuantityInput.max = "100";
      itemQuantityInput.value = cartItem.quantity;
      cartItemSettingsQuantity.appendChild(itemQuantityInput);
      // input quantity créé avec ses attributs

      const createSettingsDelete = () => {};
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

      const createItemDelete = () => {
        const cartItemDelete = document.createElement("p");
        cartItemDelete.classList.add("deleteItem");
        cartItemDelete.textContent = "Supprimer";
        cartItemSettingsDelete.appendChild(cartItemDelete);
        // p delete créé avec son content
      };
      createItemDelete();

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
    createItemContent();
  };

  const createImgWrapper = (product, cartArticle) => {
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
  createArticle();
};

const storage = () => {
  document.addEventListener(
    "click",
    () => {
      // écoute le click sur le document
      localStorage.setItem("cart", JSON.stringify(cartContent));
      updateQuantityAndPrice();
    },
    [cartContent]
  ); // remplace le contenu du localStorage par celui du cartContent afin de sauvegarder dans le cache le panier après avoir quitter la page
  updateQuantityAndPrice();
};
updateQuantityAndPrice();
storage();

// --------------------------------------- Formulaire---------------------------------- //

const firstNameInput = document.querySelector("#firstName"); // pointe vers l'input prénom
const lastNameInput = document.querySelector("#lastName"); // pointe vers l'input nom
const addressInput = document.querySelector("#address"); // pointe vers l'input adresse
const cityInput = document.querySelector("#city"); // pointe vers l'input ville
const emailInput = document.querySelector("#email"); // pointe vers l'input e-mail
const orderButton = document.querySelector("#order"); // pointe le bouton Commander

orderButton.addEventListener("click", (event) => {
  // écoute le click sur order et va contrôler :
  event.preventDefault();

  const productsIdsFromCache = () => {
    let cacheProductsIds = [];
    const numberOfProducts = cartContent.length;
    for (let i = 0; i < numberOfProducts; i++) {
      const productKey = cartContent[i].id; // récupère l'id-color du produit
      const productId = productKey.split("-")[0]; // ne garde que l'id
      cacheProductsIds.push(productId); // ajoute l'id du produit dans le tableau cache
    }
    return cacheProductsIds;
  };

  let body = {
    // crée le body pour le fetch
    contact: {
      firstName: firstNameInput.value,
      lastName: lastNameInput.value,
      address: addressInput.value,
      city: cityInput.value,
      email: emailInput.value,
    },
    products: productsIdsFromCache(),
  };

  // if (isInputValid != true) {
  //   event.preventDefault();
  //   alert("Veuillez vérifier les champs saisis"); // message d'alerte si problème dans un input
  //   return; // pour arrêter
  // }

  if (cartContent.length == 0) {
    //si le panier est vide
    event.preventDefault(); // ne pas envoyer form
    alert("Votre panier est vide. Veuillez sélectionner des articles, SVP"); // message d'alerte si panier vide
    return; // pour arrêter
  }

  fetch("http://localhost:3000/api/products/order", {
    // Requête pour poster le contact
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((products) => {
      const orderId = products.orderId;
      console.log("/front/html/confirmation.html" + "?orderId=" + orderId);
      // window.location.href = "/front/html/confirmation.html" + "?orderId=" + orderId;
    });
});
const nameRegex = /^[a-zA-Z\-\'\s]+$/; // limite le contenu à des lettres, tirets, espaces et apostrophes, et autorise plusieurs mots
let firstNameInputContent = firstNameInput.value; // valeur de l'input prénom (string)
let nameRegexFNTest = nameRegex.test(firstNameInputContent); // teste la string dans input prénom et retourne true ou false
firstNameInput.addEventListener("input", (event) => {
  if (nameRegexFNTest === false || (firstNameInputContent = "")) {
    // si la Regex est fausse ou l'input vide
    event.preventDefault();
    const firstNameError = document.querySelector("#firstNameErrorMsg"); // pointe le message d'erreur
    firstNameError.textContent = "Le prénom doit être composé de lettres (le tiret et l'apostrophe sont acceptés)"; // insère ce texte dans le message d'erreur
    firstNameInput.focus(); // remet le curseur dans l'input
    return false; // renvoie False vers isRegexTrue
  } else {
    // sinon
    firstNameError.textContent = ""; // message vide
    return true;
  }
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
    return true;
  }
});

addressInput.addEventListener("input", (event) => {
  event.preventDefault();
  const addressRegex = /^[a-zA-Z0-9\s\,\'\-]*$/;
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
    return true;
  }
});

cityInput.addEventListener("input", (event) => {
  event.preventDefault();
  let cityInputContent = cityInput.value;
  const cityError = document.querySelector("#cityErrorMsg"); // pointe le message d'erreur
  let cityRegexTest = nameRegex.test(cityInputContent);
  if (cityRegexTest === false) {
    event.preventDefault();
    cityError.textContent = "Le nom de la ville doit être composé de lettres (le tiret et l'apostrophe sont acceptés)"; // insère ce texte dans le message d'erreur
    cityInput.focus();
    return false;
  } else {
    cityError.textContent = "";
    return true;
  }
});

emailInput.addEventListener("input", (event) => {
  event.preventDefault();
  const emailRegex = /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+\.[A-Za-z][A-Za-z]{1,}$/;
  let emailInputContent = emailInput.value;
  const emailError = document.querySelector("#emailErrorMsg"); // pointe le message d'erreur
  let emailRegexTest = emailRegex.test(emailInputContent);
  if (emailRegexTest === false) {
    event.preventDefault();
    emailError.textContent = "Format d'adresse mail non conforme"; // insère ce texte dans le message d'erreur
    emailInput.focus();
    return false;
  } else {
    emailError.textContent = "";
    return true;
  }
});

