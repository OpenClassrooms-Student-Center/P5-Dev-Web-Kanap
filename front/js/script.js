//récupère les données du server
fetch("http://localhost:3000/api/products")
  .then((response) => response.json())
  .then((data) => addArticles(data));

//boucle pour chaque élément des articles
function addArticles(data) {
  data.forEach((element) => {
    const { _id, imageUrl, altTxt, name, description } = element;
    const image = makeImg(imageUrl, altTxt);
    const cards = makeCard(_id);
    const article = document.createElement("article");
    const title = makeTitle(name);
    const paragraph = makeParagraph(description);

    elementsCard(article, image, title, paragraph);
    item(cards, article);
  });
}
//ajoute les enfants de l'article
function elementsCard(article, image, title, paragraph) {
  article.appendChild(image);
  article.appendChild(title);
  article.appendChild(paragraph);
}
//Création du lien d'un article et récupération de celui-ci
function makeCard(_id) {
  const cards = document.createElement("a");
  cards.href = "./product.html?id=" + _id;
  return cards;
}
//ajoute les enfants à la section avec l'id
function item(cards, article) {
  const items = document.getElementById("items");
  items.appendChild(cards);
  cards.appendChild(article);
}
//création <img> avec sa source et sa description, affiche l'image
function makeImg(imageUrl, altTxt) {
  const image = document.createElement("img");
  image.src = imageUrl;
  image.alt = altTxt;
  return image;
}
//création <h3> attibution de la classe, ajout du nom et l'affiche  
function makeTitle(name) {
  const title = document.createElement("h3");
  title.classList.add("productName");
  title.textContent = name;
  return title;
}
//création <p> attibution de la classe, ajoute description et l'affiche  
function makeParagraph(description) {
  const paragraph = document.createElement("p");
  paragraph.textContent = description;
  paragraph.classList.add("productDescription");
  return paragraph;
}
