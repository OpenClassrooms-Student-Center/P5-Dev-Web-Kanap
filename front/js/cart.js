const sectionArticle = document.getElementById("cart__items");
// Creation de la fonction de recuperation du contenu du panier
const getCart = function () {
  let panierLocalStorage = localStorage.getItem("panier");
  let panier = JSON.parse(panierLocalStorage);
  return panier;
};
panier = getCart();

// Creation de la fonction de formatage du prix
var formatter = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
});
// creation de la fonction de recuperation du prix depuis de server
function getPrice(id, data) {
  const result = data.filter((elt) => elt._id == id);
  if (result) {
    for (let res of result) {
      return res.price;
    }
  }
}
// creation de la fonction qui retoure un tableau de produit de id apartir du panier
const getPanierId = (obj) => {
  let itemsId = [];
  for (let itemId of obj) {
    itemsId.push(itemId.id);
  }
  return itemsId;
};
// creation de la fonction d'affichage du panier
const displayPanier = () => {
  if (sectionArticle != null) {
    for (let article of panier) {
      let kanap = ` <article class="cart__item" data-id="${article.id}" data-color="${article.color}">
          <div class="cart__item__img">
            <img src="${article.image}" alt="Photographie d'un canapé">
          </div>
          <div class="cart__item__content">
            <div class="cart__item__content__description">
              <h2>${article.name}</h2>
              <p>${article.color}</p>
              <p></p>
            </div>
            <div class="cart__item__content__settings">
              <div class="cart__item__content__settings__quantity">
                <p>Qté : </p>
                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${article.quantity}>
              </div>
              <div class="cart__item__content__settings__delete">
                <p class="deleteItem">Supprimer</p>
              </div>
            </div>
          </div>
        </article>`;

      sectionArticle.innerHTML += kanap;
    }
  }
};

