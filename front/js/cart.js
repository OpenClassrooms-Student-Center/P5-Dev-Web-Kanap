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
  removeArticle();
}

//On supprime un article du LS quand l'utilisateur appui sur un bouton
function removeArticle() {
  const btnSupprimerListe = document.querySelectorAll(".deleteItem");
  console.log(btnSupprimerListe);
  btnSupprimerListe.forEach((article) => {
    article.addEventListener("click", function (event) {
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
      console.log(cart);
      cart = cart.filter((item) => item != articleSupprimer);
      saveCartLS(cart);
      console.log(cart);
      alert("article supprimé !");
      const getSection = document.querySelector("#cart__items");
      getSection.removeChild(event.target.closest("article"));
    });
  });
}

showCart();

window.addEventListener("DOMContentLoaded", (event) => {
  console.log(event);
});
