// single product 
var str = window.location.href;
var url = new URL(str);
var idProduct = url.searchParams.get("id");
let article = "";
const colorPicked = document. querySelector("#colors");
const quantityPicked = document.querySelector("#quantity");
console.log(idProduct);
getArticle();

function getArticle() {
    fetch("http://localhost:3000/api/products/" + idProduct)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then(async function (resultatAPI) {
        article = await resultatAPI;
        console.table(article);
        if (article){
            getPost(article);
        }
    })
    .catch((error) => {
        console.log("Une erreur est survenue");
    })
}
    
function getPost(article){
    let productImg = document.createElement("img");
    document.querySelector(".item__img").appendChild(productImg);
    productImg.src = article.imageUrl;
    productImg.alt = article.altTxt;

    let productName = document.getElementById('title');
    productName.innerHTML = article.name;

    let productPrice = document.getElementById('price');
    productPrice.innerHTML = article.price;

    let productDescription = document.getElementById('description');
    productDescription.innerHTML = article.description;

    for (let colors of article.colors){
        console.table(colors);
        let productColors = document.createElement("option");
        document.querySelector("#colors").appendChild(productColors);
        productColors.value = colors;
        productColors.innerHTML = colors;
    }
    addToCart(article);
}

//Add-to-cart 
function addToCart(article) {
    const btn_Panier = document.querySelector("#addToCart");

    btn_Panier.addEventListener("click", (event)=>{
        if (quantityPicked.value > 0 && quantityPicked.value <=100 && quantityPicked.value != 0){

    let chooseColor = colorPicked.value;
                
    let chooseQuantity = quantityPicked.value;

    let optionsProducts = {
        idProducts: idProduct,
        colorProduct: chooseColor,
        quantityProducts: Number(chooseQuantity),
        nameProduct: article.name,
        priceProduct: article.price,
        descriptionProduct: article.description,
        imgProduct: article.imageUrl,
        altImgProduct: article.altTxt
    };


    let produitLocalStorage = JSON.parse(localStorage.getItem("produit"));
    const popupConfirmation =() =>{
        if(window.confirm(`Votre commande ${chooseQuantity} ${article.name} ${chooseColor} est ajoutée au panier. Pour le consulter, cliquez sur OK`)){
            window.location.href ="cart.html";
        }
    }

    if (produitLocalStorage) {
    const resultFind = produitLocalStorage.find(
        (el) => el.idProducts=== idProduct && el.colorProduct === chooseColor);
        if (resultFind) {
            let newQuantity =
            parseInt(optionsProducts.quantityProducts) + parseInt(resultFind.quantityProducts);
            resultFind.quantityProducts = newQuantity;
            localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
            console.table(produitLocalStorage);
            popupConfirmation();
        } else {
            produitLocalStorage.push(optionsProducts);
            localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
            console.table(produitLocalStorage);
            popupConfirmation();
        }
    } else {
        produitLocalStorage =[];
        produitLocalStorage.push(optionsProducts);
        localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
        console.table(produitLocalStorage);
        popupConfirmation();
    }}
    });
}





