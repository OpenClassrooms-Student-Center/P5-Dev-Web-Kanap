const currentUrl = window.location.href;

// Créer un objet URL à partir de l'URL de la page
const url = new URL(currentUrl);

// Récupérer l'ID du produit depuis l'URL
const idParam = url.searchParams.get("id");
const orderIdSpan = document.getElementById("orderId");

if (idParam) {
  orderIdSpan.textContent = idParam;
  document.title = "Confirmation : " + idParam;
} else {
   // Modifier le contenu du paragraphe
  const confirmationParagraph = document.querySelector(".confirmation p");
  confirmationParagraph.textContent = "Une erreur est survenue avant l'enregistrement de votre commande.";
    
  window.alert("Une erreur est survenue");
}
