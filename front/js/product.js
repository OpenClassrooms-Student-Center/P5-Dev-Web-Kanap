// 1 --- Affichage des éléments de la page produit
//récupère l'id d'un produit avec searchparams
let params = new URL(document.location).searchParams;
console.log(params);
let productId = params.get("id");
console.log(productId);

//récupère chaque produit depuis l'api
fetch(`http://localhost:3000/api/products/${productId}`)
  .then((response) => response.json())
  .then((product) => {
    console.log(product);
    // on récupère les infos du produit
    document.getElementById("title").textContent = product.name;
    document.getElementById("price").textContent = product.price;
    document.getElementById("description").textContent = product.description;
    // l'image
    let itemImg = document.querySelector(".item__img");
    let image = document.createElement("img");
    image.src = product.imageUrl;
    image.alt = product.altTxt;
    itemImg.append(image);
    console.log(product);
    // les couleurs
    // première ligne de selection
    let selectOption = document.querySelector("select");
    console.log(selectOption);
    for (i = 0; i < product.colors.length; i++) {
      let option = document.createElement("option");
      option.setAttribute("value", product.colors[i]);
      option.textContent = product.colors[i];
      selectOption.append(option);
    }
  });

//2 --- Gestion du bouton panier
let add = document.getElementById("addToCart");
add.addEventListener("click", function () {
  // verif qu'il y a une couleur et qté valable
  let colorValue = document.getElementById("colors").value;
  if (colorValue == "") {
    return alert("Veuillez choisir une couleur");
  }
  let quantityValue = parseInt(document.getElementById("quantity").value);
  if (quantityValue < 1 || quantityValue > 100) {
    return alert("Veuillez choisir une quantité entre 1 et 100");
  }
  let article = {
    id: productId,
    color: colorValue,
    quantity: quantityValue,
  };
  //verif s'il y a un produit dans le panier, si non, on crée le tableau,
  let getPanier = localStorage.getItem("panier");
  // si le panier n'a pas été crée
  if (getPanier == null) {
    //on crée le tableau et on ajoute le premier produit
    let panier = [];
    panier.push(article);
    localStorage.setItem("panier", JSON.stringify(panier));
  } else {
    // si le panier est déja existant
    let storage = JSON.parse(getPanier);
    // on cherche un produit avec mm couleur & id
    let foundProduct = storage.find(
      (p) => p.id == article.id && p.color == article.color
    );
    if (foundProduct != undefined) {
      // si on trouve un produit idtq on met a jour la qté
      foundProduct.quantity += article.quantity;
      localStorage.setItem("panier", JSON.stringify(storage));
    } else {
      //sinon on ajoute un nouveau produit
      storage.push(article);
      localStorage.setItem("panier", JSON.stringify(storage));
    }
  }
  function ajoutArticle() {
    add.innerHTML = "Ajouter au panier";
  }
  add.innerHTML = "Article ajouté au panier ! ";
  setTimeout(ajoutArticle, 2000);
});
