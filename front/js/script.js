
 
// define section "item"
const section = document.querySelector('#items');

// Ask API to find & return informations

fetch ('http://localhost:3000/api/products') 

.then(function(res) {
  if (res.ok === false) {
    return null;
  } else {
    return res.json();
  }
}) 
// i ask to parse the response as JSON

// Function to create card & link

.then (function(items) {
  if (items === null) {
    section.innerHTML = 'Une erreur est survenue lors de la récupération des produits.';
    return;
  }
  items.forEach (function(item){
      const link = document.createElement('a');
      link.href = `./product.html?id=${item._id}`;

      const article = document.createElement('article');
      const img = document.createElement('img');
      img.src = item.imageUrl;
      img.alt = item.altTxt;

      const h3 = document.createElement('h3');
      h3.innerHTML = item.name;
      const p = document.createElement('p');
      p.innerHTML = item.description;

      // I add to the article tag the link content
      article.appendChild(img);
      article.appendChild(h3);
      article.appendChild(p);

      link.appendChild(article);

      section.appendChild(link);
  });
});