
// Section declaration
const section = document.querySelector('#cart__items');
const totalPriceContainer = document.querySelector ('#totalPrice')
const totalQuantityContainer = document.querySelector ('#totalQuantity')


// function to manage display 0 product in basket
function nullBasket(){

    const noBasket = document.createElement ('p');
    noBasket.className = "cart__nobasket";
    noBasket.innerHTML = " Vous n'avez aucun produit dans votre panier";
    section.appendChild(noBasket);
    const returnHome = document.createElement ('a');
    returnHome.className = "cart__returnhome";
    returnHome.href = './index.html';
    returnHome.innerHTML = " Revenir à l'accueil";
    let priceDiv = document.querySelector (".cart__price");
    priceDiv.remove(priceDiv);

        
    section.appendChild(noBasket);
    section.appendChild(returnHome);
}
// I verify my basket & parse
let basket = localStorage.getItem ('basket');
    if (basket === null){
        basket = [];
    }
    else {
        basket = JSON.parse(basket);
    }

// Function to add quantity

function addQuantityEvent(el, product) {
    // listen change on input quantity
    el.addEventListener('change', function(){
        for (let i = 0; i < basket.length;i++){
            if (basket[i].id === product.id && basket[i].color === product.color) {
                basket[i].quantity = parseInt (el.value);
            }
        }
        // call new localstorage
        localStorage.setItem('basket', JSON.stringify(basket));
        //call function to adapt total quantity & price
        totalProducts();
    });
}

//Function to delete product in basket
function addDeleteEvent(el, product) {
    // Listen delete Button & adapt screenplay
    el.addEventListener('click',function(){
        if (confirm("Etes vous sur de vouloir supprimer ce produit ?")){
            for (let i = 0; i < basket.length;i++){
                if (basket[i].id === product.id && basket[i].color === product.color) {
                    basket[i].quantity = 0;
                }
            }
            basket = basket.filter(function(el){
                return el.quantity > 0;
            });
            localStorage.setItem('basket', JSON.stringify(basket));
            section.innerHTML = "";
            totalProducts();
            localStorage.setItem('basket', JSON.stringify(basket));
            displayProducts();
            orderButton.disabled = basket.length===0;
        } else{
            return
        }
    });
    
}

//function to simplify Element cration
function createProductElement(tagName, className) {
    const el = document.createElement(tagName);
    el.className = className;
    return el;
}

//function to create "HTML & CSS"
function createProduct(product) {
    const article = createProductElement('article', 'cart__items');
    const divImg = createProductElement('div', 'cart__item__img');
    const divContent = createProductElement('div', 'cart__item__content');
    const divTitlePrice = createProductElement('div', 'cart__item__content__titlePrice');
    const divSetting = createProductElement('div', 'cart__item__content__settings');
    const divSettingQuantity = createProductElement('div', 'cart__item__content__settings__quantity');
    const divDelete = createProductElement('div', 'cart__item__content__settings__delete');
    const pDelete = createProductElement('div', 'deleteItem');
    const img = document.createElement('img');
    const h2Title = document.createElement('h2');
    const pPrice = document.createElement('p');
    const pQuantity = document.createElement('p');
    const inputQuantity = createProductElement('input', 'itemQuantity');

    article.dataset.id = product.id;

    img.src = product.imageUrl;
    img.alt = "Photographie d'un canapé";

    h2Title.innerHTML = `${product.name} (${product.color})`;

    pPrice.innerHTML = numStr(product.price) + "€" + " " + "/ unité";

    pQuantity.innerHTML = "Qté";

    inputQuantity.type = "number";
    inputQuantity.name = "itemQuantity";
    inputQuantity.min = 1;
    inputQuantity.max = 100;
    inputQuantity.value = product.quantity;

    pDelete.innerHTML = "Supprimer du panier";

    divDelete.appendChild(pDelete);

    divSettingQuantity.appendChild(pQuantity);
    divSettingQuantity.appendChild(inputQuantity);

    divSetting.appendChild(divSettingQuantity);

    divTitlePrice.appendChild(h2Title);
    divTitlePrice.appendChild(pPrice);

    divImg.appendChild(img);

    divContent.appendChild(divTitlePrice);
    divContent.appendChild(divSetting);
    divContent.appendChild(divDelete);

    article.appendChild(divImg);
    article.appendChild(divContent);   

    section.appendChild(article);

    addQuantityEvent(inputQuantity, product);
    addDeleteEvent(pDelete, product);
}

