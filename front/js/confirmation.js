//On recupère l'order id et on l'affiche dans la page, puis on clear le LocalStorage
let url = new URL(location.href);
let orderId = url.searchParams.get("orderId");

const docOrderId = document.getElementById("orderId");
docOrderId.innerHTML = `${orderId}`;

localStorage.clear();