// si il y a un panier
if (panier) {
  const getProductsPrice = function () {
    // Appel de l'API kanap
    fetch("http://localhost:3000/api/products")
      .then((result) => result.json())
      .then((data) => {
        const prix = document.querySelectorAll(
          ".cart__item__content__description"
        );
        const totalQuantity = document.getElementById("totalQuantity");
        const deleteItem = document.querySelectorAll(".deleteItem");
        const totalPrice = document.getElementById("totalPrice");
        // fonction qui affiche les quantité et les prix
        const getQuantity = function (panier) {
          let totalQ = 0;
          let totalP = 0;
          for (let i = 0; i < panier.length; i++) {
            prix[i].children[2].value =
              getPrice(panier[i].id, data) * panier[i].quantity;
            prix[i].children[2].textContent = formatter.format(
              prix[i].children[2].value
            );
            totalQ += Number(panier[i].quantity);
            totalP += prix[i].children[2].value;
          }
          totalQuantity.innerHTML = totalQ;
          totalPrice.innerHTML = formatter.format(totalP);
        };
        getQuantity(panier); // appel de la fonction qui affiche les quantité et les prix
        // creation de la fonction qui change le prix et la quantitées
        const changeQuantity = function () {
          const productQuantity = document.querySelectorAll(".itemQuantity");
          for (let quantity of productQuantity) {
            quantity.addEventListener("change", function (e) {
              let qte = e.target.value;
              let art = quantity.closest(`article`);

              let product_id = art.getAttribute("data-id");
              let product_color = art.getAttribute("data-color");

              panier = getCart();

              const product = panier.map((element) => {
                if (
                  element.id == product_id &&
                  element.color == product_color
                ) {
                  element.quantity = qte;
                }
                return element;
              });
              panier = product;
              localStorage.setItem("panier", JSON.stringify(panier));
              getQuantity(panier);
            });
          }
        };
        changeQuantity(); // Appel de la fonction qui change le prix et la quantitées
        // creation de la fonction de supression d'un article
        const deleteItems = function () {
          for (let i = 0; i < deleteItem.length; i++) {
            deleteItem[i].addEventListener("click", function () {
              panier = getCart();

              let art = deleteItem[i].closest(`article`);

              let product_id = art.getAttribute("data-id");
              let product_color = art.getAttribute("data-color");
              const result = panier.find(
                (elt) => elt.id == product_id && elt.color == product_color
              );
              const removeResult = panier.filter((elt) => elt != result);

              panier = removeResult;
              localStorage.setItem("panier", JSON.stringify(panier));
              getQuantity(panier);
              let x = deleteItem[i].closest(".cart__item");
              if (x != null) {
                x.remove();
              }
              if (panier.length == 0) {
                let txt = document.querySelector("h1");
                txt.textContent += " est vide";
              }
            });
          }
        };
        deleteItems(); // Appel de la fonction de supresion
      })
      .catch((err) => {
        console.error(err);
      });
  };

  displayPanier(); // Appel de la fonction d'affichage du panier
  getProductsPrice(); // Appel de la fonction qui renvoie les produit depuis le serverse
  getPanierId(panier); // Appel de la fonction qui recupere les id des produit du panier
  let products_ID = getPanierId(panier); // Creation et initialisation de la variable qui contient tous les id des produits du panier
  if (panier.length == 0) {
    let txt = document.querySelector("h1");
    txt.textContent += " est vide";
  }
  /// """""""""""""""""""""""""""""""""  Gestion du formulaire """""""""""""""""""""""""""""""""""""///

  const firstName = document.getElementById("firstName");
  const lastName = document.getElementById("lastName");
  const address = document.getElementById("address");
  const city = document.getElementById("city");
  const email = document.getElementById("email");

  let nameRegEx = new RegExp(
    /^[A-Za-zàçéèêëîïôöûüÿÀÉÈËÎÏÔÖÛÜ]+([-'\s][A-Za-zàçéèêëîïôöûüÿÀÉÈËÎÏÔÖÛÜ]+)?$/
  );
  let reghexEmail = new RegExp(/.+\@.+\..+/);
  let reghexAdresse = new RegExp(/^[^&~"#{([|`_\\\^@\])}=+°¨$£¤%!§:;.?<>/*]+$/);
  // creation de la fonction de verification du formulaire
  const validForm = (userInput, regExp, elt) => {
    let txt = elt.previousElementSibling.textContent;
    // si le reghex n'ai pas valide ou que le champ est vide => return false
    if (!regExp.test(userInput) || userInput == "") {
      elt.nextElementSibling.textContent = "veuillez respecter le format";
      elt.style.color = "red";
      elt.setAttribute(
        "placeholder",
        `Veuillez entrer votre ${txt.toLowerCase().replace(":", "")}`
      );
      return false;
    }
    // si non return => true
    elt.nextElementSibling.textContent = "";
    return true;
  };
  const btnOrder = document.getElementById("order");

  btnOrder.addEventListener("click", function (e) {
    e.preventDefault();
    let panier = getCart();
    if (panier.length == 0) {
      alert("le panier est vide, retourner a la page produit pour le remplir");
    }
    // verification du formulaire
    let resfirstName = validForm(firstName.value, nameRegEx, firstName);
    let reslastName = validForm(lastName.value, nameRegEx, lastName);
    let resAddress = validForm(address.value, reghexAdresse, address);
    let resCity = validForm(city.value, nameRegEx, city);
    let resEmail = validForm(email.value, reghexEmail, email);
    // si tout les champ son valide et que le panier n'est pas vide
    if (
      resfirstName &&
      reslastName &&
      resAddress &&
      resCity &&
      resEmail &&
      panier.length !== 0
    ) {
      // creation de l'objet contactUser avec les information du formulaire
      let contactUser = {
        firstName: firstName.value,
        lastName: lastName.value,
        address: address.value,
        city: city.value,
        email: email.value,
      };
      // creation de l'objet order avec l'objet contactUser et la liste de id des produits
      let order = {
        contact: contactUser,
        products: products_ID,
      };
      // envoie vers le servere par une methode POST de l'objet order
      fetch("http://localhost:3000/api/products/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order), // objet order
      })
        .then((responce) => responce.json())
        .then((data) => {
          // recuperation de l'order id envoyé par le server
          // et redirection vers la page confirmation.html

          window.location.href = `confirmation.html?id_order=  ${data.orderId}`;
          localStorage.clear(); // supression du panier dans le local storage
        });
    }
  });
}
// recuperation de l'order id depuit l'URL de la page
let id_order = new URL(location.href).searchParams.get("id_order");
console.log(id_order);
let order = document.getElementById("orderId");
if (order != null) {
  order.innerHTML = `<br/> ${id_order}`; // insertion de l'order id dans le DOM
}
