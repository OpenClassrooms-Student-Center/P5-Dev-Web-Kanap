const tableauRecapitulatif = [];
const article = {
  referenceProduit: null,
  couleurProduit: null,
  quantiteProduit: null,
  prix: null,
};
const select = document.getElementById("colors");
const quantite = document.getElementById("quantity");
const bouton = document.getElementById("addToCart");

let complementUrl = new URLSearchParams(window.location.search);
article.referenceProduit = complementUrl.get("id");

fetch(`http://localhost:3000/api/products/${article.referenceProduit}`)
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function (datas) {
    const image = document.querySelector(".item__img");
    image.innerHTML = `<img src="${datas.imageUrl}" alt="${datas.altTxt}">`;
    // console.log("Ajout de la photo " + datas.imageUrl);
    // console.log("Ajout du text Alternatif : " + datas.altTxt);

    const titre = document.getElementById("title");
    titre.innerHTML = `${datas.name}`;
    // console.log("Ajout du nom de l'article " + datas.name);

    const prix = document.getElementById("price");
    prix.innerHTML = `${datas.price}`;
    // console.log("Ajout du prix : " + datas.price);

    const description = document.getElementById("description");
    description.innerHTML = `${datas.description}`;
    // console.log("Ajout de la description : " + datas.description);

    // console.log("Pour chaque couleur, je la rajoute dans le secteur");
    for (let i = 0; i < datas.colors.length; i++) {
      // console.log("Ajout dans le select de la couleur : ");
      // console.log(datas.colors[i]);
      let option = document.createElement("option");
      option.innerHTML = `<option value=${datas.colors[i]}>${datas.colors[i]}</option>`;
      select.appendChild(option);
    }
  })
  .catch(function (err) {
    window.alert("Serveur déconnecté");
  });

article.prix = document.getElementById("price").textContent;

select.addEventListener("change", (event) => {
  document.querySelector(".result");
  article.couleurProduit = event.target.value;
  //   console.log(couleur);
});
// // ...
// // Je recupère la quantité choisie
// // ...
quantite.addEventListener("change", (event) => {
  document.querySelector(".result");
  article.quantiteProduit = event.target.value;
  //   console.log(nbrArticle);
});

function controleCouleurQuantite() {
  if (
    article.couleurProduit === null ||
    article.quantiteProduit === null ||
    article.quantiteProduit < 1 ||
    article.quantiteProduit > 100
  ) {
    alert(
      "Merci de selectionner une couleur et une quantité adaptée (entre 1 et 100)"
    );
    const alerte = true;
    return alerte;
  } else {
    const alerte = false;
    return alerte;
  }
}

function convertionStringEnvoi() {
  // Je converti le tableau récapitulitif au format JSON
  tableauString = JSON.stringify(tableauRecapitulatif);
  // Je stocke le tableau dans le navigateur
  localStorage.setItem("Panier", tableauString);
}

function recuperationConvertionParse(params) {
  // Je recupère le panier qui est dans le navigateur
  const objNavigateur = localStorage.getItem("Panier");
  // Je parse l'objet du navigateur
  const tableauParse = JSON.parse(objNavigateur);
  return tableauParse;
}

// // ...
// // J'écoute le bouton et je stocke dans localStorage
bouton.addEventListener("click", () => {
  // Je controle la couleur et la quantite
  const controle = controleCouleurQuantite();
  article.prix = document.getElementById("price").textContent;
  // Je vérifie si il y a eu une erreur lors du controle
  if (controle == false) {
    const controleNavigateur = localStorage.getItem("Panier");
    // Je vérifie si le navigateur contient déjà un panier
    if (controleNavigateur == null) {
      // Je mets le choix de l'utilisateur en premier dans le tableau Recapitulatif
      tableauRecapitulatif.unshift(article);
      convertionStringEnvoi();
    } else {
      // Je recupère le panier qui est dans le navigateur
      const tableauParse = recuperationConvertionParse();
      console.log(tableauParse);
      // Je vérifie si le contenu du navigateur contient plus de 1 élement.
      if (tableauParse.length == 1) {
        // Je vérifie que l'objet du navigateur de soit pas le même
        console.log(tableauParse[0].referenceProduit);
        if (
          tableauParse[0].referenceProduit + tableauParse[0].couleurProduit ==
          article.referenceProduit + article.couleurProduit
        ) {
          console.log("!!! Il a la meme ref et la même couleur");
          console.log("tableau recap ref:", tableauParse[0].referenceProduit);
          console.log("tableau recap couleur:", tableauParse[0].couleurProduit);
          console.log(
            "tableau recap quantite:",
            tableauParse[0].quantiteProduit
          );
          console.log("article couleur:", article.couleurProduit);
          console.log("article ref:", article.referenceProduit);
          console.log("article quantite:", article.quantiteProduit);

          const additionQuantite =
            parseInt(tableauParse[0].quantiteProduit, 10) +
            parseInt(article.quantiteProduit, 10);
          article.quantiteProduit = additionQuantite;
          console.log("article quantite:", article.quantiteProduit);
          console.log("tableau recap:", tableauRecapitulatif);

          // Je mets l'article dans le panier récapitulatif
          tableauRecapitulatif.unshift(article);
          console.log("tableau recap:", tableauRecapitulatif);
          // Je converti le tableau recapitulatif et je le stocke dans le navigateur
          console.log(tableauRecapitulatif);
          // convertionStringEnvoi();
        } else {
          // Je mets le l'objet recuperer du navigateur dans le tableau recapitulatif
          tableauRecapitulatif.push(tableauParse[0]);
          console.log(
            "Tableau contenant le tableau parse",
            tableauRecapitulatif
          );
          // Je mets l'article dans le panier récapitulatif
          tableauRecapitulatif.unshift(article);
          console.log(
            "tableaui contenant tab parse + article",
            tableauRecapitulatif
          );
        }
        // Je converti le tableau recapitulatif et je le stocke dans le navigateur
        convertionStringEnvoi();
        // Le contenu du navigateur contient plusieurs élément donc je boucle dessus
      } else {
        for (let index = 0; index < tableauParse.length; index++) {
          const element = tableauParse[index];
          console.log("contenu de l'élément", element.quantiteProduit);
          // Je vérifie que l'élément venant du navigateur ne soit pas la même référence et la même couleur que l'article

          if (
            element.referenceProduit + element.couleurProduit ==
            article.referenceProduit + article.couleurProduit
          ) {
            const additionQuantite =
              parseInt(element.quantiteProduit, 10) +
              parseInt(article.quantiteProduit, 10);
            article.quantiteProduit = additionQuantite;
          } else {
            tableauRecapitulatif.push(element);
          }
        }
        // Je mets l'article dans le panier récapitulatif
        tableauRecapitulatif.unshift(article);
        convertionStringEnvoi();
      }
    }
    alert("L'article a bien été ajouter au panier");
    location.reload();
  }
});
