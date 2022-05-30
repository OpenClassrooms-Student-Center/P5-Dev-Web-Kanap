fetch("http://localhost:3000/api/products")
  .then((res)=> {
    if (res.ok) {
      return res.json();
    }
  })
  .then((products)=> {
    let html="";
    products.forEach(product => {
        html += `   <a href="./product.html?id=${product._id}">
        <article>
          <img src="${product.imageUrl}" alt="${product.altTxt}">
          <h3 class="productName">${product.name}</h3>
          <p class="productDescription">${product.description}</p>
        </article>
      </a>`
    });
    const items= document.getElementById("items");
    items.innerHTML = html;
  })
  .catch((err)=> {
    const items= document.getElementById("items");
    items.innerHTML = `Une erreur est survenue (${err})`;
    
  });