// Récupérer l'URL de la page actuelle
const currentUrl = window.location.href;

// Créer un objet URL à partir de l'URL de la page
const url = new URL(currentUrl);

// Récupérer l'ID du produit depuis l'URL
const idParam = url.searchParams.get("id");

// Effectuer une requête GET vers l'API pour récupérer les informations du produit
fetch(`http://localhost:3000/api/products/${idParam}/`)
  .then((response) => response.json())
  .then((data) => {
    // Récupérer les informations du produit
    const kanap = data;

    // Afficher les informations dans le HTML
    document.getElementById("title").innerText = kanap.name;
    document.getElementById("price").innerText = kanap.price;
    document.getElementById("description").innerText = kanap.description;

    // Afficher les couleurs dans la liste déroulante
    const colorsSelect = document.getElementById("colors");
    kanap.colors.forEach((color) => {
      const option = document.createElement("option");
      option.value = color;
      option.textContent = color;
      colorsSelect.appendChild(option);
    });
  })
  .catch((error) => {
    console.error(
      "Une erreur s'est produite lors de la récupération des informations du produit:",
      error
    );
  });

// Récupérer le bouton "Ajouter au panier"
const addToCartButton = document.getElementById("addToCart");

// Ajouter un écouteur d'événement au clic sur le bouton
addToCartButton.addEventListener("click", addToCart);

// Définition de la fonction addToCart
function addToCart() {
  // Récupérer les valeurs sélectionnées
  const selectedColor = document.getElementById("colors").value;
  const quantity = parseInt(document.getElementById("quantity").value);

  // Vérifier si les valeurs sont valides
  if (selectedColor && quantity > 0) {
    // Récupérer les données existantes du localStorage
    let cartItems = JSON.parse(localStorage.getItem("cartItems"));
    if (!cartItems) {
      cartItems = [];
    }
    // Vérifier s'il y a déjà un produit similaire avec une quantité modifiée
    let itemFound = false;
    for (const item of cartItems) {

      if (item.id === idParam && item.color === selectedColor) {
        item.quantity += quantity;
        itemFound = true;
      }
    }

    if (!itemFound) {
      // Créer un nouvel objet représentant le produit sélectionné
      const newItem = {
        id: idParam,
        quantity: quantity,
        color: selectedColor,
      };

      // Ajouter le nouvel objet à l'array du panier
      cartItems.push(newItem);
    }

    // Mettre à jour le localStorage avec les nouvelles données
    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    console.log("Produit ajouté au panier avec succès !");
  } else {
    // Afficher un message d'erreur
    console.error("Veuillez sélectionner une couleur et une quantité valide.");
  }
}