//function to adapt screen display 
function displayProducts() {

    if (basket.length ===0){
        localStorage.removeItem("basket")
        nullBasket()
    }
 
    basket.forEach(createProduct);
}
// function  change display number with space for thousand
function numStr(number, separator = ' ') {
    number = '' + number;
    var result = '',
        cmpt = 0;
    while (number.match(/^0[0-9]/)) {
      number = number.substr(1);
    }
    for (var i = number.length-1; i >= 0; i--) {
      result = (cmpt != 0 && cmpt % 3 == 0) ? number[i] + separator + result : number[i] + result;
      cmpt++;
    }

    return result;
  }
// function to calcule total price & total quantity
function totalProducts(){
    let totalPrice = 0;
    let totalQuantity=0;
    basket.forEach(function(product){
        totalPrice += product.price * product.quantity;
        totalQuantity += product.quantity;
    });
    totalPriceContainer.innerHTML = numStr(totalPrice);
    totalQuantityContainer.innerHTML = totalQuantity;
}


totalProducts();
displayProducts();

// Forms declaration

let firstNameError = document.querySelector ('#firstNameErrorMsg');
let lastNameError = document.querySelector('#lastNameErrorMsg');
let adressError = document.querySelector ('#addressErrorMsg');
let cityError = document.querySelector ('#cityErrorMsg');
let emailError= document.querySelector ('#emailErrorMsg');

let firstName = document.querySelector ('#firstName');
let lastName = document.querySelector ('#lastName');
let email = document.querySelector ('#email');
let city = document.querySelector ('#city');
let address = document.querySelector ('#address')


//create object to manage input submit validation o form
let errors = {
    firstName: false,        
    lastName : false,
    city : false,
    email : false,
  }

let orderButton = document.querySelector('#order')

//validation of form
function formError (fieldElement,regex, fieldError, messageError, errorName){
    fieldElement.addEventListener('input',function(){
        if (regex.test(fieldElement.value)){
            fieldError.innerHTML = "";
            errors[errorName] = false;
        }
        else{
            fieldError.innerHTML = messageError;
            errors[errorName] = true;
        }
        let allOk = true; 
        for (let key in errors){
            if (errors[key]) {
                allOk = false;
            }
        }
        
        orderButton.disabled = !allOk || basket.length===0;
       
    })
}

formError (firstName,/^[a-zA-Z-\s]+$/,firstNameError,"Il n'y a que chez Elon Musk qu'un prénom contient un chiffre ou un symbole 😜","firstName" );
formError (lastName,/^[a-zA-Z-\s]+$/,lastNameError,"Seul un pape ou un roi a un chiffre ou un symbole dans son nom... 😜", "lastName" );
formError (city,/^[a-zA-Z-\s]+$/,cityError,"La ville pas le code postal svp  😜", "city" );
formError (email,/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,7}$/,emailError,"Bien tenté mais si tu veux commander, j'ai besoin d'un vrai email avec un vrai @ 😜", "email" );






// Transfer Client data to back end
orderButton.addEventListener('click', async function (ev) {
    ev.preventDefault();
    
    if (basket.length ===0){
        return
    } 
 
    let payload = {
        contact: {
            firstName: firstName.value,
            lastName: lastName.value,
            address: address.value,
            city: city.value,
            email: email.value,
        },
        products: basket.map(function (item) {
            return item.id;
        })
    }
 
    let res = await fetch('http://127.0.0.1:3000/api/products/order', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })

    // Verify res.ok 
    if (res.ok){
    let order = await res.json()
    window.location.href = `confirmation.html?order_id=${order.orderId}`
    }
    else{
        window.alert("Une erreur s'est produite.Veuillez reessayer ou nous contacter au 0649714823 !");
    }
})