const basketValue = JSON.parse(localStorage.getItem("kanapLocalStorage"));

//recuperation du panier et reecriture en array dans LocalStorage
async function fetchApi() {
  let basketArrayFull = [];
  let basketClassFull = JSON.parse(localStorage.getItem("kanapLocalStorage"));
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
