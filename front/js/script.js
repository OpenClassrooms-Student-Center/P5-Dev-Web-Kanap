const sectionArticle = document.getElementById("items");

const getProducts = async function () {
  fetch("http://localhost:3000/api/products")
    .then((result) => result.json())

    .then((data) => {
      console.log(data);
      for (let kanap of data) {
        console.log(kanap.name);
        let item = ` <a href="./product.html?id=${kanap._id}">
        <article>
          <img src="${kanap.imageUrl}" alt="${kanap.altTxt}">
          <h3 class="productName">${kanap.name}</h3>
          <p class="productDescription">${kanap.description}.</p>
        </article>
      </a> `;

        sectionArticle.innerHTML += item;
      }
    })
    .catch((err) => {
      console.error(err);
    });
};
getProducts();
