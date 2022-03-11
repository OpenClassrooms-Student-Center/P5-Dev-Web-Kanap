// recuperation de id du produit dans l'URL
const productId = new URL(location.href).searchParams.get("id");
console.log(`id recuperé dans l'URL ${productId}`); // Affichage dans la console de l'id du produit
const productImage = document.querySelector(".item__img");
const productName = document.getElementById("title");
const productPrice = document.getElementById("price");
const productDescription = document.getElementById("description");
const productColor = document.getElementById("colors");
const productQuantity = document.getElementById("quantity");
const boutonPanier = document.getElementById("addToCart");

// Creation de la fonction de formatage du prix
var formatter = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
});

const getArticleData = function () {
  fetch(`http://localhost:3000/api/products/${productId}`) // appel de l'API avec l'id du produit en parametre
    .then((res) => res.json())
    .then((data) => {
      let image = document.createElement("img"); // creation de l'element image
      image.setAttribute("src", data.imageUrl); // ajout de l'atribut src de l'image
      image.setAttribute("alt", data.altTxt); // ajout de l'atribut alt de l'mage
      productImage.appendChild(image); // insertion de l'element image
      productName.innerHTML = data.name;
      productPrice.innerHTML = formatter.format(data.price);
      productDescription.innerHTML = data.description;
      document.title = data.name; // titre de la page

      for (let color of data.colors) {
        let option = document.createElement("option"); // creation des l'elements option pour chaque couleur
        option.innerHTML = color;
        option.value = color;
        productColor.appendChild(option); // insertion des element option
      }

      boutonPanier.addEventListener("click", function (event) {
        event.preventDefault();
        event.stopPropagation();
        //  Si la quantité ou bien la couleur ne sont pas sélectioné => message d'alerte
        if (productColor.value == "") {
          alert("il faut choisir une couleur");
        } else if (productQuantity.value < 1 || productQuantity.value > 100) {
          alert("il faut choisir une quantitée");
        } else {
          getArticle(data); // appel de la fonction de creation du panier
        }
      });
    })
    .catch((e) => console.error(e));
};
getArticleData();
productColor.addEventListener("change", function (e) {});
productQuantity.addEventListener("change", function (e) {});

// creation de la fonction de creation du panier
const getArticle = (data) => {
  // creation de l'objet produit
  const product = {
    id: productId,
    color: productColor.value,
    quantity: productQuantity.value,
    name: data.name,
    description: data.description,
    image: data.imageUrl,
    altTxt: data.altTxt,
  };
  // initialisation de la variable d'acces au Local Storage
  let panierLocalStorage = localStorage.getItem("panier");
  let panier; // Creation de la variable qui va stoquer le comtenu du panier.

  if (panierLocalStorage == null) {
    console.log("panier vide");
    panier = [];
  } else {
    panier = JSON.parse(panierLocalStorage);
  }
  // le panier est vide
  if (
    panier.length == 0 &&
    productQuantity.value > 0 &&
    productQuantity.value < 100 &&
    productColor.value != null
  ) {
    panier.push(product); // ajout du produit dans le panier
    // si il y a un produit dans le panier
  } else {
    // verification si le panier contient deja le meme produit grasse a sa couleur et son id
    const item = panier.find(
      (item) => item.id == product.id && item.color == product.color
    );
    // si le panier contient le même article, la quantité est incrémentée.
    if (item) {
      item.quantity = parseInt(product.quantity) + parseInt(item.quantity);
      product.quantity += item.quantity;
    } else {
      // si non on ajoute le produit au panier
      panier.push(product);
    }
  }
  localStorage.setItem("panier", JSON.stringify(panier));
};
