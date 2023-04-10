fetch("http://localhost:3000/api/products/")
  .then((resp) => {
    if (resp.ok) {
      return resp.json();
    }
  })
  .then((products) => {
    let html = "";
    products.forEach((product) => {
      html += `
        <a href="./product.html?id=${product._id}">
            <article>
              <img src="${product.imageUrl}" alt="${product.altTxt}">
              <h3 class="productName">${product.name}</h3>
              <p class="productDescription">${product.description}</p>
            </article>
          </a>`;
    });
    const parentItems = document.getElementById("items");
    parentItems.innerHTML = html;
  })
  .catch((error) => {
    document.getElementById(
      "items"
    ).innerHTML = `Une erreur est survenue (${error})`;
  });
