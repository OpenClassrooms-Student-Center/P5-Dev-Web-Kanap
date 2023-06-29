// Récupérer l'URL de la page actuelle
const currentUrl = window.location.href;

// Créer un objet URL à partir de l'URL de la page
const url = new URL(currentUrl);

// Récupérer l'ID du produit depuis l'URL
const idParam = url.searchParams.get('id');

// Effectuer une requête GET vers l'API pour récupérer les informations du produit
fetch(`http://localhost:3000/api/products/${idParam}/`)
  .then(response => response.json())
  .then(data => {
    // Récupérer les informations du produit
    const product = data;

    // Afficher les informations dans le HTML
    document.getElementById('title').innerText = product.name;
    document.getElementById('price').innerText = product.price;
    document.getElementById('description').innerText = product.description;

    // Afficher les couleurs dans la liste déroulante
    const colorsSelect = document.getElementById('colors');
    product.colors.forEach(color => {
      const option = document.createElement('option');
      option.value = color;
      option.textContent = color;
      colorsSelect.appendChild(option);
    });
  })
  .catch(error => {
    console.error('Une erreur s\'est produite lors de la récupération des informations du produit:', error);
  });
