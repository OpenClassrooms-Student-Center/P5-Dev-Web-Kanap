
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

document.querySelector('#addToCart').addEventListener('click', function () {

	let color = document.querySelector('#colors').value;
	let qty = parseInt(document.querySelector('#quantity').value);   // parseInt -> modifie une chaine de caractère en un entier

    if (color.length == 0) {
        alert("Veuillez séléctionner une couleur ")
        return;
    }

    if (qty < 1 || qty > 100) {
        alert("La quantité doit être comprise entre 1 et 100")
        return;
    }


    let panier = JSON.parse(localStorage.getItem('panier'))


    
    if(panier === null) {   // Le panier est vide, on ajoute un nouvel article
        panier = [
            {
                'id': productId,
                'color':color,
                'qty':qty,
            }
        ]    
    } else {    // Le panier n'est pas vide

        let product = panier.find(p => p.id == productId && p.color == color);  //Find -> renvoie la valeur du premier élément trouvé

        if (product === undefined) {
            panier.push(  //Push -> on ajoute un élément au tableau
                {
                    'id': productId,
                    'color': color,
                    'qty': qty,
                }
            )
        } else {
            product.qty = parseInt(product.qty) + qty;
        }
    }

    localStorage.setItem('panier', JSON.stringify(panier));

} )




