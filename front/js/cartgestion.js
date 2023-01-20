//Appel de l'API
fetch (`http://localhost:3000/api/products/`)
.then((resp)=>{
    if(resp.ok){
        return resp.json();
    }
})
//Fonction pour sauvegarder le panier dans le local storage
function saveCart(cart) {
      localStorage.setItem("cart", JSON.stringify(cart));
  }
//Fonction qui permet de créer le placement du produit dans le local storage et de nous retourner un tableau vide s'il n'y a rien
function getCart() {
      let cart = localStorage.getItem('cart');
      if (cart == null){
          return [];
      } else {
          return JSON.parse(cart);
      }
  }
//Fonction qui permet d'ajouter un produit au local storage
function addCart(product) {
      let cart = getCart();
      let foundProduct = cart.find(p => p.id == product.id);
      if(foundProduct != undefined){
        foundProduct.quantity++;
      }else{
        product.quantity = 1;
        cart.push(product);
      }
      saveCart(cart);
  }
//Fonction qui permet de supprimer un produit et toute sa quantité du local storage
  function removeFromCart(product) {
    let cart = getCart();
    cart = cart.filter(p => p.id != product.id);
    saveCart(cart);
  }
//Fonction qui permet d'ajouter ou supprimer plus ou moins de quantité sur un produit
  function changeQuantity(product, quantity) {
    let cart = getCart();
    let foundProduct = cart.find(p => p.id == product.id);
    if (foundProduct != undefined); {
        foundProduct.quantity += quantity;
        //Cela appelle aussi la fonction du dessus lorsqu'un item passe à 0 ou en dessous afin de supprimer le produit du local storage
        if (foundProduct.quanity <= 0) {
            removeFromCart(foundProduct);
        }else{
            saveCart(cart);
        }
      }
  }
//Fonction qui nous permet d'ajouter tous les produits du panier afin de faire un total
  function getNumberProduct() {
    let cart = getCart();
    let number = 0;
    for (let product of cart){
        number += product.quantity;
    }
    return number
  }
//Fonction qui permet d'avoir le prix total du panier
  function getTotalPrice() {
    let cart = getCart();
    let total = 0;
    //multiplication du nombre d'objet par le prix
    for (let product of cart) {
        total += product.quantity * product.price;
    }
    return total;
  }

//Permet d'utiliser le bouton "ajouter au panier" et d'ajouter 1 produit dans le loacal storage
  document.getElementById('addToCart').addEventListener('click',function (e){
    addCart(`${productId}`)
  })