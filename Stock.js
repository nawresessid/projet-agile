
let stock = JSON.parse(localStorage.getItem("stock")) || [];

const form = document.getElementById("add-form");
const stockItems = document.getElementById("stock-items");


form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const price = parseFloat(document.getElementById("price").value);
    const quantity = parseInt(document.getElementById("quantity").value);
    const img = document.getElementById("img").value;

    stock.push({ name, price, quantity, img });
    localStorage.setItem("stock", JSON.stringify(stock));

    form.reset();
    displayStock();
});

function displayStock() {
    stockItems.innerHTML = "";

    stock.forEach((p, index) => {
        stockItems.innerHTML += `
            <tr>
                <td><img src="images/${p.img}" width="50"></td>
                <td>${p.name}</td>
                <td>${p.price} DT</td>
                <td>${p.quantity}</td>
                <td>
                    <button onclick="editProduct(${index})">Modifier</button>
                    <button onclick="deleteProduct(${index})">Supprimer</button>
                </td>
            </tr>
        `;
    });
}

function editProduct(index) {
    const p = stock[index];

    const name = prompt("Nom :", p.name);
    const price = prompt("Prix :", p.price);
    const quantity = prompt("Quantité :", p.quantity);
    const img = prompt("Image :", p.img);

    if (name && price && quantity && img) {
        stock[index] = {
            name,
            price: parseFloat(price),
            quantity: parseInt(quantity),
            img
        };
        localStorage.setItem("stock", JSON.stringify(stock));
        displayStock();
    }
}

function deleteProduct(index) {
    if (confirm("Supprimer ce produit ?")) {
        stock.splice(index, 1);
        localStorage.setItem("stock", JSON.stringify(stock));
        displayStock();
    }
}

window.onload = displayStock;
