// 1 -- Récupérer les données de l'API et les stocker dans une variable

// on crée la variable products
let products = [];
// on récupère les données avec Fetch
async function getApi() {
  await fetch("http://localhost:3000/api/products")
    .then((response) => response.json())
    .then((promise) => (products = promise));
  console.table(products);
}

//2 -- Nous allons créer un modèle HTML pour les différentes cartes produits, elles devront être mises dans une fonction qui sera appelé pour chaque produit de l'api

async function showArticle() {
  await getApi();
  let section = document.getElementById("items"); //on cible la section

  for (i = 0; i < products.length; i++) {
    // on crée le lien, élément enfant de la section
    let lien = document.createElement("a");
    lien.href = `./product.html?id=${products[i]._id}`;
    section.append(lien);
    // on crée l'article, élément enfant du lien
    let article = document.createElement("article");
    lien.append(article);
    // création des éléments enfants de l'article
    // image
    let productImage = document.createElement("img");
    productImage.src = products[i].imageUrl;
    productImage.alt = products[i].altTxt;
    article.append(productImage);
    //nom
    let productNameH3 = document.createElement("h3");
    productNameH3.classList.add("productName");
    productNameH3.textContent = products[i].name;
    article.append(productNameH3);
    //description
    let productDescriptionP = document.createElement("p");
    productDescriptionP.classList.add("productDescription");
    productDescriptionP.textContent = products[i].description;
    article.append(productDescriptionP);
  }
}
showArticle();
