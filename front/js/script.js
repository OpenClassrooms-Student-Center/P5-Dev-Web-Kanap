//Appel de l'API et demande d'une réponse en .json
fetch ('http://localhost:3000/api/products/')
.then((resp)=>{
    if(resp.ok){
        return resp.json();
    }
})
//
.then((datas)=>{
    let html = '';
    //le paramètre 'datas' pour chaque élément.
    datas.forEach(element => {
        //doit créer le code html et y introduire les éléments de réponse de l'API.
        html += `
        <a href="./product.html?id=${element._id}">
            <article>
              <img src="${element.imageUrl}" alt="${element.altTxt}">
              <h3 class="productName">${element.name}</h3>
              <p class="productDescription">${element.description}</p>
            </article>
          </a>`
    });
    //Ensuite on appelle le parent du code qui a un id 'items' afin que le code soit écrit au bon endroit.
    const parentItems = document.getElementById('items');
    //On explique que le parents est du code HTML
    parentItems.innerHTML = html
})
//on crée un message d'erreur lorsque l'API ne nous retourne pas d'infos.
.catch((error)=>{
    document.getElementById('items').innerHTML = `Une erreur est survenue (${error})`
});