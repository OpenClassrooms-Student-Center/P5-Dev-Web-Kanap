const orderId = getOrderId();
displayOrderId(orderId)

function getOrderId(){
    const Url = new URL(document.location).searchParams;
    const orderId = Url.get('orderId')
    return orderId
}
    
function displayOrderId(orderId){
    const orderIdElement = document.getElementById('orderId')
    orderIdElement.textContent = orderId
    console.log(orderId)
}
