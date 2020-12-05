const navItems = document.getElementsByClassName("MenuItem");
console.log(navItems);
for(const item of navItems) {
    item.addEventListener('click', function(e) {
        item.classList.add("MenuItemActive");
    });
}

const userLoggedIn = JSON.parse(localStorage.getItem("userLoggedIn"));
const logoutBtn = document.getElementById("logout-btn");
if(!userLoggedIn || !userLoggedIn.status) {
   logoutBtn.style.display="none";
}
else {
    logoutBtn.style.display="inline";
}   

logoutBtn.addEventListener('click', function() {
    localStorage.removeItem("userLoggedIn");
    window.location.replace('../index.html');
})


