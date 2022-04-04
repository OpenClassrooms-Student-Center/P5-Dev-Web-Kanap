// RECUPERER LES PRODUIT AJOUTER
let LS = JSON.parse(localStorage.getItem("products"));



// SUPPRIMER L INTERIEUR D ARTICLE
var section = document.querySelector('#cart__items')
while(section.firstChild)
    section.removeChild(section.firstChild)



// CREATION DU PANIER
for(let produit in LS){
    // ARTICLE
    const article = document.createElement('article')
    article.classList.add('cart__item')
    /*article.data-id = '{product-ID2}'
    article.data-color = '{product-color}'*/
    section.appendChild(article)

    // IMG
    const productImg = document.createElement('div')
    productImg.classList.add('cart__item__img')
    article.appendChild(productImg)

    const img = document.createElement('img')
    productImg.appendChild(img);
    img.src = LS[produit].imageUrl;
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
    productName.innerHTML = LS[produit].name;

    // COLOR
    const productColor = document.createElement("p");
    productDescription.appendChild(productColor);
    productColor.innerHTML = LS[produit].colors;

    //PRICE
    const productPrice = document.createElement("p");
    productDescription.appendChild(productPrice);
    productPrice.innerHTML = LS[produit].price + " €";

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
    input.type = 'number'
    input.classList.add('itemQuantity')
    input.name = 'itemQuantity'
    input.min = '1'
    input.max = '100'

    var quantityValue = LS[produit].quantity;
    input.setAttribute('value', quantityValue)

    settingsQuantity.appendChild(input)

    // SUPPRIMER
    const remove = document.createElement('div')
    remove.classList.add('cart__item__content__settings__delete')
    settings.appendChild(remove)

    const removeP = document.createElement('p')
    removeP.classList.add('deleteItem')
    remove.appendChild(removeP)
    removeP.innerHTML = 'Supprimer'
}