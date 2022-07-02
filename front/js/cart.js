fetch('http://localhost:3000/api/products')
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function (cart) {
    console.log(cart);
    if (localStorage.getItem('products') != null) {
      basket = JSON.parse(localStorage.getItem('products'));
      //   Boucle pour afficher les produits dans le panier
      basket.forEach(function (product) {
        for (let canap of cart) {
          if (canap._id == product._id) {
            const article = document
              .querySelector('#cart__items')
              .appendChild(document.createElement('article'));
            article.setAttribute('class', 'cart__item');
            article.setAttribute('data-id', canap._id);
            article.setAttribute('data-color', product.color);
            // Afficher les images
            const divImg = article.appendChild(document.createElement('div'));
            divImg.setAttribute('class', 'cart__item__img');
            let img = divImg.appendChild(document.createElement('img'));
            img.setAttribute('src', product.img);
            img.setAttribute('alt', product.alt);
            //   Afficher div container
            const divContent = article.appendChild(
              document.createElement('div')
            );
            divContent.setAttribute('class', 'cart__item__content');
            //   Afficher div description
            let divContentDescr = divContent.appendChild(
              document.createElement('div')
            );
            divContentDescr.setAttribute(
              'class',
              'cart__item__content__description'
            );
            //   Afficher titre - couleur - prix
            let titre = divContentDescr.appendChild(
              document.createElement('h2')
            );
            titre.innerText = canap.name;
            let clr = divContentDescr.appendChild(document.createElement('p'));
            clr.innerText = product.color;
            //   prix total en fonction de la quantité
            let totalProductPrice = canap.price * product.quantity;

            let price = divContentDescr.appendChild(
              document.createElement('p')
            );
            price.innerText = totalProductPrice + ' €';
            //   Afficher div settings
            const divContentSett = divContent.appendChild(
              document.createElement('div')
            );
            divContentSett.setAttribute(
              'class',
              'cart__item__content__settings'
            );
            const divContentSettQnt = divContentSett.appendChild(
              document.createElement('div')
            );
            //   Afficher quantité
            divContentSettQnt.setAttribute(
              'class',
              'cart__item__content__settings__quantity'
            );
            let qte = divContentSettQnt.appendChild(
              document.createElement('p')
            );
            qte.innerText = 'Qté : ';
            let input = divContentSettQnt.appendChild(
              document.createElement('input')
            );
            input.setAttribute('type', 'number');
            input.setAttribute('class', 'itemQuantity');
            input.setAttribute('name', 'itemQuantity');
            input.setAttribute('min', 1);
            input.setAttribute('max', 100);
            input.setAttribute('value', product.quantity);
            const divContentSettDlt = divContentSett.appendChild(
              document.createElement('div')
            );
            divContentSettDlt.setAttribute(
              'class',
              'cart__item__content__settings__delete'
            );
            let deleteItem = divContentSettDlt.appendChild(
              document.createElement('p')
            );
            deleteItem.setAttribute('class', 'deleteItem');
            deleteItem.innerText = 'Supprimer';
          }
        }
      });
    } else {
      console.log('panier vide');
      alert('Le panier est vide!');
    }
    totalCartQuantity(); /*total quantity */
    totalProductPrice(); /**total product price */
    changeQuantity(); /**changer quantité */
    deleteProduct(); /**supprimer article */
  })
  .catch(function (err = 'Une erreur est survenue') {
    console.log(err); // Message d'erreur
  });

// Affiche total quantité produits dans le panier
function totalCartQuantity() {
  let itemQuantity = document.getElementsByClassName('cart__item');
  let totalQuantity = 0;
  for (item of itemQuantity) {
    totalQuantity += parseInt(item.querySelector('.itemQuantity').value);
    if (totalQuantity > 100) {
      alert(
        'Impossible de ajouter plus de 100 articles dans le panier!     Merci de supprimer certains articles.'
      );
      return;
    }
  }
  document.querySelector('#totalQuantity').innerText = totalQuantity;
  console.log('total quantity:', totalQuantity);
}

// Afficher le prix total
function totalProductPrice() {
  let itemPrice = document.getElementsByClassName('cart__item');
  let totalPrice = 0;
  for (item of itemPrice) {
    totalPrice += parseInt(
      item.querySelector('.cart__item__content__description').children[2]
        .innerText
    );
  }
  document.querySelector('#totalPrice').innerText = totalPrice;
  console.log('total price:', totalPrice);
}

