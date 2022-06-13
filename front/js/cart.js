const URLapi = 'http://localhost:3000/api/products'

var shoppingCart = []
var products = {} 
var totalQuantity = 0
var totalPrice = 0

document.addEventListener('DOMContentLoaded', async () => {
  if (!location.href.includes('cart.html')) {
    displayOrderId()
    return
  }

  products = await getProducts()

  shoppingCart = JSON.parse(localStorage.getItem('shoppingCart'))
  if (!shoppingCart) {
    return
  }

  const cart = document.getElementById('cart__items')

  shoppingCart.forEach(async item => {
    cart.appendChild(await createItemInCart(item))
  })

  updateTotal()

  if (location.search) {
    order()
  }
})

const createItemInCart = async (item) => {
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

  itemDivContentDesc.appendChild(itemDivContentDescName)
  itemDivContentDesc.appendChild(itemDivContentDescColor)
  itemDivContentDesc.appendChild(itemDivContentDescPrice)

  itemDivContentSettingsQty.appendChild(itemDivContentSettingsQtyValue)
  itemDivContentSettingsQty.appendChild(itemDivContentSettingsQtyInput)

  itemDivContentSettingsDel.appendChild(itemDivContentSettingsDelText)

  itemDivContentSettings.appendChild(itemDivContentSettingsQty)
  itemDivContentSettings.appendChild(itemDivContentSettingsDel)

  itemDivContent.appendChild(itemDivContentDesc)
  itemDivContent.appendChild(itemDivContentSettings)

  itemDivImg.appendChild(itemImg)

  itemArticle.appendChild(itemDivImg)
  itemArticle.appendChild(itemDivContent)

  return itemArticle
}

