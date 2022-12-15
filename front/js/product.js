const itemId = new URL(location.href).searchParams.get("id");
// console.log(itemId);

fetch("http://localhost:3000/api/products/" + itemId) // Requête pour récupérer les json dans Product.js
  .then((res) => res.json())
  .then((json) => displayProduct(json));

const displayProduct = (product) => {
  
  console.log(product);

  const img = document.createElement("img");
  img.setAttribute("src", product.imageUrl);
  img.setAttribute("alt", product.altTxt);

  const itemImg = document.querySelector(".item__img");
  itemImg.append(img);

  const itemTitle = document.getElementById("title");
  itemTitle.textContent = product.name;

  const itemPrice = document.getElementById("price");
  itemPrice.textContent = product.price;

  const itemDescription = document.getElementById("description");
  itemDescription.textContent = product.description;
  
  const itemColors = document.getElementById("colors");

  const arrayColors = product.colors;
    for (let i = 0; i< arrayColors.length; i++) {
    const option = document.createElement("option");
    option.textContent = arrayColors[i];
    itemColors.appendChild(option);
    console.log(option);
  }

  
};
