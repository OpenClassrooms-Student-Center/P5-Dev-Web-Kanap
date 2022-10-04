// Récupération des produits via l'API 
fetch("http://localhost:3000/api/products")

.then(function(response) {
    console.log(response) //afficher le resultat de la requette 
    if (response.ok){
        return response.json();
    }
})

//afficher les produits sur la page d'acceuil
.then(function(data){

    data.forEach(product => {
        let a = document.createElement("a");
        a.href = "./product.html?id=" + product._id;
        document.querySelector('#items').appendChild(a);

        let article = document.createElement("article");
        a.appendChild(article);

        let image = document.createElement("img");
        image.src = product.imageUrl;
        image.alt = product.altText;
        article.appendChild(image);

        let h3 = document.createElement("h3");
        h3.textContent = product.name;
        article.appendChild(h3);

        let p = document.createElement("p");
        p.textContent = product.description;
        article.appendChild(p);
    })

})

//si il y a une erreur
.catch(function(err) {
	console.log(err)
})