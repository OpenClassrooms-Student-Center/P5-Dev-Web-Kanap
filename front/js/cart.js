const myCart = localStorage.getItem('cart') != null && localStorage.getItem('cart') != undefined ? JSON.parse(localStorage.getItem('cart')) : []
let datas = []
async function getDatas(){
        const res = await fetch('http://localhost:3000/api/products')
        const datas = await res.json();

        /* Setting the global variable `datas` to the value of the parameter `d`. */
        init(datas)
        
        // Afficher le panier
        showCart(datas)

        // Ajoute la possibilité de supprimer un produit
        addPossibilityToRemoveProduct()

        // Ajoute la possibilité de modifier la quantité
        addPossibilityToUpdateQuantity()

    }

if(myCart.length > 0){
    getDatas()
}

function init(d){
    datas = d ;
}


// Affiche le panier en ajoutant également les tarifs
function showCart(datas){
    if(myCart.length > 0){
         for(let data of myCart){
            const index = datas.findIndex(product => product._id === data.id)
            const product = `
                <article class="cart__item" data-id="${data.id}" data-color="${data.color}">
                    <div class="cart__item__img">
                        ${data.image}
                    </div>
                    <div class="cart__item__content">
                        <div class="cart__item__content__description">
                            <h2>${data.name}</h2>
                            <p>${data.color}</p>
                            <p>${datas[index].price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} €</p>
                        </div>
                        <div class="cart__item__content__settings">
                            <div class="cart__item__content__settings__quantity">
                                <p>Qté : </p>
                                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${data.quantity}">
                            </div>
                            <div class="cart__item__content__settings__delete">
                                <p class="deleteItem">Supprimer</p>
                            </div>
                        </div>
                    </div>
                 </article>`

            // affiche produits
            const el = document.querySelector('#cart__items')
                   el.insertAdjacentHTML('beforeend', product)
        }

        // Affiche le prix total et nombre de produit
        getAllPrice(datas)
    }
}

function addPossibilityToRemoveProduct(){
    const button = document.querySelectorAll('.deleteItem')

    // add event listener on all button
    button.forEach((item) => {
        item.addEventListener('click', (e) => {

            if(confirm("Vous êtes sur le point de supprimer l'article ?") == true){

            // Get closest element to search ID
            const id = e.target.closest('article').getAttribute('data-id')
            const color = e.target.closest('article').getAttribute('data-color')

            // find in cart
            const index = myCart.findIndex(product => product.id === id && product.color === color)

            /* Removing the item from the array. */
            myCart.splice(index, 1)
            
            // Supprime sur le DOM
            e.target.closest('article').remove();

            // Met à jour le panier
            updateCart(myCart)
            }
        })
    })
}

function addPossibilityToUpdateQuantity(){
    const input = document.querySelectorAll('.itemQuantity')

    // add event listener on all button
    input.forEach((item) => {
        item.addEventListener('input', (e) => {

            // Get closest element to search ID
            const id = e.target.closest('article').getAttribute('data-id')
            const color = e.target.closest('article').getAttribute('data-color')

            // find in cart
            const index = myCart.findIndex(product => product.id === id && product.color === color)

            /* Checking if the value of the input is between 1 and 100. If it is, it sets the value of
            the quantity to the value of the input. If it is not, it alerts the user and sets the
            value of the input to the value of the quantity. */
            if(e.target.value <= 100 && e.target.value >= 1){
                myCart[index].quantity = e.target.value
            }
            else {
                alert(`La quantité doit être comprise entre 1 et 100 par produit`)
                e.target.value = myCart[index].quantity
            }
            
            // Met à jour le panier
            updateCart(myCart)
        })
    })
}

function updateCart(data){
    localStorage.setItem('cart', JSON.stringify(data))

    // Recalcul du tarif
    getAllPrice(datas)
}

function getAllPrice(d){
    let nbProduct = 0
    let totalPrice = 0
    for(let data of myCart){
        const index = d.findIndex(product => product._id === data.id)
        nbProduct += parseInt(data.quantity)
        totalPrice += parseInt(nbProduct * d[index].price)
    }
    // Affiche le total et nb produit
    document.querySelector('#totalQuantity').innerHTML = nbProduct
    document.querySelector('#totalPrice').innerHTML = totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
}


const submit = document.querySelector('#order')

submit.addEventListener('click', (e) => {
    // Empêche l'envoi du formulaire
    e.preventDefault();

    /* A regular expression that checks if the string contains any special characters. */
    const regExNoSpecial = /^([^0-9²&~"#'\/\(\[\]\)|_^@°{}=+*$£*µ%¨€!§:;.,?]*)$/
    const regExAddress = /^([^²&~"#'\(\[\]\)|_^@°{}=+*$£*µ%¨€!§:;.?]*)$/
    /* A regular expression that checks if the string is a valid email address. */
    const regMail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/

    // Récupère les données
    const prenom = document.querySelector('#firstName').value
    const nom = document.querySelector('#lastName').value
    const adresse = document.querySelector('#address').value
    const ville = document.querySelector('#city').value
    const email = document.querySelector('#email').value

    // Test if prenom > 3 caractères et pas de chiffres
    // console.log(regExNoSpecial.test(prenom))
    if(!regExNoSpecial.test(prenom) || prenom.length < 3){
        alert('Vous devez entrer un prénom valide')
        return
    }

    if(!regExNoSpecial.test(nom) || nom.length < 3){
        alert('Vous devez entrer un nom valide')
        return
    }

    if(!regExAddress.test(adresse) || adresse.length < 5){
        alert('Vous devez entrer une adresse valide')
        return
    }

    if(!regExAddress.test(ville) || ville.length < 5){
        alert('Vous devez entrer une ville valide')
        return
    }

    if(!regMail.test(email)){
        alert('Vous devez entrer une adresse mail valide')
        return
    }

    const productsID = []
    for(item of myCart){
        productsID.push(item.id)
    }

    const datas = {
        contact : {
            address: adresse,
            firstName: prenom,
            lastName: nom,
            city: ville,
            email
        },
        products : productsID
    }
    console.log(datas)

    fetch('http://localhost:3000/api/products/order', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body : JSON.stringify(datas)
    })
    .then(res => res.json())
    .then(data => {
        openModal(data.orderId)
        // empty cart
        localStorage.clear()
        // empty contact field
        document.querySelector('#firstName').value = ""
        document.querySelector('#lastName').value = ""
        document.querySelector('#address').value = ""
        document.querySelector('#city').value = ""
        document.querySelector('#email').value = ""

        // Empty Datas

        const orderId = data.orderId;
        document.location.href = "../html/confirmation.html" + "?orderId=" + orderId


    })
     
})

/**
 * It creates a modal, adds it to the DOM, and then removes it when the user clicks on it.
 * @param id - The id of the order
 */
function openModal(id) {
    // Create modal
    const modal = `
            <div class="modal-content" onClick="this.remove()">
                <div class="closebutton" data-dismiss="modal">X</div>
                <div class="modal-header">Commande terminée</div>
                <div class="modal-body">Commande numéro : ${id}</div>
            </div>`

    // Add modal to the DOM after body
       document.querySelector('body').insertAdjacentHTML('afterbegin', modal)
}