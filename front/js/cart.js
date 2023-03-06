//Recupere la panier du LS en array
function getCart() {
  let cartLS = localStorage.getItem("kanapLocalStorage");
  let cart = [];
  if (cartLS != null) {
    cart = JSON.parse(cartLS);
  }
  return cart;
}

//Creer un nouvel array avec toutes les informations pour le DOM
async function fetchProducts() {
  let cartDomArray = [];
  let cartLS = getCart();
  if (cartLS !== null) {
    for (let i = 0; i < cartLS.length; i++) {
      await fetch(
        "http://localhost:3000/api/products/" + cartLS[i].idSelectProduct
      )
        .then((response) => response.json())
        .then((product) => {
          const article = {
            _id: product._id,
            name: product.name,
            price: product.price,
            color: cartLS[i].colorSelectProduct,
            quantity: cartLS[i].quantity,
            alt: product.altTxt,
            img: product.imageUrl,
          };
          cartDomArray.push(article);
        })
        .catch(function (err) {
          console.log(err);
        });
    }
  }
  return cartDomArray;
}

//Change la valeur du panier dans le LS depuis un array
function saveCartLS(cart) {
  localStorage.setItem("kanapLocalStorage", JSON.stringify(cart));
}

//Affiche un message de panier vide et masque le formulaire
function msgEmptyCart() {
  const cartTitle = document.querySelector(
    "#limitedWidthBlock div.cartAndFormContainer > h1"
  );
  cartTitle.textContent = "Votre panier est vide !";
  cartTitle.style.fontSize = "40px";

  document.querySelector(".cart__order").style.display = "none";
  document.querySelector(".cart__price").style.display = "none";
}

//Affiche les elements du panier dans le DOM
async function showCart() {
  const cartDom = await fetchProducts();
  const cartLS = getCart();
  if (cartLS == null || cartLS.length == 0) {
    return msgEmptyCart();
  } else {
    const zonePanier = document.querySelector("#cart__items");
    cartDom.forEach((product) => {
      zonePanier.innerHTML += `<article class="cart__item" data-id="${product._id}" data-color="${product.color}">
              <div class="cart__item__img">
                <img src= "${product.img}" alt="Photographie d'un producté">
              </div>
              <div class="cart__item__content">
                <div class="cart__item__content__description">
                  <h2>${product.name}</h2>
                  <p>${product.color}</p>
                  <p>${product.price} €</p>
                </div>
                <div class="cart__item__content__settings">
                  <div class="cart__item__content__settings__quantity">
                    <p>Qté : </p>
                    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.quantity}">
                  </div>
                  <div class="cart__item__content__settings__delete">
                    <p class="deleteItem">Supprimer</p>
                  </div>
                </div>
              </div>
            </article>`;
    });
  }
  basketQuantity();
  basketPrice(cartDom);
}

//On supprime un article du LS quand l'utilisateur appui sur un bouton
function removeArticle() {
  const btnSupprimerListe = document.querySelectorAll(".deleteItem");
  btnSupprimerListe.forEach((article) => {
    article.addEventListener("click", async function (event) {
      let cart = getCart();
      const idSupprimer = event.target
        .closest("article")
        .getAttribute("data-id");
      const colorSupprimer = event.target
        .closest("article")
        .getAttribute("data-color");
      const articleSupprimer = cart.find(
        (element) =>
          element.idSelectProduct == idSupprimer &&
          element.colorSelectProduct == colorSupprimer
      );
      cart = cart.filter((item) => item != articleSupprimer);
      saveCartLS(cart);
      console.log(cart);
      alert("article supprimé !");
      const getSection = document.querySelector("#cart__items");
      getSection.removeChild(event.target.closest("article"));
      basketQuantity();
      const cartDom = await fetchProducts();
      basketPrice(cartDom);
      if (cart == null || cart.length == 0) {
        return msgEmptyCart();
      }
    });
  });
}

//On met a jour la quantité dans le cartLS que l'utilisateur veut pour un produit
function changeQuantityArticle() {
  const inputQuantityListe = document.querySelectorAll(".itemQuantity");
  inputQuantityListe.forEach((article) => {
    console.log(article);
    article.addEventListener("change", async function (event) {
      let cart = getCart();
      const idChangeQuantity = event.target
        .closest("article")
        .getAttribute("data-id");
      const colorChangeQuantity = event.target
        .closest("article")
        .getAttribute("data-color");
      cart.find(
        (element) =>
          element.idSelectProduct == idChangeQuantity &&
          element.colorSelectProduct == colorChangeQuantity
      ).quantity = article.value;
      saveCartLS(cart);
      basketQuantity();
      const cartDom = await fetchProducts();
      basketPrice(cartDom);
    });
  });
}

