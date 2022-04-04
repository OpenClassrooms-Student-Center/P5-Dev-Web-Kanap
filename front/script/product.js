let params = new URL(document.location).searchParams;
let id = params.get("id");


// RECUPERATION DE L'API
const dataApi = fetch(`http://localhost:3000/api/products/${id}`)

dataApi.then(async (resData) => {
    const res = await resData.json();


    try{
        // IMAGE
        var deleteImg = document.querySelector(".item__img")
        while(deleteImg.firstChild)
            deleteImg.removeChild(deleteImg.firstChild)

        const productImg = document.createElement("img");
        deleteImg.appendChild(productImg);
        productImg.src = res.imageUrl;
        productImg.alt = res.altTxt;

        // NOM DU PRODUIT
        var deleteName = document.querySelector("#title")
        while(deleteName.firstChild)
            deleteName.removeChild(deleteName.firstChild)

        const productName=document.querySelector("#title")
        productName.innerHTML = res.name;

        // PRIX DU PRODUIT
        var deletePrice = document.querySelector("#price")
        while(deletePrice.firstChild)
            deletePrice.removeChild(deletePrice.firstChild)

        const productPrice=document.querySelector("#price")
        productPrice.innerHTML = res.price;

        // DESCRIPTION DU PRODUIT
        var deleteDescription = document.querySelector("#description")
        while(deleteDescription.firstChild)
            deleteDescription.removeChild(deleteDescription.firstChild)

        const productDescription=document.querySelector("#description")
        productDescription.innerHTML = res.description;

        var deleteColor = document.querySelector("#colors")
        while(deleteColor.firstChild)
            deleteColor.removeChild(deleteColor.firstChild)

        var colorSelect = document.getElementById("colors")
        for (var i = 0; i < res.colors.length; i++){
            let option = document.createElement("option")
            option.innerText = res.colors[i]
            option.value = res.colors[i]
            colorSelect.appendChild(option);
        }

        // FONCTIONNEMENT DU BOUTON PANIER
        var buttonCart = document.querySelector("#addToCart")
        buttonCart.addEventListener("click", () => {
            var quantity = document.querySelector("#quantity")
            if (quantity.value > 0 && quantity.value < 100){
                //CREATION DU PRODUIT A AJOUTER AU PANIER
                let productAdded = {
                    imageUrl: productImg.src,
                    name: productName.innerHTML,
                    price: parseFloat(productPrice.innerHTML),
                    quantity: parseFloat(quantity.value),
                    _id: id,
                    colors: colorSelect.value
                };

                // GESTION DU LOCAL STORAGE
                let arrayProduct = [];

                //Regarder si le canapé que tu veux ajouter est déja présent, si oui, incrémenter sa quantité
                console.log(localStorage.getItem("products"));
                if (localStorage.getItem("products") !== null){
                    arrayProduct = JSON.parse(localStorage.getItem("products"));
                    let notFound = true;
                    arrayProduct.map((v,k) => {
                        if (v._id === productAdded._id && v.colors === productAdded.colors) {
                            arrayProduct[k].quantity += productAdded.quantity;
                            console.log('trouvé')
                            notFound = false
                        }
                    })
                    if(notFound) {
                        console.log('pas trouvé')
                        arrayProduct.push(productAdded)
                    }
                } else arrayProduct.push(productAdded);
                // SI LE LOCAL STORAGE EST VIDE, ON LE CREE AVEC LE PRODUIT A AJOUTER
                localStorage.setItem("products", JSON.stringify(arrayProduct));
            }
        })


    }catch (err){
        console.log(err);
    }
})

    .catch((err) => {
        console.log(err);
    });
