const zoneKanaps = document.getElementById("items");

//Affichage du catalogue sur la page principale
fetch("http://localhost:3000/api/products/")
	.then((response) => response.json())
	.then((data) => {
		console.log(data);
		for (let champ of data) {
			const idKanap = champ._id;
			const imgKanap = champ.imageUrl;
			const imgAltKanap = champ.altTxt;
			const titleKanap = champ.name;
			const descriptionKanap = champ.description;
			zoneKanaps.innerHTML += `<a href="./product.html?id=${idKanap}">
        <article>
          <img src="${imgKanap}" alt="${imgAltKanap}">
            <h3 class="productName">${titleKanap}</h3>
            <p class="productDescription">${descriptionKanap}</p>
        </article>
    </a>`;
		}
	})
	//Retour d'une erreur dans la console en cas de pb. lors du fetch
  .catch(function (err) {
    console.log(err);
	});