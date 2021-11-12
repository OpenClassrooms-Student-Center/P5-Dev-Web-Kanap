fetch("http://localhost:3000/api/products")
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(value) {
    let html = "";
    value.forEach(element => {
      html += ` <a href="./product.html?id=${element._id}">
      <article>
        <img src="${element.imageUrl}" alt="${element.altTxt}">
        <h3 class="productName">${element.name}</h3>
        <p class="productDescription">${element.description}</p>
      </article>
    </a>`
    });
    const items = document.getElementById('items');
    items.innerHTML = html;
  })
  .catch(function(err) {
    const items = document.getElementById('items');
    items.innerHTML = `Une erreur est survenue (${err})`;
  });
  


  


