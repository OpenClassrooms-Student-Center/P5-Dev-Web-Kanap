import { getCart } from "./index.js";
import { saveCart } from "./index.js";
let cart = getCart();

cart.sort(function (a, b) {
  if (a._id < b._id) {
    return -1;
  }
  if (a._id > b._id) {
    return 1;
  }
  return 0;
});


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
    const parentItems = document.getElementById("cart__items");
    parentItems.innerHTML += html;
    addAmount(remoteProduct.price, localProduct.quantity);
  } catch (err) {
    document.querySelector(
      ".cart"
    ).innerHTML = `<p>Une erreur est survenue (${error})</p>`;
  }
}


const quantitySelector = document.querySelectorAll(".itemQuantity");
quantitySelector.forEach((input) => {
  input.addEventListener("input", function (e) {
    changeQuantity(e);
  });
});


function changeQuantity(event) {
  const article = event.target.closest("article");
  let cart = getCart();
  let curentItem = cart.find(
    (p) => p._id === article.dataset.id && p.color === article.dataset.color
  );
  if (curentItem != undefined) {
    curentItem.quantity = event.target.value;
    if (curentItem.quantity <= 0) {
      removeFromCart(curentItem);
    } else {
      saveCart(cart);
      getTotalQuantity();
      getTotalPrice();
    }
  }
}


const deleteButtons = document.querySelectorAll(".deleteItem");
deleteButtons.forEach((button) => {
  button.addEventListener("click", function (e) {
    removeFromCart(e);
  });
});


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
  // .catch((error) => {
  //   //on crée un message d'erreur lorsque l'API ne nous retourne pas d'infos.
  //   document.querySelector(
  //     ".item"
  //   ).innerHTML = `<p>Une erreur est survenue (${error})</p>`;
  // });
  article.remove();
  cart = cart.filter((curentItem) => curentItem !== itemToDelete);
  console.log(cart);
  saveCart(cart);
  getTotalQuantity();
}


function addAmount(price, quantity) {
  const htmlPrice = document.getElementById("totalPrice");
  if (htmlPrice.textContent === "") {
    htmlPrice.innerText = price * quantity;
  } else {
    htmlPrice.innerText =
      parseInt(htmlPrice.textContent) + parseInt(price * quantity);
  }
}


function lessAmount(price, quantity) {
  const htmlPrice = document.getElementById("totalPrice");
  htmlPrice.innerText =
    parseInt(htmlPrice.textContent) - parseInt(price * quantity);
}


function getTotalQuantity() {
  let cart = getCart();
  let number = 0;
  for (let product of cart) {
    number += parseInt(product.quantity);
  }
  document.getElementById("totalQuantity").innerText = number;
}
getTotalQuantity();


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
    } catch (err) {
      document.getElementById(
        "totalPrice"
      ).innerHTML = `<p>Une erreur est survenue (${error})</p>`;
    }
  }
}


const nameRegex =
  /^([a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ]+)$/;
const addressRegex =
  /^[a-zA-Z0-9'áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ\s\-]*$/;
const cityRegex =
  /^([a-zA-Z'áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ\s\-]+)$/;
const emailRegex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,10}))/i;

function checkRegex(inputId, regex, errorElementId, errorMessage) {
  const input = document.getElementById(inputId);
  const errorElement = document.getElementById(errorElementId);
  if (!input.value.match(regex)) {
    errorElement.innerHTML = errorMessage;
    return false;
  } else {
    errorElement.innerHTML = "";
    return true;
  }
}


function checkInputRegex(inputId, regex, errorElementId, errorMessage) {
  const input = document.getElementById(inputId);
  input.addEventListener("input", function (e) {
    checkRegex(inputId, regex, errorElementId, errorMessage);
  });
}


checkInputRegex(
  "firstName",
  nameRegex,
  "firstNameErrorMsg",
  "Le texte ne doit contenir que des lettres"
);
checkInputRegex(
  "lastName",
  nameRegex,
  "lastNameErrorMsg",
  "Le texte ne doit contenir que des lettres"
);
checkInputRegex(
  "address",
  addressRegex,
  "addressErrorMsg",
  "Le texte ne peut pas contenir de caractère spécial"
);
checkInputRegex(
  "city",
  cityRegex,
  "cityErrorMsg",
  "Le texte ne doit contenir que des lettres"
);
checkInputRegex(
  "email",
  emailRegex,
  "emailErrorMsg",
  "Veuillez entrer une adresse email valide"
);


const formulaireEnvoie = document.querySelector(".cart__order__form");
formulaireEnvoie.addEventListener("submit", function (e) {
  envoyerFormulaire(e);
});


function envoyerFormulaire(e) {
  e.preventDefault();

  if (
    checkRegex(
      "firstName",
      nameRegex,
      "firstNameErrorMsg",
      "Le texte ne doit contenir que des lettres"
    ) &&
    checkRegex(
      "lastName",
      nameRegex,
      "lastNameErrorMsg",
      "Le texte ne doit contenir que des lettres"
    ) &&
    checkRegex(
      "address",
      addressRegex,
      "addressErrorMsg",
      "Le texte ne peut pas contenir de caractère spécial"
    ) &&
    checkRegex(
      "city",
      cityRegex,
      "cityErrorMsg",
      "Le texte ne doit contenir que des lettres"
    ) &&
    checkRegex(
      "email",
      emailRegex,
      "emailErrorMsg",
      "Veuillez entrer une adresse email valide"
    )
  ) {
    const contact = {
      firstName: document.getElementById("firstName").value,
      lastName: document.getElementById("lastName").value,
      address: document.getElementById("address").value,
      city: document.getElementById("city").value,
      email: document.getElementById("email").value,
    };

    const productsIds = getCart().map((product) => product._id);

    const datas = {
      contact: contact,
      products: productsIds,
    };

    fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datas),
    })
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        }
      })
      .then((datas) => {
        localStorage.removeItem("cart");
        window.location.href = `./confirmation.html?orderId=${datas.orderId}`;
      });
    // .catch((error) => {
    //   //on crée un message d'erreur lorsque l'API ne nous retourne pas d'infos.
    //   document.querySelector(
    //     ".item"
    //   ).innerHTML = `<p>Une erreur est survenue (${error})</p>`;
    // });
  }
}
