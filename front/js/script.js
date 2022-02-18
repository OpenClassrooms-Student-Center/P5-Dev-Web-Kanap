const section = document.getElementById("items");
const panierLocalStorage = localStorage.getItem("panier");

const response = async function () {
  fetch("http://localhost:3000/api/products")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      for (const kanap of data) {
        let article = `<a href="./product.html?id=${kanap._id}">
        <article>
          <img
            src="${kanap.imageUrl}"
            alt="${kanap.altTxt}"
          />
          <h3 class="productName">${kanap.name}</h3>
          <p class="productDescription">
            ${kanap.description}
          </p>
        </article>
      </a>`;
        section.innerHTML += article;
      }
    })
    .catch((e) => {
      console.log(data.status);
    });
};
response();
