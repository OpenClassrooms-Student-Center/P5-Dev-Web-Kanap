class Produits {
  constructor(id, reference, name, image, altText, description) {
    this.id = id;
    this.reference = reference;
    this.name = name;
    this.image = image;
    this.altText = altText;
    this.description = description;
  }
}

let numeroId = "";

fetch("http://localhost:3000/api/products")
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function (datas) {
    for (let data of datas) {
      numeroId = ++numeroId;
      let produit = new Produits(
        numeroId,
        data._id,
        data.name,
        data.imageUrl,
        data.altTxt,
        data.description
      );
      console.log(produit);
      const a = document.createElement("a");
      items.appendChild(a);
      a.href = `./product.html?id=${produit.id}`;
      const article = document.createElement("article");
      a.appendChild(article);
      article.style.height = "425px";
      const image = document.createElement("img");
      article.appendChild(image);
      image.src = produit.image;
      const textAlt = document.createElement("alt");
      article.appendChild(textAlt);
      textAlt.textContent = produit.altText;
      textAlt.style.margin = "10px";
      textAlt.style.textAlign = "center";
      const titre = document.createElement("h3");
      article.appendChild(titre);
      titre.textContent = produit.name;
      const descriptionItem = document.createElement("p");
      article.appendChild(descriptionItem);
      descriptionItem.classList.add("productDescription");
      descriptionItem.textContent = produit.description;
    }
  })
  .catch(function (err) {
    // Une erreur est survenue
  });
