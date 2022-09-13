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
    console.log(data);
    for (product of data) {
        document.getElementById("items").innerHTML += `
            <a href="./product.html?id=${product._id}">
    				<article>
    					<img src="${product.imageUrl}" alt="${product.altTxt}" />
    					<h3 class="productName">${product.name}</h3>
    					<p class="productDescription">${product.description}</p>
    				</article>
			    </a>
            `;
    }

    // A FAIRE
    // data.forEach(product => {
    //     let a = document.createElement('a');
    //     a.href = `./product.html?id=${product._id}`


    //     // faire le reste des boucles

    //     document.querySelector('#items').appendChild(a);
    // });


})

//si il y a une erreur
.catch(function(err) {
	console.log(err)
})