const getOrderId = () => {
   const windowSearch = window.location.search;
   const urlParams = new URLSearchParams(windowSearch);
   return urlParams.get("orderId");
   }
const orderId = getOrderId();
   
const displayOrderId = () => {
   const orderIdItem = document.getElementById("orderId");
     orderIdItem.textContent = orderId;
}
displayOrderId();