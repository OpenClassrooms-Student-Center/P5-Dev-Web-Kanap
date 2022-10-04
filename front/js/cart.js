
// Creation de la page panier

afficher ()
async function afficher() {

    let panier = JSON.parse(localStorage.getItem('panier'));
    let cart__items = document.querySelector('#cart__items');
    cart__items.textContent='';

    // Chargement du catalogue
    let response = await fetch(`http://localhost:3000/api/products/`);
    let products = await response.json();

    if (panier === null) {
        cart__items.textContent = '<p>Votre panier est vide</p>';
        cart__items.style.textAlign = 'center';
        return
    }
    else {
        let totalQuantite = 0;
        let totalPrice = 0;

        for (let i in panier) {

            //console.log(panier[i])
            product = products.find(data => data._id === panier[i].id);

            // afficher les lignes du panier

            // creation de l'article
            let articleProduct = document.createElement("article");
            articleProduct.className = "cart__item";
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
            cart__item__content.className = "cart__item__content";
            articleProduct.appendChild(cart__item__content);

            // creation de la div description 
            let cart__item__content__description = document.createElement("div");
            cart__item__content__description.className = "cart__item__content__description";
            cart__item__content.appendChild(cart__item__content__description);

            // creation du H2 de la description
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
            productQty.textContent = "Qté : ";
            cart__item__content__settings__quantity.appendChild(productQty);

            // creation de l'input de la quantité 
            let itemQuantity = document.createElement("input");
            cart__item__content__settings__quantity.appendChild(itemQuantity);
            itemQuantity.className = "itemQuantity";
            itemQuantity.setAttribute("type", "number");
            itemQuantity.setAttribute("min", "1");
            itemQuantity.setAttribute("max", "100");
            itemQuantity.setAttribute("name", "itemQuantity");
            itemQuantity.setAttribute("value", panier[i].qty)
            // mise en place du boutton modifier
            itemQuantity.addEventListener('change', function() {

                // Récupération du prix de l'article dans le catalogue
                let dataId = this.closest('.cart__item').getAttribute('data-id')
                let color = this.closest('.cart__item').getAttribute('data-color')
                let price = products.find(p => p._id == dataId).price;

                // Récupérer la ligne du panier à modifier
                let ligne = panier.find(p => p.id == dataId && p.color == color );  
                
                // On calcule la différence de qté
                let diff = parseInt(this.value) - parseInt(ligne.qty)

                // On met à jour la ligne dans le panier
                ligne.qty = this.value;

                // On remet à jour le panier dans le localStorage
                localStorage.setItem("panier", JSON.stringify(panier));

                document.getElementById('totalQuantity').textContent = parseInt(document.getElementById('totalQuantity').textContent) + diff
                document.getElementById('totalPrice').textContent = parseInt(document.getElementById('totalPrice').textContent) + (diff * parseFloat(price))
            })

            // creation de la div de supression
            let cart__item__content__settings__delete = document.createElement("div");
            cart__item__content__settings__delete.className = "cart__item__content__settings__delete";
            cart__item__content__settings.appendChild(cart__item__content__settings__delete);

            // creation de la supression
            let deleteItem = document.createElement("p");
            deleteItem.className = "deleteItem";
            deleteItem.innerHTML = "supprimer";
            cart__item__content__settings__delete.appendChild(deleteItem);
                    
            // mise en place du boutton supprimer
            deleteItem.addEventListener('click', function(e) { 
                e.preventDefault();

                // Récupération du prix de l'article dans le catalogue
                let dataId = this.closest('.cart__item').getAttribute('data-id')
                let color = this.closest('.cart__item').getAttribute('data-color')

                panier = panier.filter(element => element.id !== dataId || element.color !== color);
                e.target.closest('.cart__item').remove();

                if (panier.length==0)
                    localStorage.removeItem('panier')
                else
                    localStorage.setItem('panier', JSON.stringify(panier));

                alert('Votre article a été supprimé');

                recalculer();
            })

            // Cumul quantité + prix
            totalQuantite += parseInt(panier[i].qty)
            totalPrice += parseInt(panier[i].qty * product.price)

        }
        console.log(totalPrice, totalQuantite)
        document.getElementById('totalQuantity').textContent = totalQuantite;
        document.getElementById('totalPrice').textContent = totalPrice;
    }
} 


