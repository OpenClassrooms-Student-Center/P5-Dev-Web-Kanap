let panierLocalStorage = localStorage.getItem("panier");
let panier = JSON.parse(panierLocalStorage);
const panierTxt = document.querySelector("h1");
const sectionArticle = document.getElementById("cart__items");

console.log(panier);
const desplayPanier = () => {
  for (let article of panier) {
    let kanap = ` <article class="cart__item" data-id="${
      article.id
    }" data-color="${article.color}">
      <div class="cart__item__img">
        <img src="${article.image}" alt="Photographie d'un canapé">
      </div>
      <div class="cart__item__content">
        <div class="cart__item__content__description">
          <h2>${article.name}</h2>
          <p>${article.color}</p>
          <p class="prix">${article.price * article.quantity} €</p>
        </div>
        <div class="cart__item__content__settings">
          <div class="cart__item__content__settings__quantity">
            <p>Qté : </p>
            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${
              article.quantity
            }>
          </div>
          <div class="cart__item__content__settings__delete">
            <p class="deleteItem">Supprimer</p>
          </div>
        </div>
      </div>
    </article>`;

    sectionArticle.innerHTML += kanap;
  }
};
desplayPanier();
const displayPanierTxt = function (panier) {
  if (panier.length == 0) {
    panierTxt.textContent = "votre panier est vide";
  } else {
    panierTxt.textContent = "Votre panier";
  }
};
displayPanierTxt(panier);
const productQuantity = document.querySelectorAll(".itemQuantity");

const addItems = () => {
  for (let i = 0; i < panier.length; i++) {
    productQuantity[i].addEventListener("change", function (e) {
      let newPrice = 0;
      console.log(e.target.value, `la cles correspond a ${i}`);
      panier[i].quantity = e.target.value;
      newPrice = panier[i].quantity * panier[i].price;

      const prix = document.querySelectorAll(".prix  ");

      prix[i].textContent = `${newPrice} €`;
      localStorage.setItem("panier", JSON.stringify(panier));

      sumTotal();
    });
  }
};
addItems();

function sumTotal() {
  // Récupération du total des quantités
  let elemsQtt = document.getElementsByClassName("itemQuantity");
  let myLength = elemsQtt.length,
    totalQtt = 0;

  for (let i = 0; i < myLength; ++i) {
    totalQtt += elemsQtt[i].valueAsNumber;
  }

  let totalQuantity = document.getElementById("totalQuantity");
  totalQuantity.innerHTML = totalQtt;
  console.log(totalQtt);

  // Récupération du prix total
  totalPrice = 0;

  for (let i = 0; i < myLength; i++) {
    totalPrice += elemsQtt[i].valueAsNumber * panier[i].price;
  }

  let productTotalPrice = document.getElementById("totalPrice");
  productTotalPrice.innerHTML = totalPrice;
  console.log(totalPrice);
}

sumTotal();
function deleteProduct() {
  let btn_supprimer = document.querySelectorAll(".deleteItem");

  for (let i = 0; i < btn_supprimer.length; i++) {
    btn_supprimer[i].addEventListener("click", (event) => {
      event.preventDefault();
      let section = btn_supprimer[i].closest(".cart__item");

      //Selection de l'element à supprimer en fonction de son id ET sa couleur
      let idElementDelete = panier[i].id;
      let colorElementDelete = panier[i].color;

      panier = panier.filter(
        (el) => el.id !== idElementDelete || el.color !== colorElementDelete
      );
      section.remove();
      localStorage.setItem("panier", JSON.stringify(panier));
      panier = JSON.parse(panierLocalStorage);

      //Alerte produit supprimé et refresh
      alert(`Ce produit a bien été supprimé du panier`);
      sumTotal();
      desplayPanierTxt(panier);
    });
  }
}
deleteProduct();
