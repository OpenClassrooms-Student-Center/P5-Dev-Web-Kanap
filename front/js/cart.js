
let formattedProduct = localStorage.getItem("cart");
alert (formattedProduct)


fetch ('http://localhost:3000/api/products/')
then((resp)=>{
    if(resp.ok){
        return resp.json();
    }
})



then((formattedProduct)=>{
    let html = '';
    products.forEach(formattedProduct => {
        html += `
        <!--  <article class="cart__item" data-id="${product._id}" data-color="${product.color}">
        <div class="cart__item__img">
          <img src="${product.imageUrl}" alt="${product.altTxt}">
        </div>
        <div class="cart__item__content">
          <div class="cart__item__content__description">
            <h2>${product.name}</h2>
            <p>${product.color}</p>
            <p>${product.price}</p>
          </div>
          <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
              <p>Qté : </p>
              <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
            </div>
            <div class="cart__item__content__settings__delete">
              <p class="deleteItem">Supprimer</p>
            </div>
          </div>
        </div>
      </article> -->`
    });
    //Ensuite on appelle le parent du code qui a un id 'items' afin que le code soit écrit au bon endroit.
    const parentItems = document.getElementById('cart__items');
    //On explique que le parents est du code HTML (qu'est ce que le inner.html)
    parentItems.innerHTML = html
})












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
