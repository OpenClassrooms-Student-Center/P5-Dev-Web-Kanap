fetch("http://localhost:3000/api/products")
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function (datas) {
    for (let i = 0; i < datas.length; i++) {
      let produit = datas[i];
      console.log(datas);
      const items = document.getElementById("items");
      console.log(items);
      items.innerHTML += `<a href="./product.html?id=${produit._id}">
      <article>
        <img
          src=${produit.imageUrl}
          alt="${produit.altTxt}"
        />
        <h3 class="productName">${produit.name}</h3>
        <p class="productDescription">
          ${produit.description}
        </p>
      </article>
      </a>`;
    }
  })

  .catch(function (err) {
    window.alert("Serveur déconnecté");
  });
