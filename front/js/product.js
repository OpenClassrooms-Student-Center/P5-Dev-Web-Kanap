// recuperation of product id

var parsedUrl = new URL(window.location.href);

//Verify Id recuperation
console.log(parsedUrl.searchParams.get("id"));

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

//function create price
function setPrice(price){
    const priceProduct = document.querySelector ('#price');
    priceProduct.innerHTML = price.price;
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
    


//Load API
fetch(`http://localhost:3000/api/products/${idProduct}`)

.then(function(res) {
    return res.json();
})  // i ask to parse the response as JSON

.then (function (item){

    setImage(item)
    setPrice (item)
    setName (item)
    setDescription (item)
    setColor (item.colors)  
    /// add element to say item is a product
    product = item
})

//I decalre product to inialise the number
let product =null;
// i add a event on button and define a function addtobasket
let button = document.querySelector('#addToCart')
button.addEventListener('click', function(addToBasket) {


//Find & catch informations
let quantityItem = document.querySelector('#quantity').value;
const colorItem = document.querySelector ('#colors').value;

const quantityItemParsed = parseInt(quantityItem, 10);
console.log (quantityItemParsed)


// Verify the product
if (product===null) {
    return
}
if (colorItem === ""){
    window.alert("Fucking customer, choose a color ! shit !!!! "); 
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
        color : colorItem,
        quantity : quantityItemParsed,
    })


}
localStorage.setItem('basket', JSON.stringify(basket));

if (colorItem ==="") {
    return
}
else{
const myBasket = document.querySelector('#seeButton');
const myBasketButton = document.createElement('button');
myBasketButton.innerHTML ="Voir mon panier";
const linkMyBasket = document.createElement ('a');
linkMyBasket.href = `./cart.html`;

linkMyBasket.appendChild(myBasketButton);
myBasket.appendChild(linkMyBasket);
}


})

