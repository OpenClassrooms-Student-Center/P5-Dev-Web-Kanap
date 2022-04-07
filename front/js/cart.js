
// faire en sorte de pouvoir changer la quantité ou supprimer un produit

// 1 --- Depuis la page Panier, récupérer le panier et ses éléments via localStorage
let produitDuPanier = JSON.parse(localStorage.getItem("panier"));
console.log(produitDuPanier);
//On isole l'id du produit comme on l'a fait avec search params sur la page product
for (let i in produitDuPanier) {
  let product = {
    id: produitDuPanier[i].id,
    color: produitDuPanier[i].color,
    quantity: produitDuPanier[i].quantity,
  };
  let productId = product.id;
  let attributColor = product.color;

  console.log(productId);
  // on cible l'emplacement
  let cartItem = document.getElementById("cart__items");
  // utiliser fetch pour récupérer les produits qui se trouvent dans l'api (grace a l'id)
  fetch(`http://localhost:3000/api/products/${productId}`)
    .then((response) => response.json())
    .then((product) => {
      console.log(product);
      //créer et insérer les éléments à afficher
      //article
      let article = document.createElement("article");
      article.className = "cart__item";
      article.setAttribute("data_id", `${productId}`);
      article.setAttribute("data_color", `${attributColor}`);
      cartItem.append(article);

      //divImage + image
      let divImage = document.createElement("div");
      divImage.className = "cart__item__img";
      article.append(divImage);
      let image = document.createElement("img");
      image.src = product.imageUrl;
      image.alt = product.altTxt;
      divImage.append(image);

      //divItemContent + childs (description et quantité)
      let divItemContent = document.createElement("div");
      divItemContent.className = "cart__item__content";
      divItemContent.append(article);

      //divdescription (name, color, price)
      let divDescription = document.createElement("div");
      divDescription.className = "cart__item__content__description";
      divItemContent.append(divDescription);
      let productName = document.createElement("h2");
      productName.textContent = product.name;
      divDescription.append(productName);
      let productColor = document.createElement("p");
      productColor.textContent = product.color;
      divDescription.append(productColor);
      let productPrice = document.createElement("p");
      productPrice.textContent = product.price;
      divDescription.append(productPrice);

      //divsettings (divqté(qté + input))
      let divSettings = document.createElement("div");
      divSettings.className = "cart__item__content__settings";
      divItemContent.append(divSettings);
      let divQuantity = document.createElement("div");
      divQuantity.className = "cart__item__content__settings__quantity";
      divSettings.append(divQuantity);
      let productQuantity = document.createElement("p");
      productQuantity.innerText = "Qté : ";
      divQuantity.append(productQuantity);
      let quantityInput = document.createElement("input");
      quantityInput.className = "itemQuantity";
      quantityInput.setAttribute("type", "number");
      quantityInput.value = product.quantity;
      divQuantity.append(quantityInput);

      //divDelete + child
      let divSettingsDelete = document.createElement("div");
      divSettingsDelete.className = "cart__item__content__settings__delete";
      divSettingsDelete.appendChild(article);
      let deleteItem = document.createElement("p");
      deleteItem.className = "deleteItem";
      deleteItem.innerText = "Supprimer";
    });
}

// faire en sorte d'additionner les prix pour avoir le total

// function panierStatus() {
//   //si le panier ne contient aucun article
//   if (produitDuPanier === null) {
//     // indiquer que le panier est vide (avec innerHTML)

//   } else {
//     for (let product in produitDuPanier) {
//       // afficher le panier

//     }
//   }
//   panierStatus();
// }