// Fonction pour changer la quantité
function changeQuantity() {
  const newQuantity = document.querySelectorAll('.cart__item');
  newQuantity.forEach((change) => {
    const id = change.closest('article').getAttribute('data-id');
    const color = change.closest('article').getAttribute('data-color');
    //   Event pour changer la quantité
    change.addEventListener('change', (el) => {
      let basket = JSON.parse(localStorage.getItem('products'));
      for (qt of basket) {
        if (qt._id == id && qt.color == color) {
          // On change la quantité dans le ls avec le nouveau input
          qt.quantity = el.target.value;
          if (qt.quantity > 0 && qt.quantity <= 100) {
            localStorage.products = JSON.stringify(basket);
            window.location.reload();
            totalCartQuantity();
            totalProductPrice();
          } else {
            alert("La quantité ajouté n'est pas valide");
            window.location.reload();
          }
        }
      }
    });
  });
}

// Fonction pour supprimer un article
function deleteProduct() {
  const btns = document.querySelectorAll('.deleteItem');
  btns.forEach((btn) => {
    const article = btn.closest('article');
    btn.addEventListener('click', () => {
      let basket = JSON.parse(localStorage.getItem('products'));
      console.log(basket);
      for (let i = 0; i < basket.length; i++) {
        if (
          article.dataset.id == basket[i]._id &&
          article.dataset.color == basket[i].color
        ) {
          document.querySelector('#cart__items').removeChild(article);
          basket.splice(i, 1);
          localStorage.products = JSON.stringify(basket);
          window.location.reload();
          if (i <= 0) {
            localStorage.removeItem('products', JSON.stringify(basket));
            alert('le panier est vide!');
          }
        }
      }

      alert('Le produit a été supprimé avec succes!');
      totalCartQuantity();
      totalProductPrice();
    });
  });
}

// --------------------------------------------
// ---------------Formulaire-------------------
function formInput() {
  const regExpName = new RegExp("^[A-Za-z- -']+$");
  const regExpEmail = new RegExp(
    '^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,6}$'
  );
  const regExpAdress = new RegExp("^[0-9a-zA-Zà-ùÀ-Ù- -']+$");

  const firstName = document.getElementById('firstName');
  const lastName = document.getElementById('lastName');
  const address = document.getElementById('address');
  const city = document.getElementById('city');
  const email = document.getElementById('email');

  const firstNameErrorMsg = document.getElementById('firstNameErrorMsg');
  const lastNameErrorMsg = document.getElementById('lastNameErrorMsg');
  const addressErrorMsg = document.getElementById('addressErrorMsg');
  const cityErrorMsg = document.getElementById('cityErrorMsg');
  const emailErrorMsg = document.getElementById('emailErrorMsg');

  firstName.addEventListener('input', (input) => {
    if (regExpName.test(input.target.value)) {
      return true;
    } else {
      firstNameErrorMsg.innerText = 'Prénom invalide!';
    }
    console.log('ok');
  });

  lastName.addEventListener('input', (input) => {
    if (regExpName.test(input.target.value)) {
      return true;
    } else {
      lastNameErrorMsg.innerText = 'Nom invalide!';
    }
  });

  address.addEventListener('input', (input) => {
    if (regExpAdress.test(input.target.value)) {
      return true;
    } else {
      addressErrorMsg.innerText = 'Adresse invalide!';
    }
  });

  city.addEventListener('input', (input) => {
    if (regExpAdress.test(input.target.value)) {
      return true;
    } else {
      cityErrorMsg.innerText = 'Ville invalide!';
    }
  });

  email.addEventListener('input', (input) => {
    if (regExpEmail.test(input.target.value)) {
      emailErrorMsg.innerText = 'Email invalide!';
    } else {
      return true;
    }
  });
}

function orderCart() {
  const order = document.getElementById('order');
  order.addEventListener('click', function () {
    if (formInput) {
      console.log('commande passé!');
    }
  });
}

function orderCart(){
    const order = document.getElementById('order');
    order.addEventListener('input', function(el){
      el.preventDefault();
      const contacts = {
        firstName : firstName.value,
        lastName: lastName.value,
        address : address.value,
        city: city.value,
        email: email.value
      };
      console.log(contacts);
    })
  }
