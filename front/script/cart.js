// RECUPERER LES PRODUIT AJOUTER
const LS = JSON.parse(localStorage.getItem("products"));
main();

function main(){
    getData();
    calculateQuantity();
    calculatePrice();
    checkFormAndPostRequest();
}
/*=================================================================================================================*/
/*=================================================================================================================*/

// SUPPRIMER L INTERIEUR D ARTICLE
var section = document.querySelector('#cart__items')
while(section.firstChild)
    section.removeChild(section.firstChild)

/*=================================================================================================================*/
/*=================================================================================================================*/
function calculateQuantity ()  {
    // RECUPERER LES PRODUIT AJOUTER
    const LS = JSON.parse(localStorage.getItem("products"));
    //ON RECUPERE LA Qunatité DU LS
    const arrayQte = LS.map((q) => {
        return q.quantity
    });

// ON L ADDITIONNE
    let totalQte = 0;

    for (let i = 0; i < arrayQte.length; i++) {
        totalQte += Number(arrayQte[i]);
    }

// ON L INSERE DANS LA PAGE
    totalQuantity.innerHTML = totalQte;
};

function calculatePrice () {
    let prixTotal = 0;
    let totalPrice = document.querySelector('#totalPrice');
    // RECUPERER LES PRODUIT AJOUTER
    const LS = JSON.parse(localStorage.getItem("products"));

    for (let i = 0; i < LS.length; i++) {
        const dataApi = fetch(`http://localhost:3000/api/products/${LS[i]._id}`)
        dataApi.then(async (resData) => {
            const monCanap = await resData.json();
            prixTotal += Number(monCanap.price * LS[i].quantity);

            if( i === LS.length-1) {
                // ON L INSERE DANS LA PAGE
                totalPrice.innerHTML = prixTotal;
            }
        });
    }
};

function getData () {
    // CREATION DU PANIER
    for(let produitIndex in LS) {
        //récupérer le canapé via l'API grace à LS.id
        const dataApi = fetch(`http://localhost:3000/api/products/${LS[produitIndex]._id}`)
        dataApi.then(async (resData) => {
            const monCanap = await resData.json();

            // ARTICLE
            const article = document.createElement('article')
            article.classList.add('cart__item')
            section.appendChild(article)

            var id = LS[produitIndex]._id;
            article.setAttribute('data-id', id)

            var colors = LS[produitIndex].colors;
            article.setAttribute('data-color', colors)

            // IMG
            const productImg = document.createElement('div')
            productImg.classList.add('cart__item__img')
            article.appendChild(productImg)

            const img = document.createElement('img')
            productImg.appendChild(img);
            img.src = LS[produitIndex].imageUrl;
            img.alt = 'Photographie d\'un canapé'

            // Carte PRODUIT
            const cartProduct = document.createElement('div')
            cartProduct.classList.add('cart__item__content')
            article.appendChild(cartProduct)

            const productDescription = document.createElement('div')
            productDescription.classList.add('cart__item__content__description')
            cartProduct.appendChild(productDescription)

            // NAME
            const productName = document.createElement("h2");
            productDescription.appendChild(productName);
            productName.innerHTML = LS[produitIndex].name;

            // COLOR
            const productColor = document.createElement("p");
            productDescription.appendChild(productColor);
            productColor.innerHTML = LS[produitIndex].colors;

            //PRICE
            const productPrice = document.createElement("p");
            productDescription.appendChild(productPrice);
            productPrice.innerHTML =monCanap.price + " €";

            // SETTINGS
            const settings = document.createElement('div')
            settings.classList.add('cart__item__content__settings')
            cartProduct.appendChild(settings)

            // QTE INPUT
            const settingsQuantity = document.createElement('div')
            settingsQuantity.classList.add('cart__item__content__settings__quantity')
            settings.appendChild(settingsQuantity)

            const pInput = document.createElement('p')
            settingsQuantity.appendChild(pInput)
            pInput.innerHTML = 'Qté : '

            const input = document.createElement('input')
            settingsQuantity.appendChild(input)
            input.type = 'number'
            input.classList.add('itemQuantity')
            input.name = 'itemQuantity' + LS[produitIndex].colors;
            input.id = 'itemQuantity' + LS[produitIndex].colors;
            input.min = '1'
            input.max = '100'

            /*=================================================================================================================*/
            /*=================================================================================================================*/

            // CHANGEMENT DE LA VALEUR LORS DU CLICK
            input.addEventListener('change', (e) => {
                LS.find((item) => {
                    if (item._id === LS[produitIndex]._id && item.colors ===  LS[produitIndex].colors) {
                        LS[produitIndex].quantity = input.value;
                    }
                });
                localStorage.setItem("products", JSON.stringify(LS));
                calculateQuantity();
                calculatePrice();
            });


            /*=================================================================================================================*/
            /*=================================================================================================================*/

            var quantityValue = LS[produitIndex].quantity;
            input.setAttribute('value', quantityValue)

            // SUPPRIMER
            const remove = document.createElement('div')
            remove.classList.add('cart__item__content__settings__delete')
            settings.appendChild(remove)

            const removeP = document.createElement('p')
            removeP.classList.add('deleteItem')
            remove.appendChild(removeP)
            removeP.innerHTML = 'Supprimer'
            removeP.addEventListener('click', () => {
                // SUPPRIMER L'ELEMENT
                let supp = LS.find((el) => {
                    console.log(LS);
                    if (el._id === id && el.colors === colors) return true;
                })
                const indexToRemove = LS.indexOf(supp);
                LS.splice(indexToRemove, 1);
                // RE-SAUVEGARDER LA LISTE APRES SUPPRESSION
                localStorage.setItem("products", JSON.stringify(LS));

                article.remove();
                calculateQuantity();
                calculatePrice();
            });
        });
    }

}


