const itemsSection = document.getElementById("cart__items");
let items = JSON.parse(localStorage.getItem("cartItems")) || [];

function calculateTotal() {
    let totalQuantity = 0;
    let totalPrice = 0;
  
    for (const item of items) { // Parcours de tous les articles dans le panier
        totalQuantity += item.quantity; // Ajout de la quantité de chaque article à la quantité totale
        totalPrice += item.quantity * item.price; // Calcul du prix total en multipliant la quantité par le prix de chaque article
      }
    
  
    const totalQuantityElement = document.getElementById("totalQuantity");
    totalQuantityElement.innerText = totalQuantity;
  
    const totalPriceElement = document.getElementById("totalPrice");
    totalPriceElement.innerText = totalPrice.toFixed(2);
  }

function removeItem(itemId, itemColor) {
  items = items.filter(
    (item) => item.id !== itemId || item.color !== itemColor
  );
  localStorage.setItem("cartItems", JSON.stringify(items));
  calculateTotal();
}

function createCartItemElement(item, kanap) {
  item.price = kanap.price;
  item.name = kanap.name;
  const cartItem = document.createElement("article");
  cartItem.classList.add("cart__item");
  cartItem.dataset.id = item.id;
  cartItem.dataset.color = item.color;

  const cartItemImage = document.createElement("div");
  cartItemImage.classList.add("cart__item__img");
  const image = document.createElement("img");
  image.src = kanap.imageUrl;
  image.alt = kanap.altTxt;
  cartItemImage.appendChild(image);
  cartItem.appendChild(cartItemImage);

  const cartItemContent = document.createElement("div");
  cartItemContent.classList.add("cart__item__content");

  const cartItemDescription = document.createElement("div");
  cartItemDescription.classList.add("cart__item__content__description");
  const productName = document.createElement("h2");
  productName.innerText = kanap.name;
  const productColor = document.createElement("p");
  productColor.innerText = item.color;
  const productPrice = document.createElement("p");
  productPrice.innerText = kanap.price + " €";
  cartItemDescription.appendChild(productName);
  cartItemDescription.appendChild(productColor);
  cartItemDescription.appendChild(productPrice);
  cartItemContent.appendChild(cartItemDescription);

  const cartItemSettings = document.createElement("div");
  cartItemSettings.classList.add("cart__item__content__settings");

  const cartItemQuantity = document.createElement("div");
  cartItemQuantity.classList.add("cart__item__content__settings__quantity");
  const quantityLabel = document.createElement("p");
  quantityLabel.innerText = "Qté : ";
  const quantityInput = document.createElement("input");
  quantityInput.type = "number";
  quantityInput.classList.add("itemQuantity");
  quantityInput.name = "itemQuantity";
  quantityInput.min = "1";
  quantityInput.max = "100";
  quantityInput.value = item.quantity;
  cartItemQuantity.appendChild(quantityLabel);
  cartItemQuantity.appendChild(quantityInput);
  cartItemSettings.appendChild(cartItemQuantity);

  const cartItemDelete = document.createElement("div");
  cartItemDelete.classList.add("cart__item__content__settings__delete");
  const deleteItemText = document.createElement("p");
  deleteItemText.classList.add("deleteItem");
  deleteItemText.innerText = "Supprimer";
  cartItemDelete.appendChild(deleteItemText);
  cartItemSettings.appendChild(cartItemDelete);

  cartItemContent.appendChild(cartItemSettings);
  cartItem.appendChild(cartItemContent);

  deleteItemText.addEventListener("click", () => {
    alert("Ce Kanap a été supprimer du panier : " + item.name)
    removeItem(item.id, item.color); // supprime l'élément du localstorage
    cartItem.remove(); // supprime l'élément du DOM
    
  });

  quantityInput.addEventListener("change", (event) => {
    const newQuantity = parseInt(event.target.value);
    const updatedItem = items.find(
      (i) => i.id === item.id && i.color === item.color
    );
    if (updatedItem) {
      updatedItem.quantity = newQuantity;
      item.quantity = newQuantity;
      calculateTotal();
      localStorage.setItem("cartItems", JSON.stringify(items));
    }
  });

  return cartItem;
}

function fetchProductData(item) {
  fetch(`http://localhost:3000/api/products/${item.id}`)
    .then((response) => response.json())
    .then((kanap) => {
      const cartItemElement = createCartItemElement(item, kanap);
      itemsSection.appendChild(cartItemElement);
      calculateTotal();
    })
    .catch((error) => {
      alert("An error occurred while fetching product data:", error);
    });
}

for (const item of items) {
  fetchProductData(item);

}
