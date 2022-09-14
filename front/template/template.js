class KanapCard {
  constructor(kanap) {
    this._kanap = kanap
  }

  createKanapCard() {
    const $wrapper = document.createElement('div')
    $wrapper.classList.add('items_warpper')

    const kanapCard = ` <a href="./product.html?id=${this._kanap.id}">
        <article>
          <img src="${this._kanap.picture}" alt="${this._kanap.altTxt}">
          <h3 class="productName">${this._kanap.name}</h3>
          <p class="productDescription">${this._kanap.description}.</p>
        </article>
      </a> `


    $wrapper.innerHTML = kanapCard
    return $wrapper
  }
}
