const numberOfItems = localStorage.length;
const cartArray = [];

const retrieveItems = () => {
   for (let i = 0; i < numberOfItems; i++) {
      const itemsInCart = localStorage.getItem(localStorage.key(i));
      const objectInCart = JSON.parse(itemsInCart);
      cartArray.push(objectInCart);
      
      //<article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
      //    <div class="cart__item__img">
    //       <img src="../images/product01.jpg" alt="Photographie d'un canapé">
    //    </div>
    //    <div class="cart__item__content">
    //       <div class="cart__item__content__description">
    //          <h2>Nom du produit</h2>
    //          <p>Vert</p>
    //          <p>42,00 €</p>
    //       </div>
    //    <div class="cart__item__content__settings">
    //       <div class="cart__item__content__settings__quantity">
    //          <p>Qté : </p>
    //          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
    //       </div>
    //       <div class="cart__item__content__settings__delete">
    //          <p class="deleteItem">Supprimer</p>
    //       </div>
    //       </div>
    //    </div>
    //</article>
   }
   console.log(cartArray);
   
     const displayItems = (itemsInCart) => {
          itemsInCart.forEach((itemInCart) => displayItem(itemInCart));
  };
  console.log(displayItems);

//   const displayItem = (itemInCart) => {
//     const cartItem = document.getElementById("cart__items");
//     const article = document.createElement("article");
//     cartItem.appendChild(article);
   //  article.setAttribute("class", "cart__item");
   //  article.setAttribute("data-id", itemId);
// };
};
