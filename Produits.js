// Utiliser stock comme source unique
let stock = JSON.parse(localStorage.getItem("stock")) || [];
const searchInput = document.getElementById("search");
function displayProducts(filter = "") {
    const container = document.getElementById("products-container");
    container.innerHTML = "";

    stock
        .filter(p => p.name.toLowerCase().starsWith(filter.toLowerCase()))
        .forEach(p => {
            const card = document.createElement("div");
            card.className = "product-card";
            card.innerHTML = `
                <img src="images/${p.img}" alt="${p.name}">
                <h3>${p.name}</h3>
                <p>Prix: ${p.price} DT</p>
                <p>Stock: ${p.quantity}</p>
                <button ${p.quantity === 0 ? "disabled" : ""}>Ajouter</button>
            `;
            card.querySelector("button").addEventListener("click", () => addToCart(p));
            container.appendChild(card);
        });
}




// Ajouter au panier
function addToCart(index){
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const produit = stock[index]; // prendre du stock directement

    if(produit.quantity === 0) return alert("Stock insuffisant !");

    let exist = cart.find(p => p.name === produit.name);
    if(exist){
        exist.quantity++;
    }else{
        cart.push({name: produit.name, price: produit.price, quantity:1});
    }

    // Diminuer le stock
    produit.quantity--;
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("stock", JSON.stringify(stock));

    displayProducts(); // Mettre à jour l'affichage pour désactiver bouton si stock=0
    alert(`${produit.name} ajouté au panier !`);
}
searchInput.addEventListener("input", (e)=>{
    displayProducts(e.target.value);
})
// Barre de recherche
//document.getElementById("search").addEventListener("input", e => {
    //displayProducts(e.target.value);
//});

displayProducts();
