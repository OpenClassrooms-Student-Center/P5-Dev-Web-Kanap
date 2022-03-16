//la fonction permet de changer l'objet en chaine de caractère
function saveKanap(kanap) {
  localStorage.setItem("kanap", JSON.stringify(kanap));
}

// La fonction permet de récupérer le produit en objet
function getKanap() {
  let kanap = localStorage.getItem("kanap");
  if (kanap == null) {
    return [];
  } else {
    return JSON.parse(kanap);
  }
}

// la fonction permet d'ajouter un produit dans le panier + gestion des quantités
function addKanap(product) {
  let kanap = getKanap();
  let foundProduct = kanap.find((p) => p.id == product.id);
  if (foundProduct != undefined) {
    foundProduct.quantity++;
  } else {
    product.quantity = 1;
    kanap.push(product);
  }
  saveKanap(kanap);
}
