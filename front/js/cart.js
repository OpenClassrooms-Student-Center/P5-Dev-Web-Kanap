const URLapi = 'http://localhost:3000/api/products'

var shoppingCart = []
var products = {} 
var totalQuantity = 0
var totalPrice = 0

//local storage shoppingCart
  function getCart(){
    let shoppingCart = localStorage.getItem("shoppingCart")
    if (shoppingCart== null){
      return [];
    }else{
      return JSON.parse(shoppingCart)
    }
  }
  function SaveShoppingCart(product){
    let shoppingCart = getCart();
    shoppingCart.push(product)
    SaveShoppingCart(shoppingCart)
  }
   
  // cart item 
  const createItemInCart = (item) => {
  const product = products[item.id]

  const itemArticle = document.createElement('article')
  const itemDivImg = document.createElement('div')
  const itemImg = document.createElement('img')
  const itemDivContent = document.createElement('div')
  const itemDivContentDesc = document.createElement('div')
  const itemDivContentDescName = document.createElement('h2')
  const itemDivContentDescColor = document.createElement('p')
  const itemDivContentDescPrice = document.createElement('p')
  const itemDivContentSettings = document.createElement('div')
  const itemDivContentSettingsQty = document.createElement('div')
  const itemDivContentSettingsQtyValue = document.createElement('p')
  const itemDivContentSettingsQtyInput = document.createElement('input')
  const itemDivContentSettingsDel = document.createElement('div')
  const itemDivContentSettingsDelText = document.createElement('p')

  itemArticle.classList.add('cart__item')
  itemArticle.dataset.id = item.id
  itemArticle.dataset.color = item.color

  itemDivImg.classList.add('cart__item__img')

  itemImg.src = product.imageUrl

  itemDivContent.classList.add('cart__item__content')

  itemDivContentDesc.classList.add('cart__item__content__description')

  itemDivContentDescName.innerHTML = product.name

  itemDivContentDescColor.innerHTML = item.color

  itemDivContentDescPrice.innerHTML = `${product.price * item.quantity} €`

  itemDivContentSettings.classList.add('cart__item__content__settings')

  itemDivContentSettingsQty.classList.add('cart__item__content__settings__quantity')

  itemDivContentSettingsQtyValue.innerHTML = 'Qté : '

  itemDivContentSettingsQtyInput.type = 'number'
  itemDivContentSettingsQtyInput.classList.add('itemQuantity')
  itemDivContentSettingsQtyInput.name = 'itemQuantity'
  itemDivContentSettingsQtyInput.min = 1
  itemDivContentSettingsQtyInput.max = 100
  itemDivContentSettingsQtyInput.value = item.quantity
  itemDivContentSettingsQtyInput.addEventListener('change', updateQuantity)

  itemDivContentSettingsDel.classList.add('cart__item__content__settings__delete')

  itemDivContentSettingsDelText.addEventListener('click', deleteItem)
  itemDivContentSettingsDelText.innerHTML = 'Supprimer'

  return itemArticle
}
//delete item
const deleteItem = (delButton) => {
  if (window.confirm('Êtes-vous sûr de vouloir supprimer ce produit du panier ?')) {
    const path = delButton.path || (delButton.composedPath && delButton.composedPath())
    const cartItem = path.find(element => element.classList.contains('cart__item'))
    const id = cartItem.dataset.id
    const color = cartItem.dataset.color
    cartItem.parentNode.removeChild(cartItem)
    shoppingCart.splice(shoppingCart.indexOf(shoppingCart.find(item => item.id === id && item.color === color)), 1)
    localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart))
    alert('Suppression.')
    updateTotal()
  }
}
// informations customer
  const searchParams = new URLSearchParams(window.location.search)
  const firstName = searchParams.get('firstName')
  const lastName = searchParams.get('lastName')
  const address = searchParams.get('address')
  const city = searchParams.get('city')
  const email = searchParams.get('email')

  const firstNameErrField = document.getElementById('firstNameErrorMsg')
  const lastNameErrField = document.getElementById('lastNameErrorMsg')
  const addressErrField = document.getElementById('addressErrorMsg')
  const cityErrField = document.getElementById('cityErrorMsg')
  const emailErrField = document.getElementById('emailErrorMsg')

  const nameRegex = /^[A-zÀ-ú' -]*$/
  const addressRegex = /([0-9]{1,}) ?([A-zÀ-ú,' -\. ]*)/
  const mailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

  let error = false

  if (firstName) {
    if (!firstName.match(nameRegex)) {
      firstNameErrField.innerHTML = 'Saisir un prénom valide.'
      error = true
    }
  }

  if (lastName) {
    if (!lastName.match(nameRegex)) {
      lastNameErrField.innerHTML = 'Saisir un nom valide.'
      error = true
    }
  }

  if (address) {
    if (!address.match(addressRegex)) {
      addressErrField.innerHTML = 'Saisir une adresse valide.'
      error = true
    }
  }

  if (city) {
    if (!city.match(nameRegex)) {
      cityErrField.innerHTML = 'Saisir un nom de ville valide.'
      error = true
    }
  }

  if (email) {
    if (!email.match(mailRegex)) {
      emailErrField.innerHTML = 'Saisir une adresse email valide.'
      error = true
    }
  }







