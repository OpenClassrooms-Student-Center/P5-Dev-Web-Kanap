// Section declaration
const section = document.querySelector('#cart__items');
const totalPriceContainer = document.querySelector ('#totalPrice')
const totalQuantityContainer = document.querySelector ('#totalQuantity')
 
// I verify my basket & parse
let basket = localStorage.getItem ('basket');
    if (basket === null){
        basket = [];
    }
    else {
        basket = JSON.parse(basket);
    }
// Function to create " html"  & send good data of product contains in local storage
function displayProducts(products) {
 
    products.forEach (function(product){
        const article = document.createElement('article');
        article.className ='cart__items',
        article.dataset.id = product.id;
 
        const divImg = document.createElement('div');
        divImg.className = "cart__item__img";
 
        const img = document.createElement('img');
        img.src = product.imageUrl;
        img.alt = "Photographie d'un canapé";
 
 
        const divContent = document.createElement('div');
        divContent.className = "cart__item__content";
 
        const divTitlePrice = document.createElement('div');
        divTitlePrice.className = "cart__item__content__titlePrice";
 
        const h2Title = document.createElement('h2');
        h2Title.innerHTML = `${product.name} (${product.color})`;
 
        const pPrice = document.createElement('p');
        pPrice.innerHTML = product.price + "€";
 
        const divSetting = document.createElement('div');
        divSetting.className = "cart__item__content__settings";
 
        const divSettingQuantity = document.createElement('div');
        divSettingQuantity.className = "cart__item__content__settings__quantity";
 
        const pQuantity = document.createElement('p');
        pQuantity.innerHTML = "Qté";
 
        const inputQuantity = document.createElement ('input');
        inputQuantity.type = "number";
        inputQuantity.name = "itemQuantity";
        inputQuantity.className = "itemQuantity";
        inputQuantity.min = 1;
        inputQuantity.max = 100;
        inputQuantity.value = product.quantity;
        inputQuantity.addEventListener('change', function(){
            for (let i = 0; i < basket.length;i++){
                if (basket[i].id === product.id && basket[i].color === product.color) {
                    basket[i].quantity = parseInt (inputQuantity.value);
                    console.log(inputQuantity.value)
                }
            }

        localStorage.setItem('basket', JSON.stringify(basket));
        totalProducts(products)
        })
 
 
        const divDelete = document.createElement ('div')
        divDelete.className = "cart__item__content__settings__delete";
 
        const pDelete = document.createElement('p');
        pDelete.className = "deleteItem";
        pDelete.innerHTML = "Supprimer du panier";
        pDelete.addEventListener('click',function(){
            for (let i = 0; i < basket.length;i++){
                if (basket[i].id === product.id && basket[i].color === product.color) {
                    basket[i].quantity = 0;
                    console.log(basket.quantity)
                }
            }
            basket = basket.filter(function(el){
                return el.quantity > 0;
            })
            localStorage.setItem('basket', JSON.stringify(basket));
            section.innerHTML = "";
            totalProducts(products)
            localStorage.setItem('basket', JSON.stringify(basket));
        })
 
        // I add to the article tag the link content
        divDelete.appendChild(pDelete)
 
        divSettingQuantity.appendChild(pQuantity);
        divSettingQuantity.appendChild(inputQuantity);
 
        divSetting.appendChild(divSettingQuantity);
 
 
        divTitlePrice.appendChild(h2Title);
        divTitlePrice.appendChild(pPrice);
 
 
        divImg.appendChild(img)
 
        divContent.appendChild(divTitlePrice)
        divContent.appendChild(divSetting)
        divContent.appendChild(divDelete)
 
        article.appendChild(divImg);
        article.appendChild(divContent);   
 
        section.appendChild(article);
 
    });
}
// function to calcule total price & total quantity
function totalProducts(products){
    let totalPrice = 0;
    let totalQuantity=0;
    products.forEach(function(product){
        totalPrice += product.price * product.quantity;
        totalQuantity += product.quantity;
    });

    totalPriceContainer.innerHTML = totalPrice;
    totalQuantityContainer.innerHTML = totalQuantity;
}
totalProducts(basket)
displayProducts(basket)

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
        
        orderButton.disabled = !allOk;
       
    })
}

formError (firstName,/^[a-zA-Z-\s]+$/,firstNameError,"Il n'y a que chez Elon Musk qu'un prénom contient un chiffre ou un symbole 😜","firstName" );
formError (lastName,/^[a-zA-Z-\s]+$/,lastNameError,"Seul un pape ou un roi a un chiffre ou un symbole dans son nom... 😜", "lastName" );
formError (city,/^[a-zA-Z-\s]+$/,cityError,"La ville pas le code postal svp  😜", "city" );
formError (email,/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,7}$/,emailError,"Bien tenté mais si tu veux commander, j'ai besoin d'un vrai email avec un vrai @ 😜", "email" );






// Transfer Client data to back
orderButton.addEventListener('click', async function (ev) {
    ev.preventDefault();
 
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