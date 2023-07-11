const itemsSection = document.getElementById("cart__items");
// Récupération des éléments du panier depuis le local storage ou un tableau vide
let items = JSON.parse(localStorage.getItem("cartItems")) || [];

// Fonction pour calculer le total de la quantité et du prix des éléments du panier
function calculateTotal() {
  // Calcul de la quantité totale en utilisant reduce()
  const totalQuantity = items.reduce((total, item) => total + item.quantity, 0);
  
  // Calcul du prix total en utilisant reduce()
  const totalPrice = items.reduce((total, item) => total + (item.quantity * item.price), 0);

  // Mise à jour des éléments HTML affichant le total
  const totalQuantityElement = document.getElementById("totalQuantity");
  totalQuantityElement.innerText = totalQuantity;

  const totalPriceElement = document.getElementById("totalPrice");
  totalPriceElement.innerText = totalPrice.toFixed(2);
}

// Fonction pour supprimer un élément du panier
function removeItem(itemId, itemColor) {
  // Filtrage des éléments en utilisant filter()
  items = items.filter(item => item.id !== itemId || item.color !== itemColor);
  
  // Mise à jour du local storage
  localStorage.setItem("cartItems", JSON.stringify(items));
  
  // Recalcul du total
  calculateTotal();
}

// Fonction pour créer un élément du panier dans le DOM

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
    alert("Ce Kanap a été supprimé du panier : " + item.name);
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

// Fonction récursive pour récupérer les données des produits de manière séquentielle
function fetchProductData(items, index = 0) {
  //// on verifie si on a fetch tous nos items
  if (index >= items.length) {
    calculateTotal();
    return;
  }

  const item = items[index];
  fetch(`http://localhost:3000/api/products/${item.id}`)
    .then(response => response.json())
    .then(kanap => {
      const cartItemElement = createCartItemElement(item, kanap);
      itemsSection.appendChild(cartItemElement);
      fetchProductData(items, index + 1); /// récursive +1 index
    })
    .catch(error => {
      alert("Une erreur s'est produite lors de la récupération des données du produit :", error);
    });
}

// Création d'un objet contenant les éléments du panier groupés par ID 
const itemsById = items.reduce((liste, item) => {
  const id = item.id;

  if (!liste[id]) {
    liste[id] = [];
  }

  liste[id].push(item);
  return liste;
}, {});

// object contennat les elements du panier groupés par ID
const filteredItems = Object.values(itemsById).flat();

// Appel de la fonction pour récupérer les données des produits 
fetchProductData(filteredItems);