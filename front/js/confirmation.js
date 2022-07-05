// const newUrl = new URLSearchParams(window.location.search);
// const confirmationNumber = newUrl.get('orderId');
// console.log(confirmationNumber);

// function orderNumber(){
//     document.getElementById('orderId').innerText = confirmationNumber;
//     alert('Commande validée avec succes!')
//     localStorage.clear();
// }
// orderNumber();

let confirmationNumber = document.getElementById('orderId');
confirmationNumber.innerText = localStorage.getItem('orderId');
console.log(localStorage.getItem('orderId'));
localStorage.clear();