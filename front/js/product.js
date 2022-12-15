fetch("http://localhost:3000/api/products") // Requête pour récupérer les json dans Product.js
  .then(res => res.json())
  .then(json => product(json));

const product = () => {

const itemImg = document.getElementsByClassName("item__img");

const img = document.createElement("img");
img.setAttribute("src", "?id="+ new URL(location.href).searchParams.get("id"));
img.setAttribute("alt", product.altText);
console.log(img);
itemImg.append(img);


// new URL(location.href).searchParams.get("id");
};