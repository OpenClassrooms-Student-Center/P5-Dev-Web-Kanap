import { getCart } from "./index.js";
import { saveCart } from "./index.js";


const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const productId = urlParams.get("id");

fetch(`http://localhost:3000/api/products/${productId}`)
  .then((resp) => {
    if (resp.ok) {
      return resp.json();
    }
  })
  .then((product) => {
    renderProduct(product);
    document.getElementById("addToCart").addEventListener("click", function () {
      addCart(product._id);
    });
  })
  .catch((error) => {
    document.querySelector(
      ".item"
    ).innerHTML = `<p>Une erreur est survenue (${error})</p>`;
  });


function renderProduct(product) {
  document.querySelector("title").innerText = product.name;
  document.querySelector(
    ".item__img"
  ).innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}">`;
  document.getElementById("title").innerText = product.name;
  document.getElementById("price").innerText = product.price;
  document.getElementById("description").innerText = product.description;
  product.colors.forEach((color) => {
    document.getElementById(
      "colors"
    ).innerHTML += `<option value="${color}">${color}</option>`;
  });
}


function addCart(productId) {
  let cart = getCart();
  const color = document.getElementById("colors").value;
  const quantity = document.getElementById("quantity").value;
  if (quantity < 1 || quantity > 100) {
    alert("La quantité doit être située entre 1 et 100");
    return;
  }
  if (!color) {
    alert("Une couleur doit être séléctionnée");
    return;
  }

  let foundProduct = cart.find((p) => p._id === productId && p.color === color);
  if (foundProduct != undefined) {
    foundProduct.quantity += parseInt(quantity);
  } else {
    const formattedProduct = {
      _id: productId,
      color: color,
      quantity: parseInt(quantity),
    };
    cart.push(formattedProduct);
  }
  saveCart(cart);
  alert("Le produit à bien était ajouté au panier");
}
