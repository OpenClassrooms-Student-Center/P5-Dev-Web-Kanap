// Récupérer la référence de l'élément "section" dans le HTML
const itemsSection = document.getElementById('items');

// Effectuer une requête GET vers l'API
fetch('http://localhost:3000/api/products')
  .then(response => response.json())
  .then(data => {
    // Parcourir les données récupérées
    data.forEach(product => {
      // Créer les éléments HTML pour chaque produit
      const link = document.createElement('a');
      const article = document.createElement('article');
      const image = document.createElement('img');
      const productName = document.createElement('h3');
      const productDescription = document.createElement('p');

      // Définir les attributs et le contenu des éléments
      link.href = `./product.html?id=${product._id}`;
      article.appendChild(image);
      article.appendChild(productName);
      article.appendChild(productDescription);
      link.appendChild(article);
      
      image.src = product.imageUrl;
      image.alt = product.altTxt;
      productName.className = 'productName';
      productName.textContent = product.name;
      productDescription.className = 'productDescription';
      productDescription.textContent = product.description;

      // Ajouter les éléments dans le DOM
      itemsSection.appendChild(link);
    });
  })
  .catch(error => {
    console.error('Une erreur s\'est produite lors de la récupération des données:', error);
  });
