// URLSerachParams pour selectionner les produits par leur ID
const params = new URLSearchParams(window.location.search);
const id = params.get('id');


// ------------------------------------------------
// ------------------------------------------------
// Messages d'erreur/validation

// function messageTime() {
//   document
//     .querySelector('.item__content__addButton')
//     .insertAdjacentHTML(
//       'afterend',
//       `<p></p>`)
//     );
// }
// function messageConfirmation() {
//     document
//       .querySelector('.item__content__addButton')
//       .insertAdjacentHTML('afterend', `<p>produit ajouté au panier</p>`);
//     // setTimeout(messageTime, 300);
// }
// function messageError() {
//     document
//       .querySelector('.item__content__settings__quantity')
//       .insertAdjacentHTML(
//         'afterend',
//         `<p>merci de choisir une couleur et/ou quantité valide</p>`);
    // setTimeout(messageTime, 1000);
// }


// -------------------------------------------------
// -------------------------------------------------
// function getCart(products) {
//   return JSON.parse(localStorage.getItem(products));
// }

// function saveCart(products, basket) {
//   localStorage.setItem(products, JSON.stringify(basket));
// }
// ------------------------------------------------
// ------------------------------------------------



// -------------------------------------------------
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

    // Ajout quantite 1
    let quantityCart = document.getElementById('quantity');
    quantityCart.setAttribute('value', '1');

    // ************************* CART ********************
    const addToCart = document.querySelector('#addToCart');
    //   Ecouter le click
    addToCart.addEventListener('click', function () {
      // Objets selectionnes
      const product = {
        img: item.imageUrl,
        alt: item.altTxt,
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
        alert('merci de choisir une couleur et/ou quantité valide');
        // messageError();
      } else {
        if (localStorage.getItem('products') != null) {
          basket = JSON.parse(localStorage.getItem('products'));
          let foundProduct = true;
          let quantityFoundProduct = 0;
          basket.forEach((i) => {
            //boucle foreach pour retrouver dans le ls le produit avec même id/couleur
            if (i._id == product._id && i.color == product.color) {
              quantityFoundProduct = parseInt(i.quantity);
              // si il y a un produit avec le même id et couleur
             const totalQuantity = parseInt(i.quantity) + product.quantity;
              if (totalQuantity >= 100) {
                foundProduct = false;
                alert('le panier ne peut pas contenir plus de 100 articles');
              }
            }
          });
          // si la condition foundProduct est vrai on push le produit dans basket
          if (foundProduct) {
            product.quantity = product.quantity + quantityFoundProduct;
            basket.push(product);
          }
        } else {
          // si le produit n'existe pas dans le ls
          basket.push(product);
        }
      }
        // on definie le LocalStorage
        
        //  *************localstorage**********
      localStorage.setItem('products', JSON.stringify(basket));
      alert('produit ajouté au panier!');
      // messageConfirmation();
        
    });
  })
  .catch(function (err = 'Une erreur est survenue') {
    console.log(err); // Message d'erreur
  });