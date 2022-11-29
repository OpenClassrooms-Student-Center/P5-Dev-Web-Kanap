// Récupération de l'id du produit 
const Url = new URL(document.location).searchParams;
const productId = Url.get('id');

// Je récupère les information du produit 
async function getDatas() {
	// Récupération des info produit en utilisant le lien de l'api du listing produit + l'url du produit
	const res = await fetch('http://localhost:3000/api/products/' + productId);
	const data = await res.json();

	// Selection des différentes zones d'affichage dans le html puis ajout des information 
	document.querySelector('title').innerHTML = data.name;
	document.querySelector('.item__img').innerHTML = `<img src="${data.imageUrl}" alt="${data.altTxt}">`;
	document.querySelector('#title').innerHTML = data.name;
	document.querySelector('#price').innerHTML = data.price;
	document.querySelector('#description').innerHTML = data.description;

	// Création d'une boucle for pour ajouter les déclinaison de couleur
	for (option of data.colors) {
		const color = `<option value="${option}">${option}</option>`;
		document.querySelector('#colors').insertAdjacentHTML('beforeend', color);
	}
}
// Lancement de la fonction
getDatas();

// Ajout des produits au localStorage
document.querySelector('#addToCart').addEventListener('click', () => {
	const color = document.querySelector('#colors').value;
	const quantity = document.querySelector('#quantity').value;

	if (color == '') {
		alert('Choisissez une couleur');
		return;
	}

	// si(quantitée est inférieure à 1 ou quantitée est supérieure à 100)

	if (quantity < 1 || quantity > 100) {
		alert('Choisissez une quantitée comprise entre 1 et 100');
		return;
	}

	addToCart();
});
// Crée la fonction add to cart
function addToCart() {
//Utiliser une ternaire
	const cart =
		localStorage.getItem('cart') != null || localStorage.getItem('cart') != undefined
			? JSON.parse(localStorage.getItem('cart'))
			: [];

//Récupère des informations produit dans des constantes (color, quantité, nom, image)
    const color = document.querySelector('#colors').value;
	const quantity = parseInt(document.querySelector('#quantity').value);
	const name = document.querySelector('#title').innerHTML;
	const image = document.querySelector('.item__img').innerHTML;

    // Crée le produit en lui attribuant les informations (id, couleur, image, nom et quantité)
	const product = {
		id: productId,
		color,
		image,
		quantity,
		name
	};

	// Si le produit n'existe pas dans le localstorage, on le crée et on le push
	if (cart.length <= 0) {
		cart.push(product);
		localStorage.setItem('cart', JSON.stringify(cart));
		alert('Produit ajouté au panier');
		return;
	}
	
	// Si un élément est déjà  au panier, utiliser un find index pour tester si la couleur et l'id sont identique au produit à ajouter
	const index = cart.findIndex(product => product.id === productId && product.color === color);

	// Si le produit existe
	if (index != -1) {
		// Mettre à jour le produit
		const newQuantity = quantity + cart[index].quantity;
		// Créer une condition pour limiter la nouvelle quantitée à 100 dans le localstorage 
		if (newQuantity > 100){
			alert('Trop de produit');
			return;
		} 
		cart[index].quantity += quantity
		localStorage.setItem('cart', JSON.stringify(cart))
		alert('La quantité du produit a été mise à jour')
		return
	}
	cart.push(product)
	localStorage.setItem('cart', JSON.stringify(cart))
	alert('Le produit à été ajouté au panier') 
}
