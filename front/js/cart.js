// Je crée les articles dans la section 
const section = document.querySelector('#cart__items');
 
// I verify my basket & parse
let basket = localStorage.getItem ('basket');
    if (basket === null){
        basket = [];
    }
    else {
        basket = JSON.parse(basket);
    }
// Function to create " html"  & send good data of product contains in local storage
function laBiteABidule(sniff) {
 
    sniff.forEach (function(prout){
        const article = document.createElement('article');
        article.className ='cart__items',
        article.dataset.id = prout.id;
 
        const divImg = document.createElement('div');
        divImg.className = "cart__item__img";
 
        const img = document.createElement('img');
        img.src = prout.imageUrl;
        img.alt = "Photographie d'un canapé";
 
 
        const divContent = document.createElement('div');
        divContent.className = "cart__item__content";
 
        const divTitlePrice = document.createElement('div');
        divTitlePrice.className = "cart__item__content__titlePrice";
 
        const h2Title = document.createElement('h2');
        h2Title.innerHTML = prout.name;
 
        const pPrice = document.createElement('p');
        pPrice.innerHTML = prout.price + "€";
 
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
        inputQuantity.value = prout.quantity;
        inputQuantity.addEventListener('change', function(){
            for (let i = 0; i < basket.length;i++){
                if (basket[i].id === prout.id && basket[i].color === prout.color) {
                    basket[i].quantity = parseInt (inputQuantity.value);
                    console.log(inputQuantity.value)
                }
            }
        })
        localStorage.setItem('basket', JSON.stringify(basket));
 
 
        const divDelete = document.createElement ('div')
        divDelete.className = "cart__item__content__settings__delete";
 
        const pDelete = document.createElement('p');
        pDelete.className = "deleteItem";
        pDelete.innerHTML = "Supprimer du panier";
        pDelete.addEventListener('click',function(){
            for (let i = 0; i < basket.length;i++){
                if (basket[i].id === prout.id && basket[i].color === prout.color) {
                    basket[i].quantity = 0;
                    console.log(basket.quantity)
                }
            }
        })
        basket = basket.filter(function(el){
            return el.quantity > 0;
        })
        localStorage.setItem('basket', JSON.stringify(basket));
 
 
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
 
laBiteABidule(basket)