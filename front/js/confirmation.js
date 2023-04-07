const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const productId = urlParams.get("orderId");
document.getElementById("orderId").innerHTML = productId;
