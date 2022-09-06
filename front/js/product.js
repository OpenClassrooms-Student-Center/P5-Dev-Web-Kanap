
// Lien vers les pages produits

// Récupérer l'identifiant
let url = new URL(window.location.href);
let productId = url.searchParams.get("id");


fetch(`http://localhost:3000/api/products/${productId}`)

.then(function(response) {
    if (response.ok){
        return response.json();
    }
})

//affichage des produits sur la page

.then(function(data){  

    let img = document.createElement('img');
    img.src = data.imageUrl;

    document.querySelector(".item__img").appendChild(img);
    document.querySelector("#title").innerText = data.name;
    document.querySelector("#price").innerText = data.price;
    document.querySelector("#description").innerText = data.description;


    data.colors.forEach(color => {
        let option = document.createElement('option'); 
        option.value = color;
        option.innerText = color;
        document.querySelector("#colors").appendChild(option);
    });


})

//si il y a une erreur
.catch(function(err) {
	console.log(err)
})



// Ajouter un produit au panier via le boutton 

let button = document.querySelector('#addToCart');

button.addEventListener('click', function () {
	let color = document.querySelector('#colors').value;
	let qty = document.querySelector('#quantity').value;

    // alert(`${productId} ${color} ${qty}`);

    let panier = JSON.parse(localStorage.getItem('panier'))

    // Le panier est vide, on ajoute un nouvel article
    if(panier===null) 
        panier = [{'id': productId, 'color':color,'qty':qty}]

    // Si il y a déjà une ligne avec le même id et la même couleur, mettre à jour cette ligne, sinon, ajouter une ligne
    else { 
        panier = JSON.parse(panier);
    //     for (let i of panier) {
    //         if (i.id === productId && i.color === color) {
    //             i.qty = parseInt(i.qty) + parseInt (i.qty);
    //             NewProduct = false;
    //         }
    //     }
        
    //     else (NewProduct) {
    //         panier.push({'id': productId, 'color': color, 'qty': qty})
    // }

 }
 localStorage.setItem('panier', JSON.stringify(panier));
    //addToCart(productId, color, qty);
} )


let cart = JSON.parse(localStorage.getItem('products'));



