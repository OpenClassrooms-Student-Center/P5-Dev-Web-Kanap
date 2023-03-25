//import de fonction du fichier index
import { getCart } from "./index.js";
import { saveCart } from "./index.js";
let cart = getCart();
//tri

cart.sort(function (a, b) {
  if (a._id < b._id) {
    return -1;
  }
  if (a._id > b._id) {
    return 1;
  }
  return 0;
});

//creation des elements du panier
for (const localProduct of cart) {
  try {
    const response = await fetch(
      `http://localhost:3000/api/products/${localProduct._id}`
    );
    const remoteProduct = await response.json();
    let html = "";
    html += `
        <article class="cart__item" data-id="${remoteProduct._id}" data-color="${localProduct.color}">
        <div class="cart__item__img">
          <img src="${remoteProduct.imageUrl}" alt="${remoteProduct.altTxt}">
        </div>
        <div class="cart__item__content">
          <div class="cart__item__content__description">
            <h2>${remoteProduct.name}</h2>
            <p>${localProduct.color}</p>
            <p>${remoteProduct.price}€</p>
          </div>
          <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
              <p>Qté : </p>
              <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${localProduct.quantity}">
            </div>
            <div class="cart__item__content__settings__delete">
              <p class="deleteItem">Supprimer</p>
            </div>
          </div>
        </div>
      </article>`;
    //Ensuite on appelle le parent du code qui a un id 'items' afin que le code soit écrit au bon endroit.
    const parentItems = document.getElementById("cart__items");
    //On explique que le parents est du code HTML (qu'est ce que le inner.html)
    parentItems.innerHTML += html;
    addAmount(remoteProduct.price, localProduct.quantity);
  } catch (err) {}
}

// ici recup boutton de suppression faire for each dessus et pour chaque element appelé deletefrom cart et get total quantity
const deleteButtons = document.querySelectorAll(".deleteItem");
deleteButtons.forEach((button) => {
  button.addEventListener("click", function (e) {
    removeFromCart(e);
  });
});

const quantitySelector = document.querySelectorAll(".itemQuantity");
quantitySelector.forEach((input) => {
  input.addEventListener("input", function (e) {
    changeQuantity(e);
  });
});

//Fonction qui permet d'ajouter ou supprimer plus ou moins de quantité sur un produit
function changeQuantity(event) {
  const article = event.target.closest("article");
  let cart = getCart();
  let curentItem = cart.find(
    (p) => p._id === article.dataset.id && p.color === article.dataset.color
  );
  if (curentItem != undefined) {
    curentItem.quantity = event.target.value;
    //Cela appelle aussi la fonction du dessus lorsqu'un item passe à 0 ou en dessous afin de supprimer le produit du local storage
    if (curentItem.quantity <= 0) {
      removeFromCart(curentItem);
    } else {
      saveCart(cart);
      getTotalQuantity();
      getTotalPrice();
    }
  }
}

//Fonction qui permet de retirer un produit du panier
function removeFromCart(event) {
  const article = event.target.closest("article");
  let cart = getCart();
  let itemToDelete = cart.find(
    (p) => p._id === article.dataset.id && p.color === article.dataset.color
  );
  fetch(`http://localhost:3000/api/products/${itemToDelete._id}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      lessAmount(data.price, itemToDelete.quantity);
    });
  article.remove();
  cart = cart.filter((curentItem) => curentItem !== itemToDelete);
  console.log(cart);
  saveCart(cart);
  getTotalQuantity();
}

//r
function addAmount(price, quantity) {
  const htmlPrice = document.getElementById("totalPrice");
  if (htmlPrice.textContent === "") {
    htmlPrice.innerText = price * quantity;
  } else {
    htmlPrice.innerText =
      parseInt(htmlPrice.textContent) + parseInt(price * quantity);
  }
}

//f
function lessAmount(price, quantity) {
  const htmlPrice = document.getElementById("totalPrice");
  htmlPrice.innerText =
    parseInt(htmlPrice.textContent) - parseInt(price * quantity);
}

//Fonction qui nous permet d'ajouter tous les produits du panier afin de faire un total
function getTotalQuantity() {
  let cart = getCart();
  let number = 0;
  for (let product of cart) {
    number += parseInt(product.quantity);
  }
  document.getElementById("totalQuantity").innerText = number;
}
getTotalQuantity();

//f
function getTotalPrice() {
  const htmlPrice = document.getElementById("totalPrice");
  htmlPrice.innerText = "";
  let cart = getCart();
  for (const localProduct of cart) {
    try {
      fetch(`http://localhost:3000/api/products/${localProduct._id}`)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          addAmount(data.price, localProduct.quantity);
        });
    } catch (err) {}
  }
}

