//API fetch est l'endroit ou elle ce situe
fetch ('http://localhost:3000/api/products/')
//.then fais un appel a l'api, il demande une reponse
.then((resp)=>{
    //si la reponse est ok
    if(resp.ok){
        //alors on veut une reponse en json
        return resp.json();
    }
})
//appel de l'API
.then((products)=>{
    let html = '';
    //le paramètre 'product' pour chaque élément.
    products.forEach(product => {
        //doit créer le code html et y introduire les éléments de réponse de l'API.
        html += `
        <a href="./product.html?id=${product._id}">
            <article>
              <img src="${product.imageUrl}" alt="${product.altTxt}">
              <h3 class="productName">${product.name}</h3>
              <p class="productDescription">${product.description}</p>
            </article>
          </a>`
    });
    //Ensuite on appelle le parent du code qui a un id 'items' afin que le code soit écrit au bon endroit.
    const parentItems = document.getElementById('items');
    //On explique que le parents est du code HTML (qu'est ce que le inner.html)
    parentItems.innerHTML = html
})
//on crée un message d'erreur lorsque l'API ne nous retourne pas d'infos.
.catch((error)=>{
    document.getElementById('items').innerHTML = `Une erreur est survenue (${error})`
});