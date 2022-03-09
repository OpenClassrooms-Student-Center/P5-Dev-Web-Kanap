const sectionArticle = document.getElementById("items"); // declaration de la variable

// Creation de la fonction d'afichage des produits
const getProducts = async function () {
  fetch("http://localhost:3000/api/products")
    .then((result) => result.json())

    .then((data) => {
      let html = ""; // creation d'une variable html de type string
      for (let kanap of data) {
        html += ` <a href="./product.html?id=${kanap._id}">
        <article>
          <img src="${kanap.imageUrl}" alt="${kanap.altTxt}">
          <h3 class="productName">${kanap.name}</h3>
          <p class="productDescription">${kanap.description}.</p>
        </article>
      </a> `;
      }
      sectionArticle.innerHTML = html;
    })
    .catch((err) => {
      console.error(err);
    });
};
// Appel de la fonction
getProducts();
