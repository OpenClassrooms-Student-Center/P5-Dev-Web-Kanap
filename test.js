'use strict';

// BUG FIXME LEG BLOCK HINT TODO DEL

let catalog = [];
//HINT it has to be done INSIDE the function or it doesn't work. I don't know what to do with it.
const fetchCatalog = function () {
  fetch('http://localhost:3000/api/products')
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function (value) {
      catalog = value;
      // array catalog
      console.log(catalog);
      // each item in catalog
      // for (let article of catalog) {
      //   console.log(article);
      // }
    })
    .catch(function (err) {
      // Une erreur est survenue
      console.log("fetch didn't work");
    });
};

const catalogDisplay = async () => {
  await fetchCatalog();

  // DEL to be sure I'm actually selecting the right things
  document.getElementById('items').style.border = '1px dashed purple';

  document.getElementById('items').innerHTML = catalog.map((furniture) => {
    `<a href="" id="card${furniture._id}">
    <article>
    <img src="${furniture._id.imageUrl}" alt="${furniture._id.altTxt}" />
    <h3 class="productName">${furniture.name}</h3>
    <p class="productDescription">${furniture.description}</p>
    </article>
    </a>
    `;
    document.querySelector('.productName').style.border = 'ipx dashed green';
  });
};

// DEL ANOTHER attempt ANOTHER way to do it

// We can now pass this data to a function that will render it into the HTML.
async function displayCocktail(data) {
  await fetchCatalog;
  const canap = data[0];
  const canapDiv = document.getElementById('items');

  // Now let’s output the data into our HTML starting with the cocktail name:

  const canapName = canap.name;
  const heading = document.createElement('h1');
  heading.innerHTML = canapName;
  canapDiv.appendChild(heading);

  // Next let’s get the image and also add it to the cocktail <div>. We’ll also use this image as the background for the <body>:

  const cocktailImg = document.createElement('img');
  cocktailImg.src = canap.imageUrl;
  canapDiv.appendChild(cocktailImg);
  document.body.style.backgroundImage = "url('" + canap.imageUrl + "')";
  for (let article of catalog) {
    displayCocktail(article);
  }
}

/* <a href="./product.html?id=42">
           <article>
              <img src=".../product01.jpg" alt="Lorem ipsum dolor sit amet, Kanap name1"/>
              <h3  class="productName">Kanap name1</h3>
              <p class="productDescription"></p> */

catalogDisplay();

// section class="items" id="items">
// document.getElementById(“parent”).appendChild(document.createElement(“article”));

// i think i fetched the json. maybe it's / because of what the API param say and later I'll need to add the prodcts
// TODO run through it and store it
// TODO find where to display it
// TODO  display it
