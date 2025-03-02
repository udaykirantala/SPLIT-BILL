document.addEventListener("DOMContentLoaded", loadGroups);

function addGroup() {
    let groupName = document.getElementById("groupName").value.trim();
    if (groupName === "") return alert("Group name cannot be empty!");

    let groups = JSON.parse(localStorage.getItem("groups")) || [];
    groups.push({ name: groupName, members: [], expenses: [] });
    localStorage.setItem("groups", JSON.stringify(groups));

    document.getElementById("groupName").value = "";
    loadGroups();
}

function loadGroups() {
    let groupList = document.getElementById("groupList");
    groupList.innerHTML = "";

    let groups = JSON.parse(localStorage.getItem("groups")) || [];
    groups.forEach((group, index) => {
        let div = document.createElement("div");
        div.className = "group-card";
        div.innerHTML = `
            <p>${group.name}</p>
            <button onclick="manageGroup(${index})">Manage</button>
            <button class="delete-btn" onclick="deleteGroup(${index})">Delete</button>
        `;
        groupList.appendChild(div);
    });
}

function manageGroup(index) {
    localStorage.setItem("currentGroup", index);
    window.location.href = "group.html";
}

function deleteGroup(index) {
    let groups = JSON.parse(localStorage.getItem("groups")) || [];
    groups.splice(index, 1);
    localStorage.setItem("groups", JSON.stringify(groups));
    loadGroups();
}
