// FONCTION QUI PERMET DE RECUPERER LA VALEUR DU PANIER
function getCart() {
    //On récupère la valeur "cart" du localStorage
    let cart = localStorage.getItem("cart");
    //Si elle n'existe pas on renvoit un tableau vide
    if (cart == null) {
      return [];
    } else {
      //Sinon on renvoi sa valeur parsée
      return JSON.parse(cart);
    }
  }

  export {getCart}