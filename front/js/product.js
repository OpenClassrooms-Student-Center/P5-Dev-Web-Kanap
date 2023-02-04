// (expliquer chaque ligne)
//Recuperation de la chaince de requête (/product.html?id=107fb5b75607497b96722bda5b504926)
const queryString = window.location.search;
//Analyse de la chaine de requête 
const urlParams = new URLSearchParams(queryString)
//Appel de la methode sur le resultat (id)
const productId = urlParams.get ("id")

// On demande a l'API de nous retourner  les donnés du produits.
fetch (`http://localhost:3000/api/products/${productId}`)
.then((resp)=>{
    //si la reponse est ok
    if(resp.ok){
        //alors on veut une reponse en json
        return resp.json();
    }
})


.then((product)=>{
    //On rend le produit HTML
   renderProduct(product);
    //On detecte le clic sur le bouton addToCart puis on appelle la fonction d'ajout au panier
   document
    .getElementById('addToCart')
    .addEventListener("click", function() {
        addCart(product._id)
    });
})

//TODO: FAIRE LE CATCH ERROR

//on crée un message d'erreur lorsque l'API ne nous retourne pas d'infos.
.catch((error)=>{
  document.getElementById('addToCart').innerHTML = `Une erreur est surevenue (${error})`
});

//FONCTION POUR RENDRE LE PRODUIT SUR LA PAGE PRODUIT
function renderProduct(product) {
// Rendu de l'image
document.querySelector('.item__img').innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}">`
// Rendu du titre
document.getElementById('title').innerText = product.name
// Rendu de la description
document.getElementById('description').innerText = product.description
// Pour chaque couleur, on rend une option
product.colors.forEach((color) => {
    document.getElementById(
      "colors"
    ).innerHTML += `<option value="${color}">${color}</option>`;
  });
 }

//FONCTION QUI PERMET D'AJOUTER UN PRODUIT ET SES OPTION "couleur et nombre" AU PANIER
function addCart(productId) {
    //On récupère le contenu du panier en localStorage
    let cart = getCart();
  
    //On récupère les valeurs des champs du formulaire
    const color = document.getElementById("colors").value;
    const quantity = document.getElementById("quantity").value;
  
    //On vérifie que la quantité est valide
    if (quantity < 1 || quantity > 100) {
      alert("La quantité doit être située entre 1 et 100");
      return;
    }

    //TODO: VERIFIER QU'UNE COULEUR A ETAIT CHOISIE

    //On vérifié qu'une couleur a bien étais choisie
    if (!color) {
      //créer une aletre si la couleur n'as pas étais choisie
      alert("Une couleur doit être séléctionnée");
      return
    }
  
    //On vérifie s'il existe déjà un produit avec le meme id et la meme couleur
    let foundProduct = cart.find(
      (p) => p._id === productId && p.color === color
    );
  
    //Si le produit est trouvé alors on met seulement à jour la quantité
    if (foundProduct != undefined) {
      foundProduct.quantity += parseInt(quantity);
    } else {
      //Sinon on fomatte le produit pour n'avoir que les données necessaires
      const formattedProduct = {
        _id: productId,
        color: color,
        quantity: parseInt(quantity),
      };
  
      //On ajoute ce produit formaté au panier
      cart.push(formattedProduct); //produit formater
    }
  
    //On met à jour le localStorage
    saveCart(cart);
  }

  // FONCTION QUI PERMET DE RECUPERER LA VALEUR DU PANIER
function getCart() {
  //On récupère la valeur "cart" du localStorage
  let cart = localStorage.getItem("cart");
  //Si elle n'existe pas on renvoit un tableau vide
  if (cart == null){
      return [];
  } else {
      //Sinon on renvoi sa valeur parsée
      return JSON.parse(cart);
  }
}

 // FONCTION POUR AJOUTER LE PANIER AU LOCAL STORAGE
 function saveCart(cart) {
  //Ajout du panier au localStorage
  localStorage.setItem("cart", JSON.stringify(cart));
}