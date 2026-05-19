function staffLogin() {
  let username = document.getElementById("staffUsername").value;
  let password = document.getElementById("staffPassword").value;

  if (username === "" || password === "") {
    alert("Please fill in username and password");
    return;
  }

  if (username === "staff" && password === "1234") {
    localStorage.setItem("role", "staff");
    window.location.href = "staff-dashboard.html";
    return;
  }

  let staffs = JSON.parse(localStorage.getItem("staffAccounts")) || [];

  for (let i = 0; i < staffs.length; i++) {
    if (username === staffs[i].username && password === staffs[i].password) {
      localStorage.setItem("role", "staff");
      window.location.href = "staff-dashboard.html";
      return;
    }
  }

  alert("Invalid staff username or password");
}

function managerLogin() {
  let username = document.getElementById("managerUsername").value;
  let password = document.getElementById("managerPassword").value;

  if (username === "" || password === "") {
    alert("Please fill in username and password");
    return;
  }

  if (username === "manager" && password === "1234") {
    localStorage.setItem("role", "manager");
    window.location.href = "manager-dashboard.html";
  } else {
    alert("Invalid manager username or password");
  }
}

function checkTransactionPermission() {

  let role = localStorage.getItem("role");

  if (role !== "manager" && role !== "staff") {

    alert("You have no permission");

    window.location.href = "index.html";
  }

  if (role === "manager") {

    document.getElementById("staffBack").style.display = "none";
  }

  if (role === "staff") {

    document.getElementById("managerBack").style.display = "none";
  }
}


function logout() {
  localStorage.removeItem("role");
  window.location.href = "index.html";
}

/* Create Gold Type */
function addGoldType() {
  let goldType = document.getElementById("goldType").value;

  if (goldType === "") {
    alert("Please enter gold type");
    return;
  }

  let goldTypes = JSON.parse(localStorage.getItem("goldTypes")) || [];

  goldTypes.push(goldType);

  localStorage.setItem("goldTypes", JSON.stringify(goldTypes));

  document.getElementById("goldType").value = "";

  showGoldTypes();
}

function showGoldTypes() {
  let goldTypes = JSON.parse(localStorage.getItem("goldTypes")) || [];

  let text = "";

  if (goldTypes.length === 0) {
    text = "No gold type created yet";
  }

  for (let i = 0; i < goldTypes.length; i++) {
    text += (i + 1) + ". " + goldTypes[i] + "<br>";
  }

  document.getElementById("goldTypeList").innerHTML = text;
}

/* Adjust Gold Price */
function saveGoldPrice() {
  let goldName = document.getElementById("goldName").value;
  let goldPrice = document.getElementById("goldPrice").value;

  if (goldName === "" || goldPrice === "") {
    alert("Please fill in all fields");
    return;
  }

  let goldPrices = JSON.parse(localStorage.getItem("goldPrices")) || {};

  goldPrices[goldName] = goldPrice;

  localStorage.setItem("goldPrices", JSON.stringify(goldPrices));

  document.getElementById("goldName").value = "";
  document.getElementById("goldPrice").value = "";

  showGoldPrices();
}

function showGoldPrices() {
  let goldPrices = JSON.parse(localStorage.getItem("goldPrices")) || {};

  let text = "";

  let hasPrice = false;

  for (let gold in goldPrices) {
    hasPrice = true;
    text += gold + " : RM " + goldPrices[gold] + " / gram<br>";
  }

  if (hasPrice === false) {
    text = "No gold price available";
  }

  document.getElementById("priceList").innerHTML = text;
}

/* Manage Staff Account */
function createStaff() {
  let username = document.getElementById("staffName").value;
  let password = document.getElementById("staffPass").value;

  if (username === "" || password === "") {
    alert("Please fill in all fields");
    return;
  }

  let staffs = JSON.parse(localStorage.getItem("staffAccounts")) || [];

  staffs.push({
    username: username,
    password: password
  });

  localStorage.setItem("staffAccounts", JSON.stringify(staffs));

  document.getElementById("staffName").value = "";
  document.getElementById("staffPass").value = "";

  showStaffAccounts();
}

function showStaffAccounts() {
  let staffs = JSON.parse(localStorage.getItem("staffAccounts")) || [];

  let text = "";

  if (staffs.length === 0) {
    text = "No staff account created yet";
  }

  for (let i = 0; i < staffs.length; i++) {
    text += (i + 1) + ". " + staffs[i].username + "<br>";
  }

  document.getElementById("staffList").innerHTML = text;
}

/* Staff Create Transaction */
function createTransaction() {
  let customerName = document.getElementById("customerName").value;
  let customerIC = document.getElementById("customerIC").value;
  let customerPhone = document.getElementById("customerPhone").value;
  let transactionGold = document.getElementById("transactionGold").value;
  let transactionAmount = document.getElementById("transactionAmount").value;

  if (
    customerName === "" ||
    customerIC === "" ||
    customerPhone === "" ||
    transactionGold === "" ||
    transactionAmount === ""
  ) {
    alert("Please fill in all fields");
    return;
  }

  let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

  let newTransaction = {
    customer: customerName,
    ic: customerIC,
    phone: customerPhone,
    gold: transactionGold,
    amount: transactionAmount,
    status: "Pending"
  };

  transactions.push(newTransaction);

  localStorage.setItem("transactions", JSON.stringify(transactions));

  alert("Transaction created successfully");

  document.getElementById("customerName").value = "";
  document.getElementById("customerIC").value = "";
  document.getElementById("customerPhone").value = "";
  document.getElementById("transactionGold").value = "";
  document.getElementById("transactionAmount").value = "";

  showStaffTransactions();
}

function showStaffTransactions() {
  let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

  let text = "";

  if (transactions.length === 0) {
    text = "No transaction created yet";
  }

  for (let i = 0; i < transactions.length; i++) {
    text +=
      "Customer: " + transactions[i].customer + "<br>" +
      "IC: " + transactions[i].ic + "<br>" +
      "Phone: " + transactions[i].phone + "<br>" +
      "Gold: " + transactions[i].gold + "<br>" +
      "Amount: RM " + transactions[i].amount + "<br>" +
      "Status: " + transactions[i].status + "<br><br>";
  }

  document.getElementById("staffTransactionList").innerHTML = text;
}

/* Manager View All Transactions */
function showTransactions() {
  let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

  let text = "";

  if (transactions.length === 0) {
    text = "No transaction found";
  }

  for (let i = 0; i < transactions.length; i++) {
    text +=
      "<b>Transaction " + (i + 1) + "</b><br>" +
      "Customer: " + transactions[i].customer + "<br>" +
      "IC: " + transactions[i].ic + "<br>" +
      "Phone: " + transactions[i].phone + "<br>" +
      "Gold: " + transactions[i].gold + "<br>" +
      "Amount: RM " + transactions[i].amount + "<br>" +
      "Status: " + transactions[i].status + "<br><br>";
  }

  document.getElementById("transactionList").innerHTML = text;
}