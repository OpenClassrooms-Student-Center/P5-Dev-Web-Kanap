// recuperation of product id

var parsedUrl = new URL(window.location.href);


// declare id
let idProduct = parsedUrl.searchParams.get("id");


//function create img
function setImage(info){
    const div = document.querySelector('.item__img');
    const img = document.createElement('img');
    img.src = info.imageUrl;
    img.alt = info.altTxt;
    div.appendChild(img);
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

//function create price
function setPrice(price){
    const priceProduct = document.querySelector ('#price');
    priceProduct.innerHTML = numStr(price.price);
}
//function  create name
function setName (name){

    const h1 = document.querySelector('#title');
    h1.innerHTML = name.name; 
}
function setDescription(description){
    const desc = document.querySelector ('#description')
    desc.innerHTML = description.description; 
}
//function loop color
function setColor (colors){
    const select = document.querySelector ('#colors');
    for (let color of colors){
        const option = document.createElement ('option');
        option.value = color;
        option.innerText = color;
        select.appendChild(option);
    }

}
    
const section = document.querySelector('section.item');
section.style.display = 'none';

//Load API
fetch(`http://localhost:3000/api/products/${idProduct}`)
// prendre en compte une erreur api
.then(function(res) {
    if (res.ok=== false){
        return null;
    }
    return res.json();
})  // i ask to parse the response as JSON

.then (function (item){
    if (item===null){
        window.location.href = "index.html";
        return;
    }
    section.style.display = 'flex';
    setImage(item);
    setPrice (item);
    setName (item);
    setDescription (item);
    setColor (item.colors) ; 
    /// add element to say item is a product
    product = item;
})

//I decalre product to inialise the number & add product null
let product =null;
let addProductButton = false;

// i add a event on button and define a function addtobasket

let button = document.querySelector('#addToCart')
button.addEventListener('click', function(addToBasket) {


//Find & catch informations
    let quantityItem = document.querySelector('#quantity').value;
    const colorItem = document.querySelector ('#colors').value;

    const quantityItemParsed = parseInt(quantityItem, 10);
    console.log (quantityItemParsed)
    const priceParsed = parseInt(product.price, 10);
    console.log (priceParsed)

    // Verify the product
    if (product===null ) {
        return
    }
    if (colorItem === ""){
        window.alert("Customer, choose a color or die ☠️😁 !! "); 
        return
    }


    // existant basket ?
    let basket = localStorage.getItem ('basket');
    if (basket === null){
        basket = [];
    }
    else {
        basket = JSON.parse(basket);
    }


    //verify basket to say if i have already the same product and add quantity on the same product
    let allreadyInBasket = false;
    for (let i = 0; i < basket.length;i++){
        if (basket[i].id === idProduct && basket[i].color === colorItem) {
            allreadyInBasket = true;
            basket[i].quantity += quantityItemParsed;
        }
    }
    //If not, product push in local storage
    if (allreadyInBasket === false && colorItem!= "") {
        basket.push({
            id: idProduct,
            name: product.name,
            price : product.price,
            color : colorItem,
            quantity : quantityItemParsed,
            imageUrl: product.imageUrl,

        })


    }
    localStorage.setItem('basket', JSON.stringify(basket));


    //Add button to see Basket
    if (colorItem ==="" || addProductButton === true) {
        return
    }
    else{

        const myBasket = document.querySelector('#seeButton');
        const myBasketButton = document.createElement('button');
        myBasketButton.innerHTML ="Voir mon panier";
        const linkMyBasket = document.createElement ('a');
        linkMyBasket.href = `./cart.html`;

        addProductButton = true;

        linkMyBasket.appendChild(myBasketButton);
        myBasket.appendChild(linkMyBasket);
    }

})

