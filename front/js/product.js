// On demande a l'API de nous retourner l'ID spécifique du produit
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString)
const productId = urlParams.get ('id')
console.log (productId)
// On demande a l'API de nous retourner un URL contenant l'ID du produit,
fetch (`http://localhost:3000/api/products/${productId}`)
.then((resp)=>{
    if(resp.ok){
        return resp.json();
    }
})
//
.then((product)=>{
    console.log(product)
    // On créé le code HTML en demandant a l'API de nous retourner l'image et la description du produit
    document.querySelector('.item__img').innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}">`
    // de nous retourner le titre du produit
    document.getElementById('title').innerText = product.name
    // de nous retourner la description du produit
    document.getElementById('description').innerText = product.description
    // et enfin chaque couleur du produit      Problème: lorsqu'un canapé n'a que 2 ou 3 couleur créées un undefined sur la séléction.
    document.getElementById('colors').innerHTML +=
    `<option value="vert">${product.colors[0]}</option>
    <option value="blanc">${product.colors[1]}</option>
    <option value="blanc">${product.colors[2]}</option>
    <option value="blanc">${product.colors[3]}</option>`;
})
//
.catch((error)=>{

});