/*=================================================================================================================*/
/*=================================================================================================================*/
function nameValid () {
    let inputName = document.querySelector("#firstName");
    let errorName = document.querySelector("#firstNameErrorMsg");
    if (/^[A-Za-z]{3,15}$/.test(inputName.value)){
        return true;
    }else {
        errorName.innerHTML = 'Veuillez rentrer un prénom valide !'
        return false;
    }
}

function lastNameValid () {
    let inputLastName = document.querySelector("#lastName");
    let errorLastName = document.querySelector("#lastNameErrorMsg");
    if (/^[A-Za-z]{3,15}$/.test(inputLastName.value)){
        return true;
    }else {
        errorLastName.innerHTML = 'Veuillez rentrer un nom valide !'
        return false;
    }
}

function adressValid () {
    let inputAdress = document.querySelector("#address");
    let errorAdress = document.querySelector("#addressErrorMsg");
    if(inputAdress.value.length >= 3){
        return true;
    }else{
        errorAdress.innerHTML = 'Veuillez saisir une adresse correcte ! Ayant au moins 3 caractères !'
        return false;
    }
}

function cityValid () {
    let inputCity = document.querySelector("#city");
    let errorCity = document.querySelector("#cityErrorMsg");
    if(inputCity.value.length >= 3){
        return true;
    }else{
        errorCity.innerHTML = 'Veuillez saisir une ville correcte ! Ayant au moins 3 caractères !'
        return false;
    }
}

function emailValid () {
    let inputMail = document.querySelector("#email");
    let errorMail = document.querySelector("#emailErrorMsg");
    if (/\S+@\S+\.\S+/.test(inputMail.value)){
        return true;
    }else {
        errorMail.innerHTML = 'Veuillez rentrer un email valide ! Exemple : test@test.fr'
        return false;
    }
}

// SAISIR LES DONNEES UTILISATEURS ET VALIDER LA COMMANDE

// On récupère les inputs depuis le DOM.
function checkFormAndPostRequest(){
    const submit = document.querySelector("#order");
    let inputName = document.querySelector("#firstName");
    let inputLastName = document.querySelector("#lastName");
    let inputAdress = document.querySelector("#address");
    let inputCity = document.querySelector("#city");
    let inputMail = document.querySelector("#email");

// on récupère les ERROR du DOM
    let errorName = document.querySelector("#firstNameErrorMsg");
    let errorLastName = document.querySelector("#lastNameErrorMsg");
    let errorAdress = document.querySelector("#addressErrorMsg");
    let errorCity = document.querySelector("#cityErrorMsg");
    let errorMail = document.querySelector("#emailErrorMsg");


// Lors d'un clic, si l'un des champs n'est pas rempli, on affiche une erreur, on empêche l'envoi du formulaire.
    submit.addEventListener("click", (e) => {
        if (!inputName.value || !inputLastName.value || !inputCity.value || !inputAdress.value || !inputMail.value) {
            errorName.innerHTML, errorLastName.innerHTML, errorAdress.innerHTML, errorCity.innerHTML, errorMail.innerHTML = "Vous devez renseigner tous les champs !";
            e.preventDefault();
        } else if (nameValid() && lastNameValid() && adressValid() && cityValid() && emailValid()) {
            // Si le formulaire est valide, le tableau productsBought contiendra un tableau d'objet qui sont les produits acheté, et order contiendra ce tableau ainsi que l'objet qui contient les infos de l'acheteur
            let id = LS.map((e) => {
                return e._id
            });

            let productsBought = [];
            id.push(productsBought)

            const order = {
                contact: {
                    firstName: inputName.value,
                    lastName: inputLastName.value,
                    address: inputAdress.value,
                    city: inputCity.value,
                    email: inputMail.value,
                },
                products: productsBought,
            };

            /*=================================================================================================================*/
            /*=================================================================================================================*/
            sendCart(order);
        }
    });
}

function sendCart (order) {
    // -------  Envoi de la requête POST au back-end --------
    // Création de l'entête de la requête
    const options = {
        method: "POST",
        body: JSON.stringify(order),
        headers: {"Content-Type": "application/json"},
    };

    // Envoie de la requête avec l'en-tête. On changera de page avec un localStorage qui ne contiendra plus que l'order id.
    fetch("http://localhost:3000/api/products/order", options)
        .then((response) => response.json())
        .then((data) => {
            localStorage.clear();
            //localStorage.setItem("orderId", data.orderId);

            //  On peut commenter cette ligne pour vérifier le statut 201 de la requête fetch. Le fait de préciser la destination du lien ici et non dans la balise <a> du HTML permet d'avoir le temps de placer les éléments comme l'orderId dans le localStorage avant le changement de page.
            document.location.href = "confirmation.html?orderid="+data.orderId;
        })
        .catch((err) => {
            alert("Il y a eu une erreur : " + err);
        });
}
