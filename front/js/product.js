// Récupération des paramètres avec l'URL

const url = new URL(window.location.href);
const idArticle= url.searchParams.get("id");
console.log(idArticle);

// Fonction requête GET récupération des données de l'article avec l'id

const requestArticle = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/products/" + idArticle);
    if (res.ok) {
      console.log("Les données de l'article ont été récupérées");
      return res.json();
    } else {
      console.error("Retour du serveur :", res.status);
    }
  } catch (e) {
    console.log(e);
  }
};

requestArticle();

// Fonction traitement des données de l'article avec l'id

const treatmentArticle = async () => {
  let resultArticle = await requestArticle().then((product) => {

    // Insertion de l'élément "img" et de l'image

    const articleImg = document.querySelector(".item__img");
    const elementImg = document.createElement("img");
    articleImg.appendChild(elementImg);
    elementImg.setAttribute("src", product.imageUrl);
    elementImg.setAttribute("alt", product.altTxt);

    // Insertion du titre

    const articleTitle = document.querySelector("#title");
    articleTitle.innerHTML = product.name;

    // Insertion du prix

    const articlePrice = document.querySelector("#price");
    articlePrice.innerHTML = product.price;

    // Insertion de la description

    const articleDescription = document.querySelector("#description");
    articleDescription.innerHTML = product.description;
  });
  console.log("Les données de l'article ont été traitées");
};

treatmentArticle();

// Fonction traitement des couleurs

const treatmentColors = async () => {
  let resultColor = await requestArticle().then((product) => {
    for (let i = 0; i < product.colors.length; i++) {
      const articleColors = document.querySelector("#colors");
      const choiceColors = document.createElement("option");
      choiceColors.setAttribute("value", product.colors[i]);
      choiceColors.innerHTML = product.colors[i];
      articleColors.appendChild(choiceColors);
    }
  });
  console.log("Les couleurs ont été traitées");
};

treatmentColors();
