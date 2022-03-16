//permet de récupérer l'id d'un produit avec searchparams
let params = new URL(document.location).searchParams;
console.log(params);
let productId = params.get("id");
console.log(productId);

//permet de récupérer chaque objet depuis l'api
fetch(`http://localhost:3000/api/products/${productId}`)
  .then((response) => response.json())
  .then((product) => {
    console.log(product);
    document.getElementById("title").textContent = product.name;
    document.getElementById("price").textContent = product.price;
    document.getElementById("description").textContent = product.description;

    document.getElementsByClassName("item__img"); // a revoir
    let productImage = document.createElement("img");
    productImage.src = product.imageUrl;
    productImage.alt = product.altTxt;

    //pour les couleurs - créer les options value
    let optionsColors = product.colors;
    let colors = document.getElementById("colors");
    optionsColors.forEach(function (element, key) {
      console.log(element, key);
      colors[key] = new Option(element);
    });
  });
  
// AJOUTER UNE FONCTION ONCLICK SUR LE BTN PANIER