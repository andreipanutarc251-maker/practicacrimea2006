"use strict";

/* ===============================
   FASTCOURIER PRO - APP CORE
=================================*/

const App = {
state: {
orders: [],
user: null,
darkMode: false
},

/* ================= LOAD DATA ================= */
init() {
this.loadStorage();
this.bindUI();
this.render();
this.toast("Aplicație încărcată 🚀");
},

/* ================= STORAGE ================= */
loadStorage() {
this.state.orders = JSON.parse(localStorage.getItem("orders")) || [];
this.state.darkMode = JSON.parse(localStorage.getItem("dark")) || false;

if(this.state.darkMode){
document.body.classList.add("dark");
}
},

saveStorage() {
localStorage.setItem("orders", JSON.stringify(this.state.orders));
localStorage.setItem("dark", JSON.stringify(this.state.darkMode));
},

/* ================= UI BIND ================= */
bindUI() {
window.trackOrder = this.trackOrder.bind(this);
window.calcPrice = this.calcPrice.bind(this);
window.saveOrder = this.saveOrder.bind(this);
window.toggleDark = this.toggleDark.bind(this);
window.loginAdmin = this.loginAdmin.bind(this);
window.deleteOrder = this.deleteOrder.bind(this);
window.sendContact = this.sendContact.bind(this);
},

/* ================= ORDER SYSTEM ================= */
saveOrder() {
const from = document.getElementById("from")?.value;
const to = document.getElementById("to")?.value;

if(!from || !to){
this.toast("Completează toate câmpurile ❌");
return;
}

const order = {
id: Date.now(),
from,
to,
status: "În așteptare"
};

this.state.orders.push(order);
this.saveStorage();

this.toast("Comandă salvată ✔");
this.renderOrders();
},

renderOrders() {
const box = document.getElementById("orders");
if(!box) return;

box.innerHTML = "";

this.state.orders.forEach(o => {
const div = document.createElement("tr");

div.innerHTML = `
<td>${o.id}</td>
<td>${o.from}</td>
<td>${o.to}</td>
<td>${o.status}</td>
<td><button onclick="App.deleteOrder(${o.id})">Șterge</button></td>
`;

box.appendChild(div);
});
},

deleteOrder(id){
this.state.orders = this.state.orders.filter(o => o.id !== id);
this.saveStorage();
this.renderOrders();
this.toast("Comandă ștearsă 🗑");
},

/* ================= TRACKING ================= */
trackOrder() {
const code = document.getElementById("trackCode")?.value;
const result = document.getElementById("result");

if(!code){
this.toast("Introdu cod ❌");
return;
}

const found = this.state.orders.find(o => o.id == code);

if(found){
result.innerText = `📦 ${found.from} ➝ ${found.to} | ${found.status}`;
} else {
result.innerText = "Colet inexistent ❌";
}
},

/* ================= PRICE CALCULATOR ================= */
calcPrice(weight) {
const kg = document.getElementById("kg")?.value;

if(!kg){
this.toast("Introdu greutatea ❌");
return;
}

let price = 10 + (kg * 2.5);

if(kg > 10) price *= 0.9; // discount

document.getElementById("priceOut").innerText =
`Preț estimat: ${price.toFixed(2)} lei`;

this.toast("Preț calculat 💰");
},

/* ================= DARK MODE ================= */
toggleDark() {
this.state.darkMode = !this.state.darkMode;
document.body.classList.toggle("dark");

this.saveStorage();
this.toast(this.state.darkMode ? "Dark mode ON 🌙" : "Light mode ☀️");
},

/* ================= LOGIN ADMIN ================= */
loginAdmin() {
const pass = prompt("Parolă admin:");

if(pass === "1234"){
this.state.user = "admin";
document.getElementById("admin")?.style.display = "block";
this.renderOrders();
this.toast("Login reușit 🔐");
} else {
this.toast("Parolă greșită ❌");
}
},

/* ================= CONTACT VALIDATION ================= */
sendContact() {
const email = document.getElementById("email")?.value;
const msg = document.getElementById("msg")?.value;

if(!email || !email.includes("@")){
this.toast("Email invalid ❌");
return;
}

if(!msg){
this.toast("Scrie mesaj ❌");
return;
}

this.toast("Mesaj trimis ✔");
},

/* ================= TOAST NOTIFICATIONS ================= */
toast(message) {
const div = document.createElement("div");
div.innerText = message;

div.style.position = "fixed";
div.style.bottom = "20px";
div.style.right = "20px";
div.style.background = "#111";
div.style.color = "white";
div.style.padding = "10px 15px";
div.style.borderRadius = "8px";
div.style.boxShadow = "0 10px 20px rgba(0,0,0,0.2)";
div.style.zIndex = 9999;
div.style.animation = "fadeIn 0.3s ease";

document.body.appendChild(div);

setTimeout(() => {
div.remove();
}, 2500);
},

/* ================= RENDER ================= */
render() {
this.renderOrders();
}

};

/* ================= START APP ================= */
document.addEventListener("DOMContentLoaded", () => {
App.init();
});