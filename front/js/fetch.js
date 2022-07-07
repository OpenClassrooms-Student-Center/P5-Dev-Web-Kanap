// --------------------------------------------
// Fonction générale pour fetch les produits
export function fetchAllProducts(displayAllProducts) {
    fetch('http://localhost:3000/api/products')
        .then(function (res) {
            if (res.ok) {
                return res.json();
            }
        })
        .then(displayAllProducts)
    .catch(function () {
        alert('Une erreur est survenue');
      });
}