//On calcule la quantité totale de produits dans la commande
function basketQuantity() {
  let cart = getCart();
  const basketQuantityDom = document.querySelector("#totalQuantity");
  let cartQuantity = 0;
  for (let i = 0; i < cart.length; i++) {
    cartQuantity += Number(cart[i].quantity);
  }
  basketQuantityDom.textContent = cartQuantity;
}

//On calcule le prix total avec un array contenant le prix et la quantité de chaque produit
function basketPrice(cartLsApi) {
  const basketPriceDom = document.querySelector("#totalPrice");
  let cartPrice = 0;
  for (let i = 0; i < cartLsApi.length; i++) {
    cartPrice += +cartLsApi[i].price * +cartLsApi[i].quantity;
  }
  basketPriceDom.textContent = cartPrice;
}

//Formulaire
const firstNameErrorMsg = document.querySelector("#firstNameErrorMsg");
const lastNameErrorMsg = document.querySelector("#lastNameErrorMsg");
const addressErrorMsg = document.querySelector("#addressErrorMsg");
const cityErrorMsg = document.querySelector("#cityErrorMsg");
const emailErrorMsg = document.querySelector("#emailErrorMsg");

const inputFirstName = document.getElementById("firstName");
const inputLastName = document.getElementById("lastName");
const inputAddress = document.getElementById("address");
const inputCity = document.getElementById("city");
const inputEmail = document.getElementById("email");

// déclaration des regex de contrôle des inputs du formulaire //
const nameREGEX = /^[a-zA-Z ]+$/;
const regexFirstName = nameREGEX;
const regexLastName = nameREGEX;
const regexAddress = /^[#.0-9a-zA-ZÀ-ÿ\s,-]{2,60}$/;
const regexCity = nameREGEX;
const regexEmail =
  /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;

//On affiche un message d'erreur sur le premier element du formulaire invalide
//TODO factoriser
function formRegexValidation() {
  let regexValidation = 0;
  if (
    regexFirstName.test(inputFirstName.value) == false ||
    inputFirstName.value === null
  ) {
    firstNameErrorMsg.innerHTML = "Merci de renseigner un prénom valide";
    regexValidation++;
  } else {
    firstNameErrorMsg.innerHTML = "";
  }
  if (
    regexLastName.test(inputLastName.value) == false ||
    inputLastName.value === null
  ) {
    lastNameErrorMsg.innerHTML = "Merci de renseigner un nom de famille valide";
    regexValidation++;
  } else {
    lastNameErrorMsg.innerHTML = "";
  }
  if (
    regexAddress.test(inputAddress.value) == false ||
    inputAddress.value === null
  ) {
    addressErrorMsg.innerHTML =
      "Merci de renseigner une adresse valide (Numéro, voie, nom de la voie, code postal)";
    regexValidation++;
  } else {
    addressErrorMsg.innerHTML = "";
  }
  if (regexCity.test(inputCity.value) == false || inputCity.value === null) {
    cityErrorMsg.innerHTML = "Merci de renseigner un nom de ville valide";
    regexValidation++;
  } else {
    cityErrorMsg.innerHTML = "";
  }
  if (regexEmail.test(inputEmail.value) == false || inputEmail.value === null) {
    emailErrorMsg.innerHTML = "Merci de renseigner une adresse email valide";
    regexValidation++;
  } else {
    emailErrorMsg.innerHTML = "";
  }
  return regexValidation == 0;
}

//On retourne le formulaire de commande et les Id après avoir validé le Regex du form
function orderValidation() {
  if (formRegexValidation() == true) {
    let contact = {
      firstName: inputFirstName.value,
      lastName: inputLastName.value,
      address: inputAddress.value,
      city: inputCity.value,
      email: inputEmail.value,
    };
    let products = [];
    let cart = getCart();

    for (let productId of cart) {
      products.push(productId.idSelectProduct);
    }

    let orderObject = { contact, products };
    return orderObject;
  } else {
    return false;
  }
}

//On envoi le formulaire de commande/Ids au travers du POST de l'API et on envoi l'utilisateur sur la page de confirmation
function orderApiPost(formProductObject) {
  const orderId = fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    body: JSON.stringify(formProductObject),
    headers: {
      "Content-type": "application/json",
    },
  });
  orderId.then(async function (response) {
    const retour = await response.json();
    window.location.href = `confirmation.html?orderId=${retour.orderId}`;
  });
}

//OnClick On verifie les inputs de l'utilisateur avant d'envoyer sa commande à l'API
function orderButton() {
  const orderButton = document.querySelector("#order");
  orderButton.addEventListener("click", function (defaultBlock) {
    defaultBlock.preventDefault();

    let formProductObject = orderValidation();
    if (formProductObject) {
      orderApiPost(formProductObject);
    }
  });
}

//On initialise les fonctions de la page, await est necessaire pour showCart
async function initialisation() {
  await showCart();
  removeArticle();
  changeQuantityArticle();
  orderButton();
}

initialisation();
