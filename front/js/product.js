// (expliquer chaque ligne) rien compris
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString)
const productId = urlParams.get ('id')
console.log(productId)
// On demande a l'API de nous retourner l'ID du produit,(qu'est ce que le localhost) on retounre les odnné du produit
fetch (`http://localhost:3000/api/products/${productId}`)
//.then fais un appel a l'api, il demande une reponse 
.then((resp)=>{
    //si la reponse est ok
    if(resp.ok){
        //alors on veut une reponse en json
        return resp.json();
    }
})
//
.then((product)=>{
    // On créé le code HTML en demandant a l'API de nous retourner l'image et la description du produit
    document.querySelector('.item__img').innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}">`
    // de nous inséré le titre du produit
    document.getElementById('title').innerText = product.name
    // de nous inséré la description du produit
    document.getElementById('description').innerText = product.description
    // et enfin chaque couleur du produit       prdocut.color.forEach value color aussi
    
    product.colors.forEach(color => {
        document.getElementById('colors').innerHTML += `<option value="${color}">${color}</option>`   
    });


    //ajout du clique bouton dans le then
    document.getElementById('addToCart')
    .addEventListener('click',function (e){
        addCart(${productId})
      })
})
//
.catch((error)=>{
// classe item (faire la catch error sur lma class item)
});
//(explication ligne par ligne)

function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function getCart() {
    let cart = localStorage.getItem('cart');
    if (cart == null){
        return [];
    } else {
        return JSON.parse(cart);
    }
}
//(explication ligne par ligne  et ajout des)
function addCart(product) {
    // One recuepàre le contenu du panier local storage
    let cart = getCart();

    const color = document.getElementById("colors").value;
    const quantity = document.getElementById("quantity").value;
    //On récupere que la quantité est valide
    if(quantity < 1 || quantity > 100){
        alert ('La quantité doit être située entre 1 et 100');
        return;
    }
    //Verifier qu'un cas a etait choisie if pas de couleur alors je return
//
    let foundProduct = cart.find(p => p._id == product._id && p.color === color);
    if(foundProduct != undefined){
        //parse int car on repasse en nombre et oas 
      foundProduct.quantity+= parseint(quantity);
    }else{
        //produit formater. Recuperation des variables utile(enlever la possibliter de changer le prix dans le local host)
       const formattedProduct = {
        "_id":product._id,
        "color": color,
        "quantity": parseInt(quantity)
       }

       // "id" product id
       //const color et quantity  document.getElementById("colors").value
       //
      cart.push(formattedProduct);
    }
    // On met a jour le local storage
    saveCart(cart);
}
function render product

//sort js