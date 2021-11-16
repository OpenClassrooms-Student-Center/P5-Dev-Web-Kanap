
// Recuperation de la chaine de requête dans l'URL
const urlWithId = window.location.search;
console.log(urlWithId);
// Extraire l'ID
const urlSearchparams = new URLSearchParams(urlWithId);
console.log(urlSearchparams);

const id = urlSearchparams.get("id");
console.log(id);



fetch("http://localhost:3000/api/products/"+id)
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(value) {
    let produit = "";
      produit += `
      <div class="limitedWidthBlock">
        <section class="item">
          <article>
            <div class="item__img">
              <img src="${value.imageUrl}" alt="${value.altTxt}">
            </div>
            <div class="item__content">

              <div class="item__content__titlePrice">
                <h1 id="title">${value.name}</h1>
                <p>Prix : <span id="price">${value.price}</span>€</p>
              </div>

              <div class="item__content__description">
                <p class="item__content__description__title">Description :</p>
                <p id="description">${value.description}</p>
              </div>

              <div class="item__content__settings">
                <div class="item__content__settings__color">
                  <label for="color-select">Choisir une couleur :</label>
                  <select name="color-select" id="colors">
                  <option value="">--SVP, choisissez une couleur --</option> 
                  </select>
                </div>

                <div class="item__content__settings__quantity">
                  <label for="itemQuantity">Nombre d'article(s) (1-100) :</label>
                  <input type="number" name="itemQuantity" min="1" max="100" value="0" id="quantity">
                </div>
              </div>

              <div class="item__content__addButton">
                <button id="addToCart">Ajouter au panier</button>
              </div>

            </div>
          </article>
        </section>
      </div>`
    const pageProduit = document.getElementById('limitedWidthBlock');
    pageProduit.innerHTML = produit;

    let colors = document.getElementById("colors");
    for (let i = 0; i < value.colors.length; i+=1) {
        let colorOption = document.createElement('option');
        colorOption.innerText = value.colors[i];
        colorOption.value = value.colors[i];
        colors.appendChild(colorOption);
      }

  })
  .catch(function(err) {
    const pageProduit = document.getElementsByClassName('limitedWidthBlock');
    pageProduit.innerHTML = `Une erreur est survenue (${err})`;
  });

//   Ajout dans panier
  let addToCart = document.getElementById('addToCart');
  document.getElementById('addToCart').addEventListener("click", alert(1))
  addToCart.addEventListener('click', function() {
      console.log(addToCart);
          let addProduct = {
            color: document.getElementById("colors").value,
            _id: id
          }
          localStorage.setItem('basketItems', [addProduct])
      }
  )

// Local storage
