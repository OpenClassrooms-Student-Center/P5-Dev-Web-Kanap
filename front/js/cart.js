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

//Fonction qui permet de retirer un produit du panier
function removeFromCart(event) {
  const article = event.target.closest("article");
  let cart = getCart();
  let itemToDelete = cart.find(
    (p) => p._id != article.dataset.id && p.color != article.dataset.color
  );
  article.remove();
  saveCart(cart);
}




//ajouter le prix
function addAmount(price, quantity) {
  const htmlPrice = document.getElementById("totalPrice");
  console.log(htmlPrice.textContent);
  if (htmlPrice.textContent === "") {
    htmlPrice.innerText = price * quantity;
  } else {
    htmlPrice.innerText =
      parseInt(htmlPrice.textContent) + parseInt(price * quantity);
  }
}
function refreshAmount(price, quantity) {
  let foundPrice = htmlPrice;
  if ()

}




//Fonction qui nous permet d'ajouter tous les produits du panier afin de faire un total
function getTotalQuantity() {
  let cart = getCart();
  let number = 0;
  for (let product of cart) {
    number += product.quantity;
  }
  document.getElementById("totalQuantity").innerText = number;
}
getTotalQuantity();

//Fonction qui permet d'ajouter ou supprimer plus ou moins de quantité sur un produit
function changeQuantity(product, quantity) {
  let cart = getCart();
  let foundProduct = cart.find((p) => p._id == product._id);
  if (foundProduct != undefined);
  {
    foundProduct.quantity += quantity;
    //Cela appelle aussi la fonction du dessus lorsqu'un item passe à 0 ou en dessous afin de supprimer le produit du local storage
    if (foundProduct.quanity <= 0) {
      removeFromCart(foundProduct);
    } else {
      saveCart(cart);
    }
  }
}
