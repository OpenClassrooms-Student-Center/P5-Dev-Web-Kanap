// Sélection de la section des éléments du panier dans le DOM
const itemsSection = document.getElementById("cart__items");

// Récupération des éléments du panier depuis le local storage ou un tableau vide
let items = JSON.parse(localStorage.getItem("cartItems")) || [];

// Fonction pour calculer le total de la quantité et du prix des éléments du panier
function calculateTotal() {
  // Calcul de la quantité totale en utilisant reduce()
  const totalQuantity = items.reduce((total, item) => total + item.quantity, 0);

  // Calcul du prix total en utilisant reduce()
  const totalPrice = items.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );

  // Mise à jour des éléments HTML affichant le total
  const totalQuantityElement = document.getElementById("totalQuantity");
  totalQuantityElement.innerText = totalQuantity;

  const totalPriceElement = document.getElementById("totalPrice");
  totalPriceElement.innerText = totalPrice.toFixed(2);
}

// Fonction pour supprimer un élément du panier
function removeItem(event) {
  // Obtention de l'élément de suppression et son élément parent correspondant dans le panier
  const deleteItemText = event.target;
  const cartItem = deleteItemText.closest(".cart__item");

  // Obtention de l'ID et de la couleur de l'élément du panier
  const itemId = cartItem.dataset.id;
  const itemColor = cartItem.dataset.color;

  // Suppression de l'élément du panier dans la liste des items
  items = items.filter(
    (item) => item.id !== itemId || item.color !== itemColor
  );

  // Mise à jour du local storage avec les nouvelles données
  localStorage.setItem("cartItems", JSON.stringify(items));

  // Recalcul du total et suppression de l'élément du DOM
  calculateTotal();
  cartItem.remove();
}

// Fonction pour mettre à jour la quantité d'un élément du panier
function updateQuantity(event) {
  // Obtention de la nouvelle quantité saisie par l'utilisateur
  const newQuantity = parseInt(event.target.value);

  // Obtention de l'élément du panier parent correspondant à l'élément modifié
  const cartItem = event.target.closest(".cart__item");

  // Obtention de l'ID et de la couleur de l'élément du panier
  const itemId = cartItem.dataset.id;
  const itemColor = cartItem.dataset.color;

  // Recherche de l'élément dans la liste des items
  const updatedItem = items.find(
    (item) => item.id === itemId && item.color === itemColor
  );

  // Mise à jour de la quantité si l'élément existe
  if (updatedItem) {
    updatedItem.quantity = newQuantity;
    calculateTotal();
    localStorage.setItem("cartItems", JSON.stringify(items));
  }
}

// Fonction pour créer un élément du panier dans le DOM
function createCartItemElement(item, kanap) {
  // Code pour la création des éléments du panier
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

  // Ajout de l'événement de suppression à l'élément de suppression
  deleteItemText.addEventListener("click", removeItem);

  // Ajout de l'événement de modification de la quantité à l'élément d'input
  quantityInput.addEventListener("change", updateQuantity);

  return cartItem;
}

// Fonction récursive pour récupérer les données des produits de manière séquentielle
function fetchProductData(items, index = 0) {
  // Vérification si tous les items ont été traités
  if (index >= items.length) {
    calculateTotal();
    return;
  }

  const item = items[index];

  // Appel API pour récupérer les données du produit
  fetch(`http://localhost:3000/api/products/${item.id}`)
    .then((response) => response.json())
    .then((kanap) => {
      const cartItemElement = createCartItemElement(item, kanap);
      itemsSection.appendChild(cartItemElement);

      // Appel récursif pour traiter l'item suivant
      fetchProductData(items, index + 1);
    })
    .catch((error) => {
      alert(
        "Une erreur s'est produite lors de la récupération des données du produit :",
        error
      );
    });
}

// Création d'un objet contenant les éléments du panier groupés par ID
const itemsById = items.reduce((liste, item) => {
  const id = item.id;
  // Vérifie si la clé "id" existe déjà dans l'objet "liste"
  if (!liste[id]) {
    liste[id] = [];
  }

  liste[id].push(item);
  return liste;
}, {});

// Obtenir la liste des items groupés par ID sous forme d'un tableau
const filteredItems = Object.values(itemsById).flat();

