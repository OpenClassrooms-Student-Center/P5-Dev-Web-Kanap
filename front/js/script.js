const URLapi = 'http://localhost:3000/api/products'
//call Api
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

var products = {};

document.addEventListener('DOMContentLoaded', async () => {
  const items = document.getElementById('items')

  products = await getProducts();

  for (const product in products) {
    const newElement = create(products[product])
    items.appendChild(newElement);
  }
})
//new element
const create = (product) => {
  const newElement = document.createElement('a')
  const article = document.createElement('article')
  const productImage = document.createElement('img')
  const productName = document.createElement('h3')
  const productDesc = document.createElement('p')
  //change element
  newElement.href = `./product.html?id=${product._id}`
  productImage.src = product.imageUrl;
  productImage.alt = product.altTxt;
  productName.innerHTML = product.name;
  productName.classList.add('productName');
  productDesc.innerHTML = product.description;
  productDesc.classList.add('productDescription')

  article.appendChild(productImage)
  article.appendChild(productName)
  article.appendChild(productDesc)
  newElement.appendChild(article)
  return newElement
}
