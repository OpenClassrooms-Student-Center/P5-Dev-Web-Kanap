// page panier

// afficher();
// function afficher() {
//     let panier = JSON.parse(localStorage.getItem('panier'));
//     let cart__items = document.querySelector('#cart__items');

//     if (panier === null) {
//         cart__items.innerHTML = '<p>Votre panier est vide</p>';
//     } else {
//         let totalQuantite = 0;
//         let totalPrice = 0;

//         for (let i in panier) {

//             fetch('http://localhost:3000/api/products/' + panier[i].id)
//             .then(function(response) {
//                 if (response.ok){
//                     return response.json();
//                 }
//             })
//             .then(function(product) {
//                 totalQuantite += panier[i].qty
//                 totalPrice += (panier[i].qty * product.price)

//                 // initialement il y avait la création du DOM ici
//             }
//             )
//         }
//     }
// }

// let panier = JSON.parse(localStorage.getItem('panier'));
// let cart__items = document.querySelector('#cart__items');

async function afficher (products) {

    let panier = JSON.parse(localStorage.getItem('panier'));
    let cart__items = document.querySelector('#cart__items');

       
    // let product = await fetch('http://localhost:3000/api/products/');


    // initProducts = await product.JSON();

    if (panier === null) {
        cart__items.innerHTML = '<p>Votre panier est vide</p>';
    }
    else {
        let totalQuantite = 0;
        let totalPrice = 0;

        for (let i in panier) {

            await fetch(`http://localhost:3000/api/products/` + products[i].id)

            .then(function(response) {
                if (response.ok){
                    return response.json();
                }
            })
            .then(function(product) {
                totalQuantite += panier[i].qty
                totalPrice += (panier[i].qty * product.price)
            }
            )

            panier = panier.find(data => data._id === data.id);
            

            CreationPanier (panier[i].id, panier[i].color, panier[i].qty);

        }
    }
} 



function CreationPanier (id, color, qty) {

    // creation de l'article
    let articleProduct = document.createElement("article");
    articleProduct.className = "articleProduct";
    articleProduct.setAttribute("data-id", panier[i].id);
    articleProduct.setAttribute("data-color", panier[i].color);
    cart__items.appendChild(articleProduct);

        // creation de l'élément div
    let cart__item__img = document.createElement("div");
    cart__item__img.className = "cart__item__img";
    articleProduct.appendChild(cart__item__img);

        //creation de l'image
    let image = document.createElement("img")
    image.src = product.imageUrl;
    image.alt = product.altText;
    cart__item__img.appendChild(image);

        // creation de l'élément div
    let cart__item__content = document.createElement("div");
    cart__item__content.className = "cart__item_content";
    articleProduct.appendChild(cart__item__content);

        // creation de la div description 
    let cart__item__content__description = document.createElement("div");
    cart__item__content__description.className = "cart__item__content__description";
    cart__item__content.appendChild(cart__item__content__description);

        // creation du H3 de la description
    let productName = document.createElement("h2");
    productName.innerHTML = product.name;
    cart__item__content__description.appendChild(productName);

        // creation de la couleur
    let productColor = document.createElement("p");
    productColor.innerHTML = panier[i].color;
    cart__item__content__description.appendChild(productColor);

        // creation du prix
    let productPrice = document.createElement("p");
    productPrice.innerHTML = product.price + " €";
    cart__item__content__description.appendChild(productPrice);

        // creation de la div settings
    let cart__item__content__settings = document.createElement("div");
    cart__item__content__settings.className = "cart__item__content__settings";
    cart__item__content.appendChild(cart__item__content__settings);

        // creation de la div quantité 
    let cart__item__content__settings__quantity = document.createElement("div");
    cart__item__content__settings__quantity.className = "cart__item__content__settings__quantity";
    cart__item__content__settings.appendChild(cart__item__content__settings__quantity);

        // création du p de la quantité
    let productQty = document.createElement("p");
    productQty.innerHTML = "Qté : ";
    cart__item__content__settings__quantity.appendChild(productQty);

        // creation de l'input de la quantité 
    let itemQuantity = document.createElement("input");
    itemQuantity.value = panier[i].qty;
    itemQuantity.className = "itemQuantity";
    itemQuantity.setAttribute("type", "number");
    itemQuantity.setAttribute("min", "1");
    itemQuantity.setAttribute("max", "100");
    itemQuantity.setAttribute("name", "itemQuantity");
    itemQuantity.addEventListener('change', function() {
        modifier(panier[i].id, panier[i].color, panier[i].qty);
    })
    cart__item__content__settings__quantity.appendChild(itemQuantity);

        // creation de la div de supression
    let cart__item__content__settings__delete = document.createElement("div");
    cart__item__content__settings__delete.className = "cart__item__content__settings__delete";
    cart__item__content__settings.appendChild(cart__item__content__settings__delete);

        // creation de la supression
    let deleteItem = document.createElement("p");
    deleteItem.className = "deleteItem";
    deleteItem.innerHTML = "supprimer";
    deleteItem.addEventListener('click', function() {
        supprimer(panier[i].id, panier[i].color);
    })
    cart__item__content__settings__delete.appendChild(deleteItem);

    document.querySelector('#totalQty').textContent(totalQuantite);
}



function supprimer(id, color) {
    alert("supprimer");
}

function modifier(id, color, qty) {
    alert("modifier");
}

// afficher();

// function afficher() {

//     let panier = JSON.parse(localStorage.getItem('panier'));
//     let cart__items = document.querySelector('#cart__items');

//     let initProducts = async () => {
       
//         let product = await fetch('http://localhost:3000/api/products/' + panier[i].id);
//         initProducts = await product.JSON();

//         if (panier === null) {
//             cart__items.innerHTML = '<p>Votre panier est vide</p>';
//         }
//         else {
//             let totalQuantite = 0;
//             let totalPrice = 0;

//             for (let i in panier) {

//                 product = product.find(data => data._id === data.id);
                
//                 totalQuantite += panier[i].qty
//                 totalPrice += (panier[i].qty * product.price)

//                 CreationPanier (panier);

//             }
//         }
//     } 
// }