
const getOrderId = () => {
   const windowSearch = window.location.search;
   const urlParams = new URLSearchParams(windowSearch);
   return urlParams.get("orderId");
}

const displayOrderId = (orderId) => {
   const orderIdItem = document.getElementById("orderId");
   orderIdItem.textContent = orderId; // insère le numéro de commande
}

const clearingCart = () => {
   const cartCache = window.localStorage;
   cartCache.clear();
};

const orderId = getOrderId();
displayOrderId(orderId);
clearingCart();