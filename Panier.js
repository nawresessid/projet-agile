let cart = JSON.parse(localStorage.getItem("cart")) || [];

function displayCart() {
    const tbody = document.getElementById("cart-items");
    tbody.innerHTML = "";
    let total = 0;
    cart.forEach((p, i) => {
        const subTotal = p.price * p.quantity;
        total += subTotal;
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${p.name}</td>
            <td>${p.price}</td>
            <td><input type="number" min="1" value="${p.quantity}" data-index="${i}" class="qty"></td>
            <td>${subTotal}</td>
            <td><button class="remove" data-index="${i}">Supprimer</button></td>
        `;
        tbody.appendChild(row);
    });
    document.getElementById("total").textContent = total;
    attachEvents();
}

function attachEvents() {
    document.querySelectorAll(".remove").forEach(btn => {
        btn.addEventListener("click", () => {
            const i = btn.dataset.index;
            const produit = cart[i];
            const stockIndex = stock.findIndex(p => p.name === produit.name);
            if (stockIndex !== -1) stock[stockIndex].quantity += produit.quantity;
            cart.splice(i, 1);
            localStorage.setItem("cart", JSON.stringify(cart));
            saveStock();
            displayCart();
        });
    });

    document.querySelectorAll(".qty").forEach(input => {
        input.addEventListener("change", () => {
            const i = input.dataset.index;
            let value = parseInt(input.value);
            if (value < 1) value = 1;

            const produit = cart[i];
            const stockIndex = stock.findIndex(p => p.name === produit.name);
            const diff = value - produit.quantity;

            if (stock[stockIndex].quantity - diff < 0) {
                alert("Stock insuffisant !");
                input.value = produit.quantity;
                return;
            }

            produit.quantity = value;
            stock[stockIndex].quantity -= diff;

            localStorage.setItem("cart", JSON.stringify(cart));
            saveStock();

            const row = input.closest("tr");
            row.querySelector(".sub-total").textContent = `${produit.price * produit.quantity} DT`;


            const total = cart.reduce((acc, p) => acc + p.price * p.quantity, 0);
            document.getElementById("total").textContent = total;
        });
    });
}

document.getElementById("confirm-btn").addEventListener("click", e => {
    e.preventDefault();
    if (cart.length === 0) return alert("Panier vide !");
    alert("Commande confirmée !");
    cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
});

document.getElementById("clear-cart").addEventListener("click", () => {
    if (confirm("Vraiment annuler tout le panier ?")) {
        cart.forEach(p => {
            const stockIndex = stock.findIndex(s => s.name === p.name);
            if (stockIndex !== -1) stock[stockIndex].quantity += p.quantity;
        });
        cart = [];
        localStorage.setItem("cart", JSON.stringify(cart));
        saveStock();
        displayCart();
    }
});

document.getElementById("modify-btn").addEventListener("click", () => {
    document.getElementById("checkout-form").reset();
});

document.getElementById("cancel-btn").addEventListener("click", () => {
    if (confirm("Voulez-vous vraiment annuler la commande ?")) {
        cart.forEach(p => {
            const stockIndex = stock.findIndex(s => s.name === p.name);
            if (stockIndex !== -1) stock[stockIndex].quantity += p.quantity;
        });
        cart = [];
        localStorage.setItem("cart", JSON.stringify(cart));
        saveStock();
        displayCart();
        document.getElementById("checkout-form").reset();
    }
});

displayCart();
