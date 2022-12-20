const itemId = new URL(location.href).searchParams.get("id");

fetch("http://localhost:3000/api/products/" + itemId) // Requête pour récupérer les json dans Product.js et créer les url pour chaque itemId
  .then((res) => res.json())
  .then((json) => displayProduct(json));

const displayProduct = (product) => {
  const img = document.createElement("img"); // Crée un élément img avec 2 attributs (URL et texte alt)
  img.setAttribute("src", product.imageUrl);
  img.setAttribute("alt", product.altTxt);

  const itemImg = document.querySelector(".item__img");
  itemImg.append(img); // Crée un élément itemImg (photo de l'article), parent de img -> insère la photo de l'article

  const itemTitle = document.querySelector("#title");
  itemTitle.textContent = product.name; // Donne le contenu de name à itemTitle

  const itemPrice = document.querySelector("#price");
  itemPrice.textContent = product.price; // Donne la valeur de price à itemPrice

  const itemDescription = document.getElementById("description");
  itemDescription.textContent = product.description; // Donne le contenu de description à itemDescription

  const itemColors = document.getElementById("colors"); // Récupère ce qui se trouve dans #colors

  const arrayColors = product.colors;
  for (let i = 0; i < arrayColors.length; i++) {
    // Pour chaque élément du arrayColors, crée une ligne dans la liste
    const option = document.createElement("option"); // chaque ligne est une option
    option.textContent = arrayColors[i];
    itemColors.appendChild(option); // crée un élément option, enfant de itemColors (pour chaque élément)
  }

  const addToCart = document.querySelector("#addToCart");

  if (addToCart != null) {
    addToCart.addEventListener("click", () => {
      const color = document.querySelector("#colors").value
      const quantity = document.querySelector("#quantity").value
      if (color == null || color === "" || quantity == null || quantity == 0) {
        alert("Veuillez sélectionner une couleur ET une quantité, SVP.")
        return
      }
      
      const dataCart = {
        id: itemId,
        color: color,
        quantity: quantity,
        price: product.price,
        imageUrl: img.src,
        altText: product.altTxt
      }
      localStorage.setItem(itemId, JSON.stringify(dataCart) );

      for( let i = 0; i < localStorage.length; i++){
          localStorage.key(i);}

      window.location.href = "cart.html";

      console.log(localStorage);
    });
  }
};
