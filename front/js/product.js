let url = new URL(location.href);
let kanapPageId = url.searchParams.get("id");

const imgKanapDoc = document.querySelector(".item__img");
const titleKanapDoc = document.querySelector("#title");
const priceKanapDoc = document.querySelector("#price");
const descriptionKanapDoc = document.querySelector("#description");
const colorsKanapDoc = document.querySelector("#colors");
const quantityKanapDoc = document.querySelector("#quantity");

//Transformation des donnees du produit en variables exploitables
fetch(`http://localhost:3000/api/products/${kanapPageId}`)
  .then((response) => response.json())
  .then((object) => {
    const imgKanap = object.imageUrl;
    const titleKanap = object.name;
    const priceKanap = object.price;
    const descriptionKanap = object.description;
    const colorsKanap = object.colors;

    //Affichage du produit
    for (let color of colorsKanap) {
      colorsKanapDoc.innerHTML += `<option value="${color}">Disponible en ${color}</option>`;
    }
    imgKanapDoc.innerHTML += `<img src="${imgKanap}" alt="Photographie d'un canapé">`;
    titleKanapDoc.innerText += `${titleKanap}`;
    priceKanapDoc.innerText += `${priceKanap} `;
    descriptionKanapDoc.innerText += `${descriptionKanap}`;

    const button = document.getElementById("addToCart");

    //Ajout produit choisi (qte + couleur) au panier dans le LocalStorage
    button.addEventListener("click", () => {
      let basketValues = {
        idSelectProduct: kanapPageId,
        nameSelectProduct: titleKanap,
        colorSelectProduct: colorsKanapDoc.value,
        quantitySelectProduct: quantityKanapDoc.value,
      };

      //Recuperation du panier existant du LocalStorage en array
      function getBasket() {
        let basketValues = JSON.parse(
          localStorage.getItem("kanapLocalStorage")
        );
        if (basketValues === null) {
          return [];
        } else {
          return basketValues;
        }
      }

      //Ajout de la nouvelle quantite pour le panier
      function addBasket(product) {
        let basketValues = getBasket();
        let basketProduct = basketValues.find(
          (item) =>
            item.idSelectProduct === product.idSelectProduct &&
            item.colorSelectProduct === product.colorSelectProduct
        );

        if (
          basketProduct == undefined &&
          colorsKanapDoc.value != "" &&
          quantityKanapDoc.value > 0 && //TODO remove redundancy
          quantityKanapDoc.value <= 100
        ) {
          product.quantity = quantityKanapDoc.value;
          basketValues.push(product);
        } else {
          basketProduct.quantity =
            parseInt(basketProduct.quantity) + parseInt(quantityKanapDoc.value);
        }
        saveBasket(basketValues);
        alert(
          `Le produit ${titleKanap} en ${colorsKanapDoc.value} x ${quantityKanapDoc.value} ajouté au panier`
        );
      }
      //Envoi de la nouvelle quantite du panier dans le LocalStorage
      function saveBasket(basketValues) {
        localStorage.setItem("kanapLocalStorage", JSON.stringify(basketValues));
      }

      if (colorsKanapDoc.value === "") {
        alert("Erreur: Pas de couleur choisie.");
      } else if (quantityKanapDoc.value <= 0 || quantityKanapDoc.value > 100) {
        alert("Erreur: quantité invalide.");
      } else {
        addBasket(basketValues);
      }
    });
  })
  .catch(function (err) {
    console.log(err);
  });
