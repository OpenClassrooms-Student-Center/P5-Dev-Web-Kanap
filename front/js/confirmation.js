
// On cherche le orderId dans le urlsp
const newUrl = new URLSearchParams(window.location.search);
const confirmationNumber = newUrl.get('id');

// Fonction pour afficher le numéro de commande
function orderNumber(){
    document.getElementById('orderId').innerText = confirmationNumber;
    alert('Commande validée avec succès!');
    localStorage.clear();
}
orderNumber();
