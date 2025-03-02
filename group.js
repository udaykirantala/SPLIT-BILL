document.addEventListener("DOMContentLoaded", loadGroup);

function loadGroup() {
    let groups = JSON.parse(localStorage.getItem("groups")) || [];
    let index = localStorage.getItem("currentGroup");
    let group = groups[index];

    document.getElementById("groupTitle").innerText = group.name;
    updateMemberList();
    updateBalanceSheet();
}

function addMember() {
    let memberName = document.getElementById("memberName").value.trim();
    if (memberName === "") return alert("Member name cannot be empty!");

    let groups = JSON.parse(localStorage.getItem("groups"));
    let index = localStorage.getItem("currentGroup");
    groups[index].members.push(memberName);
    localStorage.setItem("groups", JSON.stringify(groups));

    document.getElementById("memberName").value = "";
    updateMemberList();
}

function updateMemberList() {
    let memberList = document.getElementById("memberList");
    memberList.innerHTML = "";

    let groups = JSON.parse(localStorage.getItem("groups"));
    let index = localStorage.getItem("currentGroup");
    let group = groups[index];

    group.members.forEach((member, i) => {
        let div = document.createElement("div");
        div.className = "member-card";
        div.innerHTML = `${member} <button onclick="removeMember(${i})">Remove</button>`;
        memberList.appendChild(div);
    });

    let payerSelect = document.getElementById("payerSelect");
    payerSelect.innerHTML = group.members.map(m => `<option>${m}</option>`).join("");
}

function removeMember(i) {
    let groups = JSON.parse(localStorage.getItem("groups"));
    let index = localStorage.getItem("currentGroup");
    groups[index].members.splice(i, 1);
    localStorage.setItem("groups", JSON.stringify(groups));
    updateMemberList();
}

function addExpense() {
    let amount = parseFloat(document.getElementById("expenseAmount").value);
    let payer = document.getElementById("payerSelect").value;

    if (isNaN(amount) || amount <= 0) return alert("Please enter a valid amount!");

    let groups = JSON.parse(localStorage.getItem("groups"));
    let index = localStorage.getItem("currentGroup");
    let group = groups[index];

    group.expenses.push({ amount, payer });
    localStorage.setItem("groups", JSON.stringify(groups));

    document.getElementById("expenseAmount").value = "";
    updateBalanceSheet();
}

function updateBalanceSheet() {
    let groups = JSON.parse(localStorage.getItem("groups"));
    let index = localStorage.getItem("currentGroup");
    let group = groups[index];

    let balances = {};
    group.members.forEach(member => (balances[member] = 0));

    group.expenses.forEach(expense => {
        let splitAmount = expense.amount / group.members.length;
        group.members.forEach(member => {
            if (member === expense.payer) {
                balances[member] += expense.amount - splitAmount;
            } else {
                balances[member] -= splitAmount;
            }
        });
    });

    let balanceList = document.getElementById("balanceList");
    balanceList.innerHTML = "";
    for (let member in balances) {
        let li = document.createElement("li");
        li.innerText = `${member}: ${balances[member].toFixed(2)}`;
        balanceList.appendChild(li);
    }
}

function goBack() {
    window.location.href = "index.html";
}
