// confirmation de la commande + numéro de commande 


    // recuperation de l'ID via l'URL
let orderId = new URL(window.location.href).searchParams.get("orderId");

console.log(orderId);

    // insertion du numéro de commande 
document.querySelector('#orderId').textContent = orderId;

