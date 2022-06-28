const getProducts = () => {
  const cart = JSON.parse(localStorage.getItem("shoppingCart"));

  cart.forEach((product) => {
    fetch(`http://localhost:3000/api/products/${product.id}`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((fullProduct) => {
        fullProduct.color = product.color;
        fullProduct.quantity = product.quantity;
        createItemInCart(fullProduct);
      })
      .catch(function (err) {
        const cartItemEl = document.getElementById("cart__items");
        cartItemEl.innerHTML = `Une erreur est survenue : ${err}`;
      });
  });
};

getProducts();

const createItemInCart = (product) => {
  // new element
  const itemArticle = document.createElement("article");
  const itemDivImg = document.createElement("div");
  const itemImg = document.createElement("img");
  const itemDivContent = document.createElement("div");
  const itemDivContentDesc = document.createElement("div");
  const itemDivContentDescName = document.createElement("h2");
  const itemDivContentDescColor = document.createElement("p");
  const itemDivContentDescPrice = document.createElement("p");
  const itemDivContentSettings = document.createElement("div");
  const itemDivContentSettingsQty = document.createElement("div");
  const itemDivContentSettingsQtyValue = document.createElement("p");
  const itemDivContentSettingsQtyInput = document.createElement("input");
  const itemDivContentSettingsDel = document.createElement("div");
  const itemDivContentSettingsDelText = document.createElement("p");

  // change element
  itemArticle.classList.add("cart__item");
  itemArticle.dataset.id = product._id;
  itemArticle.dataset.color = product.color;
  itemDivImg.classList.add("cart__item__img");
  itemImg.src = product.imageUrl;
  itemDivContent.classList.add("cart__item__content");
  itemDivContentDesc.classList.add("cart__item__content__description");
  itemDivContentDescName.innerHTML = product.name;
  itemDivContentDescColor.innerHTML = product.color;
  itemDivContentDescPrice.innerHTML = `${product.price * product.quantity} €`;
  itemDivContentSettings.classList.add("cart__item__content__settings");
  itemDivContentSettingsQty.classList.add(
    "cart__item__content__settings__quantity"
  );
  itemDivContentSettingsQtyValue.innerHTML = "Qté : ";
  itemDivContentSettingsQtyInput.type = "number";
  itemDivContentSettingsQtyInput.classList.add("itemQuantity");
  itemDivContentSettingsQtyInput.name = "itemQuantity";
  itemDivContentSettingsQtyInput.min = 1;
  itemDivContentSettingsQtyInput.max = 100;
  itemDivContentSettingsQtyInput.value = product.quantity;
  itemDivContentSettingsQtyInput.addEventListener("change", updateQuantity);
  itemDivContentSettingsDel.classList.add(
    "cart__item__content__settings__delete"
  );
  itemDivContentSettingsDelText.addEventListener("click", deleteItem);
  itemDivContentSettingsDelText.innerHTML = "Supprimer";

  //child element
  itemDivContentDesc.appendChild(itemDivContentDescName);
  itemDivContentDesc.appendChild(itemDivContentDescColor);
  itemDivContentDesc.appendChild(itemDivContentDescPrice);
  itemDivContentSettingsQty.appendChild(itemDivContentSettingsQtyValue);
  itemDivContentSettingsQty.appendChild(itemDivContentSettingsQtyInput);
  itemDivContentSettingsDel.appendChild(itemDivContentSettingsDelText);
  itemDivContentSettings.appendChild(itemDivContentSettingsQty);
  itemDivContentSettings.appendChild(itemDivContentSettingsDel);
  itemDivContent.appendChild(itemDivContentDesc);
  itemDivContent.appendChild(itemDivContentSettings);
  itemDivImg.appendChild(itemImg);
  itemArticle.appendChild(itemDivImg);
  itemArticle.appendChild(itemDivContent);

  const cart = document.getElementById("cart__items");
  cart.appendChild(itemArticle);
};

//delete item
shoppingCart = JSON.parse(localStorage.getItem("shoppingCart"));
const deleteItem = (delButton) => {
  if (window.confirm("Voulez-vous supprimer ce produit ?")) {
    const path =
      delButton.path || (delButton.composedPath && delButton.composedPath());
    const cartItem = path.find((element) =>
      element.classList.contains("cart__item")
    );
    const id = cartItem.dataset.id;
    const color = cartItem.dataset.color;
    cartItem.parentNode.removeChild(cartItem);
    shoppingCart.splice(
      shoppingCart.indexOf(
        shoppingCart.find((item) => item.id === id && item.color === color)
      ),
      1
    );
    localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
    alert("Suppression.");
    updateTotal();
  }
};

//update quantity of cart
const updateQuantity = (e) => {
  newQuantity = Number(e.target.value);
  article = e.target.closest(".cart__item");
  const cart = JSON.parse(localStorage.getItem("shoppingCart"));
  cart.map((product) => {
    if (
      product.id == article.dataset.id &&
      product.color == article.dataset.color
    ) {
      product.quantity = newQuantity;
      return product;
    }
  });
  localStorage.setItem("shoppingCart", JSON.stringify(cart));
  updateTotal();

  //Trouver la ligne dans le panier soit en utilisant les dataset en JS ==> utiliser .map
  // Mettre à jour le local Storage avec la nouvelel quantité
};

const updateTotal = (product) => {
  const totalQuantityElement = document.getElementById("totalQuantity");
  const totalPriceElement = document.getElementById("totalPrice");

  let totalQuantity = 0;
  let totalPrice = 0;
  const cart = JSON.parse(localStorage.getItem("shoppingCart"));
  cart.forEach((product) => {
    fetch(`http://localhost:3000/api/products/${product.id}`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((productFound) => {
        totalQuantity += product.quantity;
        totalPrice += product.quantity * productFound.price;
        totalQuantityElement.innerHTML = totalQuantity;
        totalPriceElement.innerHTML = totalPrice;
      })
      .catch(function (err) {
        /*const products = document.querySelector("item");
    products.innerHTML = `Une erreur est survenue (${err})`;
    */
      });
  });

  totalQuantityElement.innerHTML = totalQuantity;
  totalPriceElement.innerHTML = totalPrice;
};
updateTotal();
//define Regex for input
const nameRegex = new RegExp("^[A-Za-zÀ-ú'-\\s]{2,}$", "g"); //notation littérale général
const addressRegex = new RegExp("^[\\wÀ-ú'-\\s]{2,}$", "g"); //notation littérale général
const mailRegex = new RegExp("^[\\w.-]+[@]{1}[\\w.-]+[.]{1}[a-z]{2,10}$", "g"); //notation littérale général

//check the regex match
const checkRegex = (input, regex, message) => {
  let Regextest = new RegExp(regex).test(input.value);
  let ErrorMsg = input.nextElementSibling; // élement trouvé dans le livre à voir si cela fonctionne
  if (!Regextest) {
    ErrorMsg.innerHTML = message;
    return false;
  } else {
    ErrorMsg.innerHTML = "";
    return true;
  }
};


//value for the form
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const address = document.getElementById("address");
const city = document.getElementById("city");
const email = document.getElementById("email");

const orderButton = document.getElementById("order");
orderButton.addEventListener("click", (e) => {
  e.preventDefault();
  if (
    checkRegex(firstName, nameRegex, "saisir un prenom valide") &&
    checkRegex(lastName, nameRegex, "saisir un nom valide") &&
    checkRegex(address, addressRegex, "saisir une adresse valide") &&
    checkRegex(city, nameRegex, "saisir une ville valide") &&
    checkRegex(email, mailRegex, "saisir un email valide ")
  ) {
    sendOrder();
  }
});

const sendOrder = () => {
  let contact = {
    firstName: orderButton.firstName.value,
    lastName: orderButton.lastName.value,
    address: orderButton.address.value,
    city: orderButton.city.value,
    email: orderButton.email.value,
  };
  let products = cart.map((shoppingCart) => product._id);
  let order = { contact, products };

  fetch(`http://localhost:3000/api/products/order`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((product) => {
      localStorage.clear(); 
      window.location.href = `./confirmation.html?orderId=${product.orderId}#orderId`;
    })
    .catch((err) => {
      alert(`Une erreur est survenue: ${err}`);
    });
  }
  
