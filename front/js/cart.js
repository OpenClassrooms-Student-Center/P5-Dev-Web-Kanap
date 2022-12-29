const cartArray = Object.entries(localStorage);
//récupère les données de localStorage
const cartContent = JSON.parse(localStorage.getItem("cart")) || [];
// transforme le panier JSON en objet

const cartItems = document.getElementById("cart__items");
// pointe vers #cart__items

let totalItemPrice = 0; // prix total par article
let sumOfQuantities = 0; // quantité totale d'articles
let totalCartPrice = 0; // somme des prix totaux de tous les articles


const displayCartItems = (cartItem) => {
  //affiche un article
  
  const cartArticle = document.createElement("article");
  cartArticle.classList.add("cart__item");
  let cartItemId = cartItem.id;
  cartArticle.dataset.id = cartItemId;
  cartArticle.dataset.color = cartItem.color;
  cartItems.appendChild(cartArticle);
  // article créé avec ses attributs
  
  const cartItemImg = document.createElement("div");
  cartItemImg.classList.add("cart__item__img");
  cartArticle.appendChild(cartItemImg);
  // div img créée avec sa classe
  
  const itemImg = document.createElement("img");
  itemImg.setAttribute("src", cartItem.imageUrl);
  itemImg.setAttribute("alt", cartItem.altTxt);
  cartItemImg.appendChild(itemImg);
  // img créé avec ses attributs
  
  const cartItemContent = document.createElement("div");
  cartItemContent.classList.add("cart__item__content");
  cartArticle.appendChild(cartItemContent);
  //div content créée avec sa classe
  
  const cartItemDescription = document.createElement("div");
  cartItemDescription.classList.add("cart__item__content__description");
  cartItemContent.appendChild(cartItemDescription);
  //div description créée avec sa classe
  
  const cartItemName = document.createElement("h2");
  cartItemName.textContent = cartItem.name;
  cartItemDescription.appendChild(cartItemName);
  // h2 name créé
  
  const cartItemColor = document.createElement("p");
  cartItemColor.textContent = cartItem.color;
  cartItemDescription.appendChild(cartItemColor);
  // p color créé
  
  const cartItemPrice = document.createElement("p");
  const cartItemPriceValue = Number(cartItem.price);
  cartItemPrice.textContent = cartItemPriceValue + "€";
  cartItemDescription.appendChild(cartItemPrice);
  //p price créé
  
  const cartItemSettings = document.createElement("div");
  cartItemSettings.classList.add("cart__item__content__settings");
  cartItemContent.appendChild(cartItemSettings);
  //div settings créée avec sa classe
  
  const cartItemSettingsQuantity = document.createElement("div");
  cartItemSettingsQuantity.classList.add(
    "cart__item__content__settings__quantity"
    );
    cartItemSettings.appendChild(cartItemSettingsQuantity);
    // div quantity créée avec sa classe
    
    const cartItemQuantity = document.createElement("p");
    cartItemQuantity.textContent = "Qté : ";
    cartItemSettingsQuantity.appendChild(cartItemQuantity);
    // p quantity créé
    
    
    const itemQuantityInput = document.createElement("input");
    itemQuantityInput.type = "number";
    itemQuantityInput.classList.add("itemQuantity");
    itemQuantityInput.name = "itemQuantity";
    itemQuantityInput.min = "1";
    itemQuantityInput.max = "100";
    itemQuantityInput.value = cartItem.quantity;
    let itemQuantityInputValue = Number(cartItem.quantity);
    cartItemSettingsQuantity.appendChild(itemQuantityInput);
    // input quantity créé avec ses attributs
    







    const newItemQuantityInput = document.getElementsByClassName("itemQuantity").value; // pointe vers la valeur qu'on veut updater
    const cartItemColorText = cartItemColor.innerHTML;
    
    let newQuantityInput = itemQuantityInputValue;

    itemQuantityInput.addEventListener("change", () => {
      // écoute le change de l'input
      
      const updateItemQuantityAndTotal = (cartItemId, cartItemColorText) => {
        
        const cartItemToUpdate = cartContent.find((cartItem) => cartItemId === cartItem.id && cartItemColorText === cartItem.color); // trouve l'article à updater dans le cartContent
        
        const updatedCartItem = {
            id: cartItemId,
            color: cartItemColor,
            quantity: cartItemQuantity,
            price: cartItemPriceValue
          }
          // récupère l'id, la couleur, la quantité initiale et le prix de l'article dans le cart content
          console.log(updatedCartItem); // renvoie rien du tout (????)

        // récupère la nouvelle quantité de l'input

        // remplace par la nouvelle quantité dans le cartContent

        // calcul le nouveau total prix par article (newValue * price)

        // calcul le nouveau total du panier (somme des nouveaux totaux prix)

        // remplace l'ancien total par le nouveau
      }; 
      console.log(cartItemId); 
      console.log(cartItemColorText);
      console.log(itemQuantityInput.value);
    }
    )
  





  const cartItemSettingsDelete = document.createElement("div");
  cartItemSettingsDelete.classList.add("cart__item__content__settings__delete");
  cartItemSettings.appendChild(cartItemSettingsDelete);
  // div delete créée avec sa classe

  const cartItemDelete = document.createElement("p");
  cartItemDelete.classList.add("deleteItem");
  cartItemDelete.textContent = "Supprimer";
  cartItemSettingsDelete.appendChild(cartItemDelete);
  // p delete créé avec son content
  
  sumOfQuantities += itemQuantityInputValue;
  // addition des input quantity pour obtenir nombre total d'articles dans le panier
  totalItemPrice = cartItemPriceValue * itemQuantityInputValue;
  // produit de price par quantity pour obtenir le prix total pour un article
  totalCartPrice += totalItemPrice++;
  // addition des prix totaux de tous les articles du panier

};
  cartContent.forEach(displayCartItems);
  // exécute displayCartItem pour chaque article du panier

const totalQuantity = document.getElementById("totalQuantity");
// pointe vers #totalQuantity
totalQuantity.textContent = sumOfQuantities;
// insère le résultat de sumOfQuantities dans #totalQuantity

const totalPrice = document.getElementById("totalPrice");
// pointe vers #totalPrice
totalPrice.textContent = totalCartPrice;
// insère le résultat de totalCartPrice dans #totalPrice
