// Cette fonction fetch doit récupérer les données de l'API et les stocker dans une variable products
function getApi() {
  fetch("http://localhost:3000/api/products")
    .then((response) => response.json())
    .then((data) => console.table(data));
}
let products = getApi();

console.table(getApi());

// Nous allons créer un modèle HTML pour les différentes cartes produits, elles devront être mises dans une fonction qui sera appelé pour chaque produit de l'api

// on crée le lien, élément enfant de la section
const section = document.getElementById("items"); //on cible la section
let a = document.createElement("a");
section.append(a);
// on crée l'article, élément enfant du lien
let article = document.createElement("article");
a.append(article);
// création des éléments enfants de article
let productImage = document.createElement("img");
article.append(productImage);
let productNameH3 = document.createElement("h3");
article.append(productNameH3);
let productDescriptionP = document.createElement("p");
article.append(productDescriptionP);
