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

document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".cart__order__form");

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const firstNameInput = document.getElementById("firstName");
        const lastNameInput = document.getElementById("lastName");
        const addressInput = document.getElementById("address");
        const cityInput = document.getElementById("city");
        const emailInput = document.getElementById("email");

        // Recupération donner formulaire
        const firstName = firstNameInput.value.trim();
        const lastName = lastNameInput.value.trim();
        const address = addressInput.value.trim();
        const city = cityInput.value.trim();
        const email = emailInput.value.trim();

        // Regex expression
        const nameRegex = /^[a-zA-ZÀ-ÿ'-]+$/;
        const adressRegex = /^[a-zA-ZÀ-ÿ-\s]+$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Fonction de validation regex
        function validateInput(inputValue, regexPattern, errorMessage) {
            if (!regexPattern.test(inputValue)) {
                return errorMessage;
            } else {
                return null; // Null indicates no error
            }
        }

        // Fonction d'affichage d'erreur
        function displayErrors(errors) {
            // Suppression des erreurs précedente
            const errorFields = document.querySelectorAll('[id$="ErrorMsg"]');
            errorFields.forEach(errorField => {
                errorField.textContent = '';
            });

            // Affiche la nouvelle erreur
            for (const error of errors) {
                const errorField = document.getElementById(`${error.field}ErrorMsg`);
                errorField.textContent = error.message;
            }
        }

        // Array contenant nos erreur formulaire
        let validationErrors = [];

        // Valider le prénom
        const firstNameError = validateInput(firstNameInput.value, nameRegex, "Prénom invalide");
        if (firstNameError) {
            validationErrors.push({
                field: "firstName",
                message: firstNameError
            });
        }

        // Valider le nom
        const lastNameError = validateInput(lastNameInput.value, nameRegex, "Nom invalide");
        if (lastNameError) {
            validationErrors.push({
                field: "lastName",
                message: lastNameError
            });
        }

        // Valider l'adresse
        const addressError = validateInput(address, adressRegex, "Adresse invalide");
        if (addressError) {
            validationErrors.push({
                field: "address",
                message: addressError
            });
        }

        // Valider la ville
        const cityError = validateInput(cityInput.value, adressRegex, "Ville invalide");
        if (cityError) {
            validationErrors.push({
                field: "city",
                message: cityError
            });
        }

        // Valider email
        const emailError = validateInput(emailInput.value, emailRegex, "Email invalide");
        if (emailError) {
            validationErrors.push({
                field: "email",
                message: emailError
            });
        }

       // Vérifier s'il y a des erreurs de validation
        if (validationErrors.length > 0) {
           // Gérer les erreurs en les affichant
            displayErrors(validationErrors);
            return;
        }
        // Récupérer les produits depuis le localStorage
        const cartItems = JSON.parse(localStorage.getItem("cartItems"));
     
        // Extraire uniquement les valeurs 'id' des élémentsPanier
        const products = cartItems.map((item) => item.id);

          // Créer l'objet client
        const customer = {
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
            const response = await fetch("http://localhost:3000/api/products/order", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(customer),
            });

            if (response.ok) {
                const data = await response.json();
                const orderId = data.orderId;
                // Redirect to confirmation page with orderId
                window.location.href = `confirmation.html?id=${orderId}`;
            } else {
                // Handle the error response
                const errorData = await response.json();
                console.log("Error:", errorData);
            }
        } catch (error) {
            // Gérer les erreurs réseau ou générales
            console.log("Error:", error);
        }
    });

   // Fonction pour afficher le message d'erreur pour un champ spécifique
    function displayError(input, errorMessage) {
        const errorElement = input.nextElementSibling;
        errorElement.textContent = errorMessage;
        errorElement.style.display = "block";
    }

    /// Fonction pour effacer le message d'erreur pour un champ spécifique
    function clearError(input) {
        const errorElement = input.nextElementSibling;
        errorElement.textContent = "";
        errorElement.style.display = "none";
    }
});