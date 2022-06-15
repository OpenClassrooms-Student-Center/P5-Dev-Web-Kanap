const getIdProduct = () => {
  const searchParams = new URLSearchParams(location.search)
  const itemId = searchParams.get('id')
  return itemId;
}

//call Api
const getProduct = () => {
  fetch(`http://localhost:3000/api/products/${getIdProduct()}`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      }).then((product) => {
        displayInfos(product)
    addToCart(product)


      })
      .catch(function (err) {
        // Une erreur est survenue
      });
}

getProduct()

const displayInfos = (product) => {
  const item__img = document.querySelector('body > main > div > section > article > div.item__img')
  const productImage = document.createElement('img')
  const productName = document.getElementById('title')
  const productPrice = document.getElementById('price')
  const productDesc = document.getElementById('description')
  const colorSelector = document.getElementById('colors')
  // change element
  productImage.src = product.imageUrl
  item__img.appendChild(productImage)
  productName.innerHTML = product.name
  productPrice.innerHTML = product.price
  productDesc.innerHTML = product.description
  product.colors.forEach(color => {
    const colorChoice = document.createElement('option')
    colorChoice.value = color
    colorChoice.innerHTML = color
    colorSelector.appendChild(colorChoice)
  })
}

const addToCart = (product) => {
  const addButton = document.getElementById('addToCart')
  addButton.addEventListener("click", (event) => {
    event.preventDefault();
    item = {}

    const itemQuantity = document.getElementById('quantity').value

    if (isNaN(itemQuantity) || !(itemQuantity > 0 && itemQuantity < 101)) {
      alert('Quantité invalide')
      return
    }

    item.quantity = itemQuantity

    const itemColor = document.getElementById('colors').value

    if (!itemColor) {
      alert('Veuillez choisir une couleur.')
      return
    }

    item.color = itemColor

    item.id = product._id


    const cart = JSON.parse(localStorage.getItem('shoppingCart')) || []

    const itemInCart = cart.find(inCartItem => inCartItem.id === item.id && inCartItem.color === item.color)
    if (!itemInCart) {
      cart.push(item)
    } else {
      itemInCart.quantity += item.quantity
      if (itemInCart.quantity > 100) {
        alert('Il est impossible d\'acheter plus de 100 exemplaires d\'un même article.')
        return
      }
    }
    localStorage.setItem('shoppingCart', JSON.stringify(cart))
    alert(`Votre commande est effectuée`)
  })
}