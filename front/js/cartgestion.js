//Appel de l'API
fetch (`http://localhost:3000/api/products/`)
.then((resp)=>{
    if(resp.ok){
        return resp.json();
    }
})


  

 

 

 
//Permet d'utiliser le bouton "ajouter au panier" et d'ajouter 1 produit dans le loacal storage
  document.getElementById('addToCart').addEventListener('click',function (e){
    addCart(`${productId}`)
  })