//****************Traitement des erreurs de formulaires****************
// function checkRegex() {
// }
//const firstNameInput = document.getElementById("firstName");
//const firstNameError = document.getElementById("firstNameErrorMsg");
//firstNameInput.addEventListener("input", function (e){
//  checkRegex(firstNameInput, firstNameError, "/^([a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ]+)$/"
//  , "Le texte ne doit pas contenire que des lettres")
//});

//prenom
const firstNameInput = document.getElementById("firstName");
const firstNameError = document.getElementById("firstNameErrorMsg");
firstNameInput.addEventListener("input", function (e) {
  if (
    !firstNameInput.value.match(
      /^([a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ]+)$/
    )
  ) {
    firstNameError.innerHTML = "Le texte ne doit contenire que des lettres";
  } else {
    firstNameError.innerHTML = "";
  }
});

//Nom
const lastNameInput = document.getElementById("lastName");
const lastNameError = document.getElementById("lastNameErrorMsg");
lastNameInput.addEventListener("input", function (e) {
  if (
    !lastNameInput.value.match(
      /^([a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ]+)$/
    )
  ) {
    lastNameError.innerHTML = "Le texte ne doit contenire que des lettres";
  } else {
    lastNameError.innerHTML = "";
  }
});

//adresse
const adresseInput = document.getElementById("address");
const adresseError = document.getElementById("addressErrorMsg");
adresseInput.addEventListener("input", function (e) {
  if (
    !adresseInput.value.match(
      /^[a-zA-Z0-9"'áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ\s\-]*$/
    )
  ) {
    adresseError.innerHTML =
      "Le texte ne peut pas contenir de caractère spécial";
  } else {
    adresseError.innerHTML = "";
  }
});

//ville
const cityInput = document.getElementById("city");
const cityError = document.getElementById("cityErrorMsg");
cityInput.addEventListener("input", function (e) {
  if (
    !cityInput.value.match(
      /^([a-zA-Z"'áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ\s\-]+)$/
    )
  ) {
    cityError.innerHTML = "Le texte ne doit contenire que des lettres";
  } else {
    cityError.innerHTML = "";
  }
});

//email
const emailInput = document.getElementById("email");
const emailError = document.getElementById("emailErrorMsg");
emailInput.addEventListener("input", function (e) {
  if (
    !emailInput.value.match(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,10}))/i
    )
  ) {
    emailError.innerHTML = "Veuillez entrer une adresse email valide";
  } else {
    emailError.innerHTML = "";
  }
});

const randomCommandNumber = (max, min) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

//*************Envoie du Formulaire a l'API*************
function envoyerFormulaire() {
  const formulaireEnvoie = document.getElementById("order");
  formulaireEnvoie.addEventListener("submit", function (e) {
    e.preventDefault();
  });
  //checkRegex()
  const cmd = randomCommandNumber(99999999,10000000);
  localStorage.setItem("commandNumber", JSON.stringify(cmd));
  let cartCmd = getCart();
  const form = {
    firstName: target.querySelector("[name=firstname]").value,
    LastName: target.querySelector("[name=lastname]").value,
    address: target.querySelector("[name=address]").value,
    city: target.querySelector("[name=city]").value,
    email: target.querySelector("[name=email]").value,
  };
  const chargeUtile = JSON.stringify(form);

  const send = fetch("http://localhost:3000/api/order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: { chargeUtile, cmd, cartCmd }
  });
  location.href('http://127.0.0.1:5500/front/html/confirmation.html')
}