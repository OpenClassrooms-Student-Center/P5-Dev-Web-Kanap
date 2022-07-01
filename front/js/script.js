// Promesse Api
fetch('http://localhost:3000/api/products')
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function (affichage) {
    console.log(affichage);
    // Creer constante pour afficher les elements dans #items
    const insertItem = document.querySelector('#items');
    //   Boucle pour afficher les cards produits
    for (let item of affichage) {
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
      console.log(element);
    }
  })
  .catch(function (err = 'Une erreur est survenue') {
    console.log(err); // Message d'erreur
  });
