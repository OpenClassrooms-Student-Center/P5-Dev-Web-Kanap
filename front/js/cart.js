const cart = [];
cart.forEach((item) => treatmentDataCart(item));

treatmentDataLocalStorage();

// Fonction récupération des données des produits du localstorage

function treatmentDataLocalStorage() {
  const item = JSON.parse(localStorage.getItem("cart"));
  cart.push(item);
}