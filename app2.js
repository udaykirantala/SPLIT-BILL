// Get Group ID from URL
const urlParams = new URLSearchParams(window.location.search);
const groupId = urlParams.get("id");

// Retrieve groups from LocalStorage
let groups = JSON.parse(localStorage.getItem("groups")) || [];
let group = groups.find(g => g.id === groupId);

// Load Group Details
function loadGroup() {
    if (!group) {
        alert("Group not found!");
        window.location.href = "index.html";
        return;
    }

    document.getElementById("groupTitle").innerText = group.name;
    updateMemberList();
    updatePayerDropdown();
    calculateBalances();
}

// Delete Group
function deleteGroup() {
    groups = groups.filter(g => g.id !== groupId);
    localStorage.setItem("groups", JSON.stringify(groups));
    window.location.href = "index.html";
}

// Add Member
function addMember() {
    let memberName = document.getElementById("memberName").value.trim();
    if (memberName === "" || group.members.includes(memberName)) {
        alert("Enter a unique member name!");
        return;
    }

    group.members.push(memberName);
    saveGroups();
    updateMemberList();
    updatePayerDropdown();
}

// Remove Member
function removeMember(index) {
    group.members.splice(index, 1);
    saveGroups();
    updateMemberList();
    updatePayerDropdown();
}

// Update Member List UI
function updateMemberList() {
    let memberList = document.getElementById("memberList");
    memberList.innerHTML = "";
    group.members.forEach((member, index) => {
        memberList.innerHTML += `<li>${member} <button onclick="removeMember(${index})">Remove</button></li>`;
    });
}

// Update Payer Dropdown
function updatePayerDropdown() {
    let payerSelect = document.getElementById("payerSelect");
    payerSelect.innerHTML = "";
    group.members.forEach(member => {
        payerSelect.innerHTML += `<option value="${member}">${member}</option>`;
    });
}

// Add Expense
function addExpense() {
    let amount = parseFloat(document.getElementById("expenseAmount").value);
    let payer = document.getElementById("payerSelect").value;

    if (!amount || amount <= 0 || !payer) {
        alert("Enter a valid expense amount and select a payer!");
        return;
    }

    group.expenses.push({ payer, amount });
    saveGroups();
    calculateBalances();
}

// Calculate Balances
function calculateBalances() {
    let balances = {};
    group.members.forEach(member => balances[member] = 0);

    group.expenses.forEach(expense => {
        let splitAmount = expense.amount / group.members.length;
        balances[expense.payer] += expense.amount;
        group.members.forEach(member => {
            if (member !== expense.payer) balances[member] -= splitAmount;
        });
    });

    let balanceSheet = document.getElementById("balanceSheet");
    balanceSheet.innerHTML = "";
    for (let member in balances) {
        let status = balances[member] < 0 ? "owes" : "is owed";
        balanceSheet.innerHTML += `<li>${member} ${status} ₹${Math.abs(balances[member]).toFixed(2)}</li>`;
    }
}

// Save Groups to LocalStorage
function saveGroups() {
    localStorage.setItem("groups", JSON.stringify(groups));
}

// Load data on page refresh
document.addEventListener("DOMContentLoaded", loadGroup);
