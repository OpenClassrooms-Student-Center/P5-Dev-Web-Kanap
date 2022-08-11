// Fonction requête GET récupération des données de l'API

const requestProducts = async () => {
  try {
    let res = await fetch("http://localhost:3000/api/products");
    if (res.ok) {
      console.log("Les données ont été récupérées");
      return res.json();
    } else {
      console.error("Retour du serveur :", res.status);
    }
  } catch (e) {
    console.log(e);
  }
};

// Appelle fonction requête GET

requestProducts();

// Fonction traitement des données de l'API

const treatmentProducts = async (res, e) => {
  try {
    let resultProducts = await requestProducts().then((product) => {
      for (let i = 0; i < product.length; i++) {
        
        // Insertion de l'élément "a"
        const productBeacon = document.createElement("a");
        document.querySelector(".items").appendChild(productBeacon);
        productBeacon.href = "product.html?id=${product[i]._id}";

        // Insertion de l'élément "article"
        const productArticle = document.createElement("article");
        productBeacon.appendChild(productArticle);

        // Insertion de l'élément "img" et des images
        const productImg = document.createElement("img");
        productArticle.appendChild(productImg);
        productImg.src = product[i].imageUrl;
        productImg.alt = product[i].altTxt;

        // Insertion de l'élément "h3" et des noms
        const productName = document.createElement("h3");
        productArticle.appendChild(productName);
        productName.classList.add("productName");
        productName.innerHTML = product[i].name;

        // Insertion de l'élément "p" et des descriptions
        const productDescription = document.createElement("p");
        productArticle.appendChild(productDescription);
        productDescription.classList.add("productDescription");
        productDescription.innerHTML = product[i].description;
      }
      console.log("Les données ont été traitées");
    });
  } catch (e) {
    console.log("Les données n'ont pas été traitées");
  }
};

// Appelle de la fonction de traitement des données
treatmentProducts();
