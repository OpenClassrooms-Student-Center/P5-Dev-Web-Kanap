//Pour récupérer l'url de nos id
const searchParams = window.location.search;
const urlParams = new URLSearchParams(searchParams);
const idProduct = urlParams.get("id");

//récupère les données du serveur pour chaque id
fetch(`http://localhost:3000/api/products/${idProduct}`)
  .then((response) => response.json())
  .then((response) => product(response));

//appel chaque élément d'un article
function product(Kanap) {
  const { altTxt, colors, description, imageUrl, name, price } = Kanap;
  makeImage(imageUrl, altTxt);
  makeTitle(name);
  makePrice(price);
  makeDescription(description);
  makeColors(colors);
}

//Création <img> avec source et description, injecte dans la <div class="item__img">
function makeImage(imageUrl, altTxt) {
  const image = document.createElement("img");
  image.src = imageUrl;
  image.alt = altTxt;
  const itemImg = document.querySelector(".item__img");
  itemImg.appendChild(image);
}

//injecte le nom du produit
function makeTitle(name) {
  const title = document.querySelector("#title");
  title.textContent = name;
}

//injecte le prix du produit
function makePrice(price) {
  const euro = document.querySelector("#price");
  euro.textContent = price;
}

//injecte la description du produit
function makeDescription(description) {
  const descriptionProduct = document.querySelector("#description");
  descriptionProduct.textContent = description;
}

//création des options de choix de couleurs pour chaque couleur disponible
function makeColors(colors) {
  const colorSelect = document.querySelector("#colors");
  if (colorSelect != null) {
    colors.forEach((color) => {
      const choice = document.createElement("option");
      choice.value = color;
      choice.textContent = color;
      colorSelect.appendChild(choice);
    });
  }
}
