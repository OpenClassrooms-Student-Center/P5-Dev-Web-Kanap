'use strict';

// BUG FIXME LEG BLOCK HINT TODO DEL

//BLOCK HOME PAGE

const apiURL = 'http://localhost:3000/api/products';

async function getCatalog() {
  //storing response
  let response = await fetch(apiURL); // stars a GET request (default)
  // Storing data in form of JSON
  const catalog = await response.json();
  // console.log(catalog); //DEL
  // console.log(typeof catalog); //DEL
  if (response) {
    displayCatalog(catalog);
  }
}
//calling async function
getCatalog();

// function to define innerHTML
function displayCatalog(catalog) {
  //Loop to access all rows

  for (let item of catalog) {
    let newDiv = document.createElement('div');
    let newContent = `<a href="./product.html?id=${item._id} data-id="${item._id}">
      <article>
        <img
          src="${item.imageUrl}"
          alt="${item.name} "
        />
        <h3 class="productName">${item.name}</h3>
        <p class="productDescription">${item.description}</p>
      </article>
    </a>`;

    newDiv.innerHTML = newContent;

    //setting innerHTML as  tab
    document.getElementById('items').appendChild(newDiv);
  }
}

/// A PARTIR D'ICI C'EST LA ZONE SUR LAQUELLE JE SUIS EN TRAIN DE BOSSER C'EST LE BAZAR C'EST NORMAL

// TODO save url search param onclick?

let chosenProduct;
let cards = document.getElementById('items').children;
console.log('this is cards:', cards); //DEL

// function getProductUrl(e) {
//   var chosenID = e.getAttribute('data-id');
//   console.log(chosenID);
//   chosenProduct = chosenID;
// }

// HINT I checked whether it exists first with if (cards !== null)  // not it
for (meh of cards) {
  console.log(meh);
  meh.addEventListener('hover', () => {
    console.log(meh);
  });
}

// cards.addEventListener('click', getProductUrl);

// do add event listeniner here

// function storeUrl() {
//   var str =
//     'https://waytolearnx.com/t.html?name=alex-babtise&age=25&address=paris';

//   var url = new URL(str);

//   var search_params = new URLSearchParams(url.search);

//   if (search_params.has('_id')) {
//     var name = search_params.get('_id');
//     console.log(_id);
//     chosenProduct = _id;
//     console.log(chosenProduct);
//   }
// }
// // should it be 'items' here? or newDiv?

// document.getElementById('items').addEventListener(onclick, chosenProduct);

// BLOCK            PRODUCT PAGE

// TODO trying to extract url from product page directly because i followed it?

// window.location.href = URL;
// console.log(URL);
// Then you can just grab the params from the url. For instance, if the url is https://example.com/products?id=142 then you can grab the id like this:

// const urlParams = new URLSearchParams(URL);

// const id = urlParams.get('id');

// TODO use url search param to extract id

// TODO if no id, default back to home page?
// TODO store id
// TODO take id into the fetch GET

// TODO display stuff

// MAKE IT A LOOP THROUGH WITH FETCH??

// DISPLAY STUFF ABOUT PRODUCT
// product pic
//            document.querySelector('.item_img')
//product name
//          document.getElementById('title').innerHTML = `${item.name}`;
// product price
//            id = 'price';
// product description
//                id = 'description';

// TODO how do do colors?

/* <select name="color-select" id="colors">
<option value="">--SVP, choisissez une couleur --</option> 
<option value="vert">vert</option>
                      <option value="blanc">blanc</option> */