// mise en place de la fonction pour recalculer le montant après supression d'un article
async function recalculer () {

    let panier = JSON.parse(localStorage.getItem('panier'));

    let response = await fetch(`http://localhost:3000/api/products/`);
    let products = await response.json();

    let totalQuantite = 0;
    let totalPrice = 0;

    if (panier === null) {
        cart__items.textContent = 'Votre panier est vide';
        cart__items.style.textAlign = 'center';
    }
    else {

        for (let i in panier) {
            product = products.find(data => data._id === panier[i].id);

            totalQuantite += parseInt(panier[i].qty)
            totalPrice += parseInt(panier[i].qty * product.price)
        }
    }

    document.getElementById('totalQuantity').textContent = totalQuantite;
    document.getElementById('totalPrice').textContent = totalPrice;

}





// Mise en place du formulaire -------------------------------------------------------

function setForm() {

    let form = document.querySelector(".cart__order__form");

    form.addEventListener('submit', (e) => {    //méthode fléché plus concise qu'une fonction
        e.preventDefault();
        if (!firstNameValid(document.querySelector('#firstName'))) // faire la même chose avec les autres champs
            return;
        order();
    });

    // Creation des RegExp (expressions regulière pour tester la présence de certain caractère)
    let emailRegExp = new RegExp("^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$");
    let charRegExp = new RegExp("^[a-zA-Z ,.'-]+$");
    let addressRegExp = new RegExp("^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+");

    // Ecoute des champs
    form.firstName.addEventListener('change', function() {
        firstNameValid(this)
    });
    form.lastName.addEventListener('change', function() {
        lastNameValid(this)
    });
    form.address.addEventListener('change', function() {
        addressValid(this)
    });
    form.city.addEventListener('change', function() {
        cityValid(this)
    });
    form.email.addEventListener('change', function() {
        emailValid(this)
    });


    // Validation Prenom 
    const firstNameValid = (inputfirstName) => {
        let firstNameErrorMsg = document.querySelector('#firstNameErrorMsg')
        if (charRegExp.test(inputfirstName.value)) {
            firstNameErrorMsg.textContent = '';
            return true; // faire la même chose avec les autres champs
        } else {
            firstNameErrorMsg.textContent = 'Champ invalide, veuillez vérifier votre prénom';
            return false;
        }
    }

    // Nom
    const lastNameValid = (inputlastName) => {
        let lastNameErrorMsg = document.querySelector('#lastNameErrorMsg')
        if (charRegExp.test(inputlastName.value)) {
            lastNameErrorMsg.textContent = '';
        } else {
            lastNameErrorMsg.textContent = 'Champ invalide, veuillez vérifier votre nom';
        }
    }

    // Adresse
    const addressValid = (inputAddress) => {
        let addressErrorMsg = document.querySelector('#addressErrorMsg')
        if (addressRegExp.test(inputAddress.value)) {
            addressErrorMsg.textContent = '';
        } else {
            addressErrorMsg.textContent = 'Champ invalide, veuillez vérifier votre addresse';
        }
    }

    // Ville
    const cityValid = (inputCity) => {
        let cityErrorMsg = document.querySelector('#cityErrorMsg')
        if (charRegExp.test(inputCity.value)) {
            cityErrorMsg.textContent = '';
        } else {
            cityErrorMsg.textContent = 'Champ invalide, veuillez vérifier votre ville';
        }
    }

    // Email 
    const emailValid = (inputEmail) => {
        let emailErrorMsg = document.querySelector('#emailErrorMsg')
        if (emailRegExp.test(inputEmail.value)) {
            emailErrorMsg.textContent = '';
        } else {
            emailErrorMsg.textContent = 'Champ invalide, veuillez vérifier votre adresse email';
        }
    }
}
setForm();

// Validation du formulaire et passage de la commande --------------------------------

function order () {

    let panier = JSON.parse(localStorage.getItem('panier'));
    let products = [];

    for (let i = 0; i < panier.length; i++) {
        products.push(panier[i].id);
    }
    let commande = { // Faire un objet contact et un tableau des produits.
        contact : {
            firstName: firstName.value,
            lastName: lastName.value,
            address: address.value,
            city: city.value,
            email: email.value,
        },
        products: products,
    }

            // On envoie les données vers le back-end

    let FetchOption = {
        method: 'POST',
        headers: {'Content-Type': 'application/json;charset=utf-8'},
        body: JSON.stringify(commande),
    };

    fetch("http://localhost:3000/api/products/order", FetchOption)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            document.location.href = 'confirmation.html?orderId='+ data.orderId
            // localStorage.clear();
        });
}
