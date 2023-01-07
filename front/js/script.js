fetch ('http://localhost:3000/api/products/')
.then((resp)=>{
    if(resp.ok){
        return resp.json();
    }
})
.then((datas)=>{
    let html = '';
    datas.forEach(element => {
        html += `
        <a href="./product.html?id=${element._id}">
            <article>
              <img src="${element.imageUrl}" alt="${element.altTxt}">
              <h3 class="productName">${element.name}</h3>
              <p class="productDescription">${element.description}</p>
            </article>
          </a>`
    });
    const parentItems = document.getElementById('items');
    parentItems.innerHTML = html
})
.catch((error)=>{
    document.getElementById('items').innerHTML = `Une erreur est survenue (${error})`
});