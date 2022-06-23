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
              const cartItemEl = document.getElementById("cart__items");
              cartItemEl.innerHTML = `Une erreur est survenue : ${err}`;
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
shoppingCart = JSON.parse(localStorage.getItem('shoppingCart'));
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
   const quantities = document.querySelectorAll("itemQuantity");
   const TotalQty = quantities.map(el => el *product)
    shoppingCart.setItem('shoppingCart', JSON.stringify(shoppingCart))
  updateTotal()
  //Trouver la ligne dans le panier soit en utilisant les dataset en JS ==> utiliser .map
  // Mettre à jour le local Storage avec la nouvelel quantité
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
const nameRegex = new RegExp ("/([A-Za-z]+(['|\-|\s]?[A-Za-z]+)*)+/","g");//notation littérale général
const addressRegex = new RegExp ("/^[a-z0-9\s,'-]*$/i","g");//notation littérale général
const mailRegex = new RegExp ("^[a-zA-Z0-9.! #$%&'*+/=? ^_`{|}~-]+@[a-zA-Z0-9-]+(?:\. [a-zA-Z0-9-]+)*$","g");//notation littérale général

/*//Personnalized message
const NameErrorMsg = "Saisir un prénom valide.";
const AdressErrorMsg = "Saisir une adresse valide.";
const emailErrorMsg = "Saisir une adresse email valide.";
*/
//check the regex match
/*const checkRegex = (input, regex, message) => {
  let Regextest = new RegExp(regex).test(input.value);
  let ErrorMsg= input.nextElementSibling; // élement trouvé dans le livre à voir si cela fonctionne
  if(!Regextest){
    ErrorMsg.innerHTML= message;
    return false
  }else{
    ErrorMsg.innerHTML="";
    return true
  }
}
*/
  // Si ça revient pas bon, alors je mets le message dans le champs approprié + je return false
  // Sinon alors je vide le message d'erreur + je return true
  
    //value for the form
    const firstName = document.getElementById('firstName')
    const lastName = document.getElementById('lastName')
    const address = document.getElementById('address')
    const city = document.getElementById('city')
    const email = document.getElementById('email')

    //Regex Email
    const emailErrorMsg = document.getElementById("emailErrorMsg");
    function validateEmail(email){
      if (mailRegex.test(email)== false){
        return false;
      }else{
        emailErrorMsg.innerHTML = null;
        return true;
      }
    }

    //Regex firstname
    const firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
    function validateFirstName(firstName){
      if (nameRegex.test(firstName) == false){
        return false;
     }else{
        firstNameErrorMsg.innerHTML = null;
        return true;
     }
    }

    //Regex LastName
    const lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
    function validateLastName(lastName){
      if (nameRegex.test(lastName) == false){
        return false;
      }else{
        lastNameErrorMsg.innerHTML = null;
        return true;
      }
    }

    //Regex city
    const cityErrorMsg = document.getElementById("cityErrorMsg");
    function validateCity(city){
      if (nameRegex.test(city) == false){
        return false;
      }else{
        cityErrorMsg.innerHTML = null;
        return true;
      }
    }

    //Regex adress
    const addressErrorMsg = document.getElementById("addressErrorMsg");
    function validateAddress(address){
      if (nameRegex.test(address) == false){
        return false;
      }else{
        addressErrorMsg.innerHTML = null;
        return true;
      }
    }
    const orderButton = document.getElementById("order");
    orderButton.addEventListener("click", (x) =>{
      x.preventDefault();
      let email = validateEmail(email).value;
      let firstName = validateFirstName(firstName).value;
      let lastName = validateLastName(lastName).value;
      let city = validateCity(city).value;
      let address = validateAddress(address).value;
      if(email == false || firstName == false || lastName == false || city == false || address == false )
        {
         if (email == false ){
          emailErrorMsg.innerHTML = "Saisir une adresse email valide."
         }
         if (firstName == false ){
          firstNameErrorMsg.innerHTML = "Saisir un prénom valide."
         } 
         if (lastName == false ){
          lastNameErrorMsg.innerHTML = "Saisir un Nom valide."
         }
         if (city == false ){
          cityErrorMsg.innerHTML = "Saisir une ville valide."
         }
         if (address == false ){
          addressErrorMsg.innerHTML = "Saisir une adresse valide."
         }
         return;
        }
    })

//const order = () => {
//if(checkRegex(firstName.input, nameregex, "non invalide") éé )
