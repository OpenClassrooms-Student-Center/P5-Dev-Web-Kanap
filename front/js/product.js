// URLSerachParams pour selectionner les produits par leur ID
const params = new URLSearchParams(window.location.search);
const id = params.get('id');

// Fetch pour recuperer l'API + ID du produit
fetch(`http://localhost:3000/api/products/${id}`)
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function (item) {
    //   Creation balise image avec ses attributs
    const content = document.createElement('img');
    content.setAttribute('src', item.imageUrl);
    content.setAttribute('alt', item.altTxt);
    document.querySelector('.item__img').appendChild(content);

    //   Creation title price et description
    document.getElementById('title').innerText = item.name;
    document.getElementById('price').innerText = item.price;
    document.getElementById('description').innerText = item.description;

    //   Boucle choix couleur
    const colors = item.colors;
    colors.forEach((color) => {
      let createColors = document.createElement('option');
      createColors.setAttribute('value', `${color}`);
      createColors.innerText = `${color}`;
      document.querySelector('#colors').appendChild(createColors);
    });

    //   Ajout quantite 1
    let quantityCart = document.getElementById('quantity');
    quantityCart.setAttribute('value', '1');

    // ************************* CART ********************

    const addToCart = document.querySelector('#addToCart');
    //   Ecouter le click
    addToCart.addEventListener('click', function () {
      // Objets selectionnes
      const product = {
        name: item.name,
        _id: item._id,
        color: document.querySelector('#colors').value,
        quantity: parseInt(document.getElementById('quantity').value),
      };
      let basket = [];
      // Définir messages erreur/saisie non valide
      if (
        product.color == '' ||
        product.quantity > 100 ||
        product.quantity == 0
      ) {
        alert('Choisissez une couleur et/ou une quantité valide!');
      } else {
        // on definie le LocalStorage
        if (localStorage.getItem('products') != null) {
          basket = JSON.parse(localStorage.getItem('products'));
          let foundProduct = true;
          basket.forEach((i) => {
            //boucle foreach pour retrouver dans le ls le produit avec même id/couleur
            if (i._id == product._id && i.color == product.color) {
              // si il y a un produit avec le meme id et couleur
              i.quantity = i.quantity + product.quantity;
              foundProduct = false;
            }
          });
          // si la condition foundProduct est vrai on push le produit dans basket
          if (foundProduct) {
            basket.push(product);
          }
        } else {
          // si le produit n'existe pas dans le ls
          basket.push(product);
        }
        //  *************localstorage**********
        localStorage.setItem('products', JSON.stringify(basket));
        alert('produit ajouté au panier!');
      }
    });
  })
  .catch(function (err = 'Une erreur est survenue') {
    console.log(err); // Message d'erreur
  });