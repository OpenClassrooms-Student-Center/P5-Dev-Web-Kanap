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


// ici recup boutton de suppression faire for each dessus et pour chaque element appelé deletefrom cart et get total quantity
const deleteButtons = document.querySelectorAll(".deleteItem");
deleteButtons.forEach((button) => {
  button.addEventListener("click", function (e) {
    removeFromCart(e);
  });
});

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


const nameRegex = 
  /^([a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ]+)$/;
const addressRegex =
  /^[a-zA-Z0-9'áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ\s\-]*$/;
const cityRegex = 
  /^([a-zA-Z'áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ\s\-]+)$/;
 const emailRegex =
 /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,10}))/i

  function checkRegex(inputId, regex, errorElementId, errorMessage) {
  const input = document.getElementById(inputId);
  const errorElement = document.getElementById(errorElementId);
  if (!input.value.match(regex)){
    errorElement.innerHTML = errorMessage;
    return false;
  } else {
    errorElement.innerHTML = "";
    return true
  }
}

function checkInputRegex(inputId, regex, errorElementId, errorMessage) {
  const input = document.getElementById(inputId);
  input.addEventListener("input", function(e) {
    checkRegex(inputId, regex, errorElementId, errorMessage)
  })
}

checkInputRegex("firstName", nameRegex, "firstNameErrorMsg", "Le texte ne doit contenir que des lettres")
checkInputRegex("lastName", nameRegex, "lastNameErrorMsg", "Le texte ne doit contenir que des lettres")
checkInputRegex("address", addressRegex, "addressErrorMsg", "Le texte ne peut pas contenir de caractère spécial")
checkInputRegex("city", cityRegex, "cityErrorMsg", "Le texte ne doit contenir que des lettres")
checkInputRegex("email", emailRegex, "emailErrorMsg", "Veuillez entrer une adresse email valide")


const formulaireEnvoie = document.querySelector(".cart__order__form");
  formulaireEnvoie.addEventListener("submit", function (e) {
    envoyerFormulaire(e);
  });

function envoyerFormulaire(e) {
  e.preventDefault();

checkInputRegex(
  "firstName", 
  nameRegex, 
  "firstNameErrorMsg", 
  "Le texte ne doit contenir que des lettres"
  )
checkInputRegex(
  "lastName", 
  nameRegex, 
  "lastNameErrorMsg", 
  "Le texte ne doit contenir que des lettres"
  )
checkInputRegex(
  "address", 
  addressRegex, 
  "addressErrorMsg", 
  "Le texte ne peut pas contenir de caractère spécial"
  )
checkInputRegex(
  "city", 
  cityRegex, 
  "cityErrorMsg", 
  "Le texte ne doit contenir que des lettres"
  )
checkInputRegex(
  "email", 
  emailRegex, 
  "emailErrorMsg", 
  "Veuillez entrer une adresse email valide"
  )

  const contact = {
    contact : {
      firstName: document.getElementById("firstName").value,
      lastName: document.getElementById("lastName").value,
      address: document.getElementById("address").value,
      city: document.getElementById("city").value,
      email: document.getElementById("email").value,
    }
  }

  const productsIds = getCart().map(product => product._id)

  const datas = {
    contact : contact,
    products: productsIds,
  }
  
fetch("http://localhost:3000/api/products/order", {
  method: "POST",
  headers: { "Content-Type": "applicatiooon/json" },
  body: JSON.stringify(datas),
})
  .then((resp) => {
    if (resp.ok) {
      return resp.json();
    }
  })
  .then((datas) => {
    // localStorage.removeItem('cart');
    window.location.href = `./confirmation.html?orderId=${datas.orderId}`;
    });
}