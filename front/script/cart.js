// RECUPERER LES PRODUIT AJOUTER
const LS = JSON.parse(localStorage.getItem("products"));

/*=================================================================================================================*/
/*=================================================================================================================*/

// SUPPRIMER L INTERIEUR D ARTICLE
var section = document.querySelector('#cart__items')
while(section.firstChild)
    section.removeChild(section.firstChild)

/*=================================================================================================================*/
/*=================================================================================================================*/
const calculateQuantity = () => {
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
const calculatePrice = () => {
    let prixTotal = 0;
    let totalPrice = document.querySelector('#totalPrice');
    // RECUPERER LES PRODUIT AJOUTER
    const LS = JSON.parse(localStorage.getItem("products"));

    for (let i = 0; i < LS.length; i++) {
        prixTotal += Number(LS[i].price * LS[i].quantity);
    }

// ON L INSERE DANS LA PAGE
    totalPrice.innerHTML = prixTotal;
};

// CREATION DU PANIER
for(let produitIndex in LS) {
    console.log(produitIndex);
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
    productPrice.innerHTML = LS[produitIndex].price + " €";

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
    input.name = 'itemQuantity'
    input.min = '1'
    input.max = '100'

    /*=================================================================================================================*/
    /*=================================================================================================================*/

    // CHANGEMENT DE LA VALEUR LORS DU CLICK
    const result = document.querySelector(".itemQuantity");

    input.addEventListener('change', (e) => {
        result.value = `${e.target.value}`;
        LS.find((item) => {
            if (item._id === LS[produitIndex]._id && item.colors ===  LS[produitIndex].colors) {
                LS[produitIndex].quantity = result.value;
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
            console.log('on compare lid', el.colors, 'et ', LS[produitIndex].colors);
            if (el._id === LS[produitIndex]._id && el.colors === LS[produitIndex].colors) return true;
        })
        console.log(supp, LS);
        const indexToRemove = LS.indexOf(supp);
        console.log(indexToRemove);
        LS.splice(indexToRemove, 1);
        // RE-SAUVEGARDER LA LISTE APRES SUPPRESSION
        localStorage.setItem("products", JSON.stringify(LS));

        // RECHARGEMENT DE LA PAGE
       window.location.href = "cart.html"
    });

}

calculateQuantity();
calculatePrice();



// SUPPRESSION A RETRAVAILLER
/*function removeFromCart(indexProduct){

}

const deleteBtns = Array.prototype.slice.call(document.querySelectorAll(".deleteItem"))

deleteBtns.map((v,i) => v.addEventListener('click', () => removeFromCart(i)))
console.log(deleteBtns)


//const listProducts = LS.get('products')
//const newListProducts = LS.splice(indexToRemove,1)
//LS.set('products', JSON.stringify(newListProducts))*/

/*=================================================================================================================*/
/*=================================================================================================================*/





/*=================================================================================================================*/
/*=================================================================================================================*/




/*=================================================================================================================*/
/*=================================================================================================================*/

// SAISIR LES DONNEES UTILISATEURS ET VALIDER LA COMMANDE

// On récupère les inputs depuis le DOM.
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
    } else {

        // Si le formulaire est valide, le tableau productsBought contiendra un tableau d'objet qui sont les produits acheté, et orderClient contiendra ce tableau ainsi que l'objet qui contient les infos de l'acheteur
        let productsBought = [];
        productsBought.push(LS);

        const orderClient = {
            contact: {
                firstName: inputName.value,
                lastName: inputLastName.value,
                city: inputCity.value,
                address: inputAdress.value,
                email: inputMail.value,
            },
            products: productsBought,
        };

        /*=================================================================================================================*/
        /*=================================================================================================================*/

        // -------  Envoi de la requête POST au back-end --------
        // Création de l'entête de la requête
        const options = {
            method: "POST",
            body: JSON.stringify(orderClient),
            headers: { 'Content-Type': 'application/json',
                        'Accept': 'application/json'}
        };

        /*// Préparation du prix pour l'afficher sur la prochaine page
        priceConfirmation = prix.split(" :");*/

        // Envoie de la requête avec l'en-tête. On changera de page avec un localStorage qui ne contiendra plus que l'order id et le prix.
        fetch("http://localhost:3000/api/products/order", options)
            .then((response) => response.json())
            .then((data) => {
                localStorage.clear();
                console.log(data)
                localStorage.setItem("orderId", data.orderId);

                //  On peut commenter cette ligne pour vérifier le statut 201 de la requête fetch. Le fait de préciser la destination du lien ici et non dans la balise <a> du HTML permet d'avoir le temps de placer les éléments comme l'orderId dans le localStorage avant le changement de page.
                document.location.href = "confirmation.html";
            })
            .catch((err) => {
                console.log("Il y a eu une erreur : " + err);
            });
    }
});
