const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString)
const productId = urlParams.get ('id')
console.log (productId)
fetch (`http://localhost:3000/api/products/${productId}`)
.then((resp)=>{
    if(resp.ok){
        return resp.json();
    }
})
.then((product)=>{
    console.log(product)
    document.querySelector('.item__img').innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}">`
    document.getElementById('title').innerText = product.name
    document.getElementById('description').innerText = product.description
    document.getElementById('colors').innerHTML +=
    `<option value="vert">${product.colors[0]}</option>
    <option value="blanc">${product.colors[1]}</option>
    <option value="blanc">${product.colors[2]}</option>
    <option value="blanc">${product.colors[3]}</option>`;
})
.catch((error)=>{

});