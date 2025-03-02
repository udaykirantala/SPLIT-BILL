// Load groups from LocalStorage
let groups = JSON.parse(localStorage.getItem("groups")) || [];

// Create a new group
function createGroup() {
    let groupName = document.getElementById("groupName").value.trim();
    if (groupName === "") {
        alert("Enter a valid group name!");
        return;
    }

    let groupId = Date.now().toString();
    groups.push({ id: groupId, name: groupName, members: [], expenses: [] });

    localStorage.setItem("groups", JSON.stringify(groups));
    displayGroups();
}

// Display existing groups
function displayGroups() {
    let groupList = document.getElementById("groupList");
    groupList.innerHTML = "";
    groups.forEach(group => {
        groupList.innerHTML += `<li><a href="group.html?id=${group.id}">${group.name}</a></li>`;
    });
}

// Load groups on page refresh
document.addEventListener("DOMContentLoaded", displayGroups);
