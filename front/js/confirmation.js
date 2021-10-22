// recuperation of product id

var parsedUrl = new URL(window.location.href);

//Verify Id recuperation
console.log(parsedUrl.searchParams.get("order_id"));

// declare id
let orderId = parsedUrl.searchParams.get("order_id");

let orderIdContainer = document.querySelector ('#orderId');
orderIdContainer.innerHTML = orderId;