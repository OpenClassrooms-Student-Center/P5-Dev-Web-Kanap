const URLapi = 'http://localhost:3000/api/products'

var products = {} 

document.addEventListener('DOMContentLoaded', async () => {
  products = await getProducts()
  const addButton = document.getElementById('addToCart')

  displayProduct()
  addButton.onclick = addToCart
})

const displayProduct = async () => {
  const searchParams = new URLSearchParams(location.search)
  const itemId = searchParams.get('id')
  const product = products[itemId]
  displayInfos(product)
}

const displayInfos = (product) => {
  const item__img = document.querySelector('body > main > div > section > article > div.item__img')
  const productImage = document.createElement('img')
  const productName = document.getElementById('title')
  const productPrice = document.getElementById('price')
  const productDesc = document.getElementById('description')
  const colorSelector = document.getElementById('colors')

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

const addToCart = () => {
  const item = {}

  const searchParams = new URLSearchParams(location.search)
  item.id = searchParams.get('id')

  const itemQuantity = document.getElementById('quantity')
  item.quantity = +itemQuantity.value

  if (isNaN(item.quantity) || !(item.quantity > 0 && item.quantity < 101)) {
    alert('Veuillez choisir une quantité.')
    return
  }

  const itemColor = document.getElementById('colors')
  item.color = itemColor.value

  if (!item.color) {
    alert('Veuillez choisir une couleur.')
    return
  }

  const cart = JSON.parse(localStorage.getItem('shoppingCart')) || []

  const itemInCart = cart.find(inCartItem => inCartItem.id === item.id && inCartItem.color === item.color)
  if (!itemInCart) {
    cart.push(item)
  }
  else {
    console.log(itemInCart)
    itemInCart.quantity += item.quantity
    if (itemInCart.quantity > 100) {
      alert('Il est impossible d\'acheter plus de 100 exemplaires d\'un même article.')
      return
    }
  }
  localStorage.setItem('shoppingCart', JSON.stringify(cart))
  alert(`Votre commande est effectuée`)
}

const getProducts = async () => {
  const response = await fetch(URLapi)
  if (!response.ok) {
    return
  }

  const productsText = await response.text()
  if (!productsText) {
    return
  }

  const products = {}
  const productArray = await JSON.parse(productsText)
  productArray.forEach(product => {
    products[product._id] = product
  })

  return products
}