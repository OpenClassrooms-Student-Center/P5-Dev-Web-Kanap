var str = window.location.href;
var url = new URL(str);
var idProduct = url.searchParams.get("id");
let article = "";

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
}






