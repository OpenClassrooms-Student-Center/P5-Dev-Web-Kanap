document.addEventListener("DOMContentLoaded", () => {
  let panierLocalStorage = localStorage.getItem("panier");
  let panier = JSON.parse(panierLocalStorage);
  const sectionArticle = document.getElementById("cart__items");

  // Creation de la fonction de formatage du prix
  var formatter = new Intl.NumberFormat("de-FR", {
    style: "currency",
    currency: "EUR",
  });

  if (panier) {
    const getProductsPrice = async function () {
      // Appel de l'API kanap
      fetch("http://localhost:3000/api/products")
        .then((result) => result.json())
        .then((data) => {
          const productQuantity = document.querySelectorAll(".itemQuantity");
          const prix = document.querySelectorAll(
            ".cart__item__content__description"
          );
          const totalQuantity = document.getElementById("totalQuantity");
          const deleteItem = document.querySelectorAll(".deleteItem");
          const totalPrice = document.getElementById("totalPrice");
          const getQuantity = () => {
            let totalQ = 0;
            let totalP = 0;
            for (let i = 0; i < panier.length; i++) {
              prix[i].children[2].value =
                getPrice(panier[i].id, data) * panier[i].quantity;
              prix[i].children[2].textContent = formatter.format(
                prix[i].children[2].value
              );
              totalQ += Number(panier[i].quantity);
              totalP += prix[i].children[2].value;
            }
            totalQuantity.innerHTML = totalQ;
            totalPrice.innerHTML = formatter.format(totalP);
            console.log(typeof totalP);
          };
          getQuantity();
          for (let i = 0; i < panier.length; i++) {
            productQuantity[i].addEventListener("change", function (e) {
              panier[i].quantity = e.target.value;
              localStorage.setItem("panier", JSON.stringify(panier));
              getQuantity();
            });
          }
          function deleteIt() {
            for (let i = 0; i < panier.length; i++) {
              deleteItem[i].addEventListener("click", function () {
                const result = panier.find(
                  (elt) =>
                    elt.id == panier[i].id && elt.color == panier[i].color
                );
                console.log(result);
                if (result) {
                  console.log("double");
                  const removeResult = panier.filter((elt) => elt != result);

                  panier = removeResult;

                  getQuantity();
                  let x = deleteItem[i].closest(".cart__item");
                  if (x != null) {
                    x.remove();
                  }
                }
                localStorage.setItem("panier", JSON.stringify(panier));
              });
            }
          }
          deleteIt();
        })
        .catch((err) => {
          console.error(err);
        });
    };
    function getPrice(id, data) {
      const result = data.filter((elt) => elt._id == id);
      if (result) {
        for (let res of result) {
          return res.price;
        }
      }
    }
    const displayPanier = () => {
      let html = "";
      for (let article of panier) {
        html += ` <article class="cart__item" data-id="${article.id}" data-color="${article.color}">
            <div class="cart__item__img">
              <img src="${article.image}" alt="Photographie d'un canapé">
            </div>
            <div class="cart__item__content">
              <div class="cart__item__content__description">
                <h2>${article.name}</h2>
                <p>${article.color}</p>
                <p></p>
              </div>
              <div class="cart__item__content__settings">
                <div class="cart__item__content__settings__quantity">
                  <p>Qté : </p>
                  <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${article.quantity}>
                </div>
                <div class="cart__item__content__settings__delete">
                  <p class="deleteItem">Supprimer</p>
                </div>
              </div>
            </div>
          </article>`;
      }
      sectionArticle.innerHTML = html;
    };
    displayPanier();
    getProductsPrice();

    const getPanierId = (obj) => {
      let itemsId = [];
      for (let itemId of obj) {
        itemsId.push(itemId.id);
      }
      return itemsId;
    };
    getPanierId(panier);
    let productID = getPanierId(panier);
    /// """""""""""""""""""""""""""""""""  Gestion du formulaire """""""""""""""""""""""""""""""""""""///

    const firstName = document.getElementById("firstName");
    const lastName = document.getElementById("lastName");
    const address = document.getElementById("address");
    const city = document.getElementById("city");
    const email = document.getElementById("email");
    let nameRegEx = new RegExp(
      /^[A-Za-zàçéèêëîïôöûüÿÀÉÈËÎÏÔÖÛÜ]+([-'\s][A-Za-zàçéèêëîïôöûüÿÀÉÈËÎÏÔÖÛÜ]+)?$/
    );

    let reghexEmail = new RegExp(/.+\@.+\..+/);
    let reghexAdresse = new RegExp(
      /^[^&~"#{([|`_\\\^@\])}=+°¨$£¤%!§:;.?<>/*]+$/
    );

    const validForm = (userInput, regExp, elt) => {
      if (!regExp.test(userInput) || userInput == "") {
        elt.nextElementSibling.textContent = "Veuillez erespeter le format";
        return false;
      }
      elt.nextElementSibling.textContent = "";
      return true;
    };
    const btnOrder = document.getElementById("order");

    btnOrder.addEventListener("click", function (e) {
      e.preventDefault();
      let resfirstName = validForm(firstName.value, nameRegEx, firstName);
      let reslastName = validForm(lastName.value, nameRegEx, lastName);
      let resAddress = validForm(address.value, reghexAdresse, address);
      let resCity = validForm(city.value, nameRegEx, city);
      let resEmail = validForm(email.value, reghexEmail, email);
      if (resfirstName && reslastName && resAddress && resCity && resEmail) {
        let contactUser = {
          firstName: firstName.value,
          lastName: lastName.value,
          address: address.value,
          city: city.value,
          email: email.value,
        };

        fetch("http://localhost:3000/api/products/order", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ contact: contactUser, products: productID }),
        })
          .then((responce) => responce.json())
          .then((data) => {
            console.log(data.orderId);

            setTimeout(function () {
              window.location.href = `confirmation.html?id_order=  ${data.orderId}`;
            }, 400);
            localStorage.clear();
          });
      }
    });
  }

  let id_order = new URL(location.href).searchParams.get("id_order");
  console.log(id_order);
  let order = document.getElementById("orderId");
  if (order != null) {
    order.innerHTML = `<br/> ${id_order}`;
  }
});
