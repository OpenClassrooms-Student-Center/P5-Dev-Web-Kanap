const productId = new URL(location.href).searchParams.get("id");
const productImage = document.querySelector(".item__img");
const productName = document.getElementById("title");
const productPrice = document.getElementById("price");
const productDescription = document.getElementById("description");
const productColor = document.getElementById("colors");
const productQuantity = document.getElementById("quantity");
const boutonPanier = document.getElementById("addToCart");
// Creation de la fonction de formatage du prix
var formatter = new Intl.NumberFormat("de-FR", {
  style: "currency",
  currency: "EUR",
});

fetch(`http://localhost:3000/api/products/${productId}`)
  .then((res) => res.json())
  .then((data) => {
    console.log(`nom du produit ${data.name}`);
    let image = document.createElement("img");
    image.setAttribute("src", data.imageUrl);
    image.setAttribute("alt", data.altTxt);
    productImage.appendChild(image);
    productName.innerHTML = data.name;
    productPrice.innerHTML = formatter.format(data.price);
    productDescription.innerHTML = data.description;
    document.title = data.name;

    for (let color of data.colors) {
      let option = document.createElement("option");
      option.innerHTML = color;
      option.value = color;
      productColor.appendChild(option);
    }
    boutonPanier.addEventListener("click", function (event) {
      event.preventDefault();
      event.stopPropagation();
      //  Si la quantité ou bien la couleur ne sont pas sélectioné => pop up alert() si non appel de la fonction addProduct """"///
      if (productColor.value == "") {
        alert("il faut choisir une couleur");
      } else if (productQuantity.value < 1 || productQuantity.value > 100) {
        alert("il faut choisir une quantitée");
      } else {
        getArticle(data);
      }
    });
  })
  .catch((e) => console.log(e));

productColor.addEventListener("change", function (e) {
  console.log(e.target.value);
});
productQuantity.addEventListener("change", function (e) {
  console.log(e.target.value);
});
console.log(`id recuperé dans l'URL ${productId}`);

const getArticle = (data) => {
  const product = {
    id: productId,
    color: productColor.value,
    quantity: productQuantity.value,
    name: data.name,
    description: data.description,
    image: data.imageUrl,
    altTxt: data.altTxt,
  };

  console.table(product);

  let panierLocalStorage = localStorage.getItem("panier"); // initialisation de la variable d'acces au Local Storage
  let panier; // Creation de la variable qui va stoquer le comtenu du panier.

  if (panierLocalStorage == null) {
    console.log("panier vide");
    panier = [];
  } else {
    panier = JSON.parse(panierLocalStorage);
  }
  if (
    panier.length == 0 &&
    productQuantity.value > 0 &&
    productQuantity.value < 100 &&
    productColor.value != null
  ) {
    panier.push(product);
  } else {
    const item = panier.find(
      (item) => item.id == product.id && item.color == product.color
    );

    if (item) {
      console.log("meme produit");
      item.quantity = parseInt(product.quantity) + parseInt(item.quantity);
      product.quantity += item.quantity;
    } else {
      panier.push(product);
    }
  }
  localStorage.setItem("panier", JSON.stringify(panier));
};
