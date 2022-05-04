main ();

function main() {
    let params = new URL(document.location).searchParams;
    let id = params.get("orderid");
    displayOrderId(id);
}

function displayOrderId(id) {
    const orderId = document.querySelector("#orderId");
    orderId.innerHTML = id;
}