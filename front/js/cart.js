const getProducts = () => {
  const cart = JSON.parse(localStorage.getItem("shoppingCart"));

  cart.forEach((product) => {
      fetch(`http://localhost:3000/api/products/${product.id}`)
          .then((res) => {
              if (res.ok) {
                  return res.json();
              }
          }).then((fullProduct) => {
              fullProduct.color = product.color;
              fullProduct.quantity = product.quantity;
              createItemInCart(fullProduct)
          })
          .catch(function (err) {
              // Une erreur est survenue
          });
  })

}

getProducts()

const createItemInCart = (product) => {
  // new element
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

  // change element
  itemArticle.classList.add('cart__item')
  itemArticle.dataset.id = product._id
  itemArticle.dataset.color = product.color
  itemDivImg.classList.add('cart__item__img')
  itemImg.src = product.imageUrl
  itemDivContent.classList.add('cart__item__content')
  itemDivContentDesc.classList.add('cart__item__content__description')
  itemDivContentDescName.innerHTML = product.name
  itemDivContentDescColor.innerHTML = product.color
  itemDivContentDescPrice.innerHTML = `${product.price * product.quantity} €`
  itemDivContentSettings.classList.add('cart__item__content__settings')
  itemDivContentSettingsQty.classList.add('cart__item__content__settings__quantity')
  itemDivContentSettingsQtyValue.innerHTML = 'Qté : '
  itemDivContentSettingsQtyInput.type = 'number'
  itemDivContentSettingsQtyInput.classList.add('itemQuantity')
  itemDivContentSettingsQtyInput.name = 'itemQuantity'
  itemDivContentSettingsQtyInput.min = 1
  itemDivContentSettingsQtyInput.max = 100
  itemDivContentSettingsQtyInput.value = product.quantity
  itemDivContentSettingsQtyInput.addEventListener('change', updateQuantity)
  itemDivContentSettingsDel.classList.add('cart__item__content__settings__delete')
  itemDivContentSettingsDelText.addEventListener('click', deleteItem)
  itemDivContentSettingsDelText.innerHTML = 'Supprimer'

  //child element
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

  const cart = document.getElementById('cart__items')
  cart.appendChild(itemArticle)
}



//delete item
const deleteItem = (delButton) => {
  if (window.confirm('Voulez-vous supprimer ce produit ?')) {
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

//update quantity of cart
const updateQuantity = () => {
  //Trouver la ligne dans le panier soit en utilisant les dataset en JS ==> utiliser .map
  // Mettre à jour le local Storage avec la nouvelel quantité

  updateTotal()
}


const updateTotal = () => {
  const totalQuantityElement = document.getElementById('totalQuantity')
  const totalPriceElement = document.getElementById('totalPrice')

  totalQuantity = 0
  totalPrice = 0

  for (const item of shoppingCart) {
      totalQuantity += item.quantity
      totalPrice += item.quantity * products[item.id].price
  }

  totalQuantityElement.innerHTML = totalQuantity
  totalPriceElement.innerHTML = totalPrice
}

//define Regex for input
const nameRegex = new RegexExp ("[A-Za-z]+(['|\-|\s]?[A-Za-z]+)*)+","g");
const addressRegex = new RegexExp ("\d{1,}) [a-zA-Z0-9\s]+(\.)? [a-zA-Z]+(\,)? [A-Z]{2} [0-9]{5,6}","g");
const mailRegex = new RegexExp ("^[a-zA-Z0-9.! #$%&'*+/=? ^_`{|}~-]+@[a-zA-Z0-9-]+(?:\. [a-zA-Z0-9-]+)*$","g");

//Personnalized message
const NameErrorMsg = "Saisir un prénom valide.";
const AdressErrorMsg = "Saisir une adresse valide.";
const emailErrorMsg = "Saisir une adresse email valide.";

//check the regex match
const checkRegex = (input, regex, message) => {
  let Regextest = new RegExp(regex).test(input.value);
  let ErrorMsg= input.nextElementSibling; // renvoie le noeud des inputs
  if(!Regextest){
    ErrorMsg.innerHTML= message;
    return false
  }else{
    ErrorMsg.innerHTML="";
    return true
  }
  // Si ça revient pas bon, alors je mets le message dans le champs approprié + je return false
  // Sinon alors je vide le message d'erreur + je return true
}
//const order = () => {
//if(checkRegex(firstName.input, nameregex, "non invalide") éé )
//}
// // // informations customer
// // const order = async () => {
// //     const searchParams = new URLSearchParams(location.search)
// //
// //     const firstName = searchParams.get('firstName')
// //     const lastName = searchParams.get('lastName')
// //     const address = searchParams.get('address')
// //     const city = searchParams.get('city')
// //     const email = searchParams.get('email')
// //
// //     //error informations
// //     const firstNameErrField = document.getElementById('firstNameErrorMsg')
// //     const lastNameErrField = document.getElementById('lastNameErrorMsg')
// //     const addressErrField = document.getElementById('addressErrorMsg')
// //     const cityErrField = document.getElementById('cityErrorMsg')
// //     const emailErrField = document.getElementById('emailErrorMsg')
// //
// //     //regex for informations
// //     const nameRegex = /([A-Za-z]+(['|\-|\s]?[A-Za-z]+)*)+/
// //     const addressRegex = /(\d{1,}) [a-zA-Z0-9\s]+(\.)? [a-zA-Z]+(\,)? [A-Z]{2} [0-9]{5,6}/
// //     const mailRegex = /^[a-zA-Z0-9.! #$%&'*+/=? ^_`{|}~-]+@[a-zA-Z0-9-]+(?:\. [a-zA-Z0-9-]+)*$/
// //
// //     let error = false
// //
// //     if (firstName) {
// //         if (!firstName.match(nameRegex)) {
// //             firstNameErrField.innerHTML = 'Saisir un prénom valide.'
// //             error = true
// //         }
// //     }
// //
// //     if (lastName) {
// //         if (!lastName.match(nameRegex)) {
// //             lastNameErrField.innerHTML = 'Saisir un nom valide.'
// //             error = true
// //         }
// //     }
// //
// //     if (address) {
// //         if (!address.match(addressRegex)) {
// //             addressErrField.innerHTML = 'Saisir une adresse valide.'
// //             error = true
// //         }
// //     }
// //
// //     if (city) {
// //         if (!city.match(nameRegex)) {
// //             cityErrField.innerHTML = 'Saisir un nom de ville valide.'
// //             error = true
// //         }
// //     }
// //
// //     if (email) {
// //         if (!email.match(mailRegex)) {
// //             emailErrField.innerHTML = 'Saisir une adresse email valide.'
// //             error = true
// //         }
// //     }
// //
// //     if (error) {
// //         return
// //     }
// //
// //     const contact = {
// //         firstName,
// //         lastName,
// //         address,
// //         city,
// //         email
// //     }
// //
// // }
//
//
//
//
//
//
//
//