// Appel de la fonction pour récupérer les données des produits
fetchProductData(filteredItems);

// Attendre que le DOM (Document Object Model) soit chargé
document.addEventListener("DOMContentLoaded", () => {
  // Sélectionner le formulaire ayant la classe "cart__order__form"
  const form = document.querySelector(".cart__order__form");

  // Ajouter un écouteur d'événement lorsque le formulaire est soumis
  form.addEventListener("submit", async (event) => {
    event.preventDefault(); // Empêcher l'envoi du formulaire par défaut
  
    // Récupérer les éléments d'entrée du formulaire par leur identifiant
    const firstNameInput = document.getElementById("firstName");
    const lastNameInput = document.getElementById("lastName");
    const addressInput = document.getElementById("address");
    const cityInput = document.getElementById("city");
    const emailInput = document.getElementById("email");
  
    // Récupérer les valeurs des champs du formulaire
    const firstName = firstNameInput.value.trim();
    const lastName = lastNameInput.value.trim();
    const address = addressInput.value.trim();
    const city = cityInput.value.trim();
    const email = emailInput.value.trim();
  
    // Expressions régulières pour valider les entrées
    const nameRegex = /^[a-zA-ZÀ-ÿ'-]+$/; // Permet uniquement les lettres, apostrophe et tiret
    const addressRegex = /^[a-zA-ZÀ-ÿ0-9\s'-]+$/; // Permet uniquement les lettres, tirets et espaces
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Vérifie le format d'une adresse email
  
    let hasErrors = false; // Variable pour suivre si des erreurs ont été trouvées
  
    // Valider le prénom
    if (!nameRegex.test(firstName)) {
      displayError(firstNameInput, "Prénom invalide");
      hasErrors = true;
    } else {
      clearError(firstNameInput);
    }
  
    // Valider le nom de famille
    if (!nameRegex.test(lastName)) {
      displayError(lastNameInput, "Nom invalide");
      hasErrors = true;
    } else {
      clearError(lastNameInput);
    }
  
    // Valider l'adresse
    if (!addressRegex.test(address)) {
      displayError(addressInput, "Adresse invalide");
      hasErrors = true;
    } else {
      clearError(addressInput);
    }
  
    // Valider la ville
    if (!addressRegex.test(city)) {
      displayError(cityInput, "Ville invalide");
      hasErrors = true;
    } else {
      clearError(cityInput);
    }
  
    // Valider l'adresse email
    if (!emailRegex.test(email)) {
      displayError(emailInput, "Email invalide");
      hasErrors = true;
    } else {
      clearError(emailInput);
    }
  
    // Vérifier s'il y a des erreurs avant d'envoyer la requête
    if (!hasErrors) {
      // Récupérer les produits depuis le stockage local (localStorage)
      const cartItems = JSON.parse(localStorage.getItem("cartItems"));
  
      // Extraire uniquement les valeurs 'id' des produits du panier
      const products = cartItems.map((item) => item.id);
  
      // Créer l'objet de données à envoyer (payload)
      const payload = {
        contact: {
          firstName,
          lastName,
          address,
          city,
          email,
        },
        products,
      };
  
      try {
        // Envoyer la requête POST avec les données au serveur
        const response = await fetch("http://localhost:3000/api/products/order", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
  
        if (response.ok) {
          // Si la réponse est réussie, récupérer les données de la réponse
          const data = await response.json();
          const orderId = data.orderId;
          // Rediriger vers la page de confirmation avec l'identifiant de commande
          window.location.href = `confirmation.html?id=${orderId}`;
        } else {
          // Gérer la réponse d'erreur
          const errorData = await response.json();
          console.log("Erreur :", errorData);
        }
      } catch (error) {
        console.log("Erreur :", error);
      }
    }
  });
  

  // Fonction pour afficher un message d'erreur pour un champ spécifique
  function displayError(input, errorMessage) {
    const errorElement = input.nextElementSibling;
    errorElement.textContent = errorMessage;
    errorElement.style.display = "block";
  }

  // Fonction pour effacer un message d'erreur pour un champ spécifique
  function clearError(input) {
    const errorElement = input.nextElementSibling;
    errorElement.textContent = "";
    errorElement.style.display = "none";
  }
});
