// --------------------------------------------------------------
// Je importe la fonction dans le fichier fetch.js
import { fetchAllProducts } from './fetch.js'


// --------------------------------------------------------------
// Fonction pour afficher tous les produits dans la page d'accueil
function displayAllProducts(products) {
     // Creer constante pour afficher les elements dans #items
     const insertItem = document.querySelector('#items');
     //   Boucle pour afficher les cards produits
     for (let item of products) {
       let element = document.createElement('a');
       element.setAttribute('href', `./product.html?id=${item._id}`);
       // Inserer elements avec DOM
       element.innerHTML = `<article>
         <img src="${item.imageUrl}" alt="${item.altTxt}/> 
        <h3 class="productName">${item.name}</h3>  
        <p class="productDescription">${item.description}</p> 
        </article>`;
       // Afficher les produits
       insertItem.append(element);
     }
}
fetchAllProducts(displayAllProducts);