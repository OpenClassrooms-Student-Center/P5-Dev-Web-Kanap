// Récupération des produits de l'api avec une fonction async
async function getDatas(){
  // Avec la constante res on récupère les information des produits de l'api en utilisant fetch
  const res = await fetch('http://localhost:3000/api/products')
  const datas = await res.json()
  
  for(let data of datas){
    // J'utilise une boucle for pour récupérer mes produits dans la liste de produit de l'api. Avec la constante je crée le html du produit puis je lui insère les informations (id, url de l'img, texte alternatif, nom, description)
      const product = `
      <a href="./product.html?id=${data._id}">
      <article>
        <img src="${data.imageUrl}" alt="${data.altTxt}">
        <h3 class="productName">${data.name}</h3>
        <p class="productDescription">${data.description}</p>
      </article>
    </a>`

    // Je crée une constante section qui permet de selectionner la section avec l'id items et de lui insérer le contenu de la constante product
    const el = document.querySelector('#items')
           el.insertAdjacentHTML('beforeend', 
    product);
  } 
}
getDatas();
