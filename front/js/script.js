/**
 * Send request to get all products using fetch api
 * @returns { Promise }
 */
const retrieveProductsData = () => fetch('http://localhost:3000/api/products')
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(json) {
    return json;
  })
  .catch(function(err) {
    // TODO: Retourner message d'erreur
  });


/**
 * Create pagination 
 * @param {Object} dataOfProduct 
 */
const createPagination = (dataOfProduct) => {
  const sectionItems = document.getElementById('items');
  console.log("DataofProduct");
  console.log(typeof dataOfProduct);

  for (let i = 0; i < dataOfProduct.length; i++) {
    const productLink = document.createElement('a');
    const productArticle = document.createElement('article');
    const productH3 = document.createElement('h3');
    const productImage = document.createElement('img');
    const productParagraphe = document.createElement('p');

    productLink.href = `./product.html?id=${dataOfProduct[i]._id}`;
    productImage.src = dataOfProduct[i].imageUrl;
    productImage.alt = dataOfProduct[i].altTxt;
    productH3.classList.add('productName');
    productH3.innerHTML = dataOfProduct[i].name;
    productParagraphe.innerHTML = dataOfProduct[i].description;
    productParagraphe.classList.add('productDescription');
    
    productArticle.appendChild(productImage);
    productArticle.appendChild(productH3);
    productArticle.appendChild(productParagraphe);
    productLink.appendChild(productArticle);
    sectionItems.appendChild(productLink);
  }

};


async function main() {

  const productData = await retrieveProductsData();
    
  createPagination(productData);
}

main();