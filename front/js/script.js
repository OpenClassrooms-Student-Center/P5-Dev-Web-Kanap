// 1 -- Récupérer les données de l'API et les stocker dans une variable
const section = document.getElementById("items"); //on cible la section
// 2 -- On récupère les données avec Fetch
fetch("http://localhost:3000/api/products")
  .then((response) => response.json())
  .then((products) => {
    for (let i = 0; i < products.length; i++) {
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
    console.table(products);
  });
