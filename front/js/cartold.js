const basketValue = JSON.parse(localStorage.getItem("kanapLocalStorage"));
console.log(basketValue);

//recuperation du panier et reecriture en array dans LocalStorage
async function fetchApi() {
  let basketArrayFull = [];
  let basketClassFull = JSON.parse(localStorage.getItem("kanapLocalStorage"));
  console.log(basketClassFull);
  if (basketClassFull !== null) {
    for (let i = 0; i < basketClassFull.length; i++) {
      await fetch(
        "http://localhost:3000/api/products/" +
          basketClassFull[i].idSelectProduct
      )
        .then((response) => response.json())
        .then((canap) => {
          const article = {
            _id: canap._id,
            name: canap.name,
            price: canap.price,
            color: basketClassFull[i].colorSelectProduct,
            quantity: basketClassFull[i].quantity,
            alt: canap.altTxt,
            img: canap.imageUrl,
          };
          basketArrayFull.push(article);
        })
        .catch(function (err) {
          console.log(err);
        });
    }
  }
  console.log(basketArrayFull);
  return basketArrayFull;
}

//Affichage DOM
async function showBasket() {
  const responseFetch = await fetchApi();
  const basketValue = JSON.parse(localStorage.getItem("kanapLocalStorage"));
  if (basketValue !== null && basketValue.length !== 0) {
    const zonePanier = document.querySelector("#cart__items");
    responseFetch.forEach((product) => {
      zonePanier.innerHTML += `<article class="cart__item" data-id="${product._id}" data-color="${product.color}">
                <div class="cart__item__img">
                  <img src= "${product.img}" alt="Photographie d'un canapé">
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
  } else {
    return messagePanierVide();
  }
}

//Affiche un message de panier vide et masque le formulaire
function messagePanierVide() {
  const cartTitle = document.querySelector(
    "#limitedWidthBlock div.cartAndFormContainer > h1"
  );
  cartTitle.textContent = "Votre panier est vide !";
  cartTitle.style.fontSize = "40px";

  document.querySelector(".cart__order").style.display = "none";
  document.querySelector(".cart__price").style.display = "none";
}

showBasket();

async function removeItem() {
  await fetchApi();
  const kanapDelete = document.querySelectorAll(".deleteItem"); //crée un tableau avec les boutons suppr
  kanapDelete.forEach((article) => {
    article.addEventListener("click", function (event) {
      let basketValue = getBasket();
      //On récupère l'ID de la donnée concernée
      const idDelete = event.target.closest("article").getAttribute("data-id");
      //On récupère la couleur de la donnée concernée
      const colorDelete = event.target
        .closest("article")
        .getAttribute("data-color");
      const searchDeleteKanap = basketValue.find(
        // on cherche l'élément du Ls concerné
        (element) =>
          element.idSelectedProduct == idDelete &&
          element.colorSelectedProduct == colorDelete
      );
      basketValue = basketValue.filter(
        // et on filtre le Ls avec l'élément comme modèle
        (item) => item != searchDeleteKanap
      );
      localStorage.setItem("kanapLs", JSON.stringify(basketValue)); // on met à jour le Ls
      const getSection = document.querySelector("#cart__items");
      getSection.removeChild(event.target.closest("article")); // on supprime l'élément du DOM
      alert("article supprimé !");
      calculQteTotale();
      calculPrixTotal(); // on met à jour les qty et prix dynamiquement
    });
  });
  if (getBasket() !== null && getBasket().length === 0) {
    localStorage.clear(); //////// si le Ls est vide, on le clear et on affiche le message
    return messagePanierVide();
  }
}
