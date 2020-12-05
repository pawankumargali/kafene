$(document).ready(function() { 

    const userLoggedIn = JSON.parse(localStorage.getItem("userLoggedIn"));
    if(userLoggedIn && userLoggedIn.status==true) {
        window.location.replace("../orders.html");
        return;
    } 

    $("#login-btn").click(function(e) {
        e.preventDefault();
        const username = $("#username").val();
        const password = $("#password").val();
        if(username!==password) 
            alert("Please enter valid credentials");
        else {
            const data = { username: 'Qaifi', password: 'Password' } ;
            $.ajax({
                type: "POST",
                url: "https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/login",
                data: data,
                success: function(response) {
                    console.log("Response :", response);
                    alert("Login successful");
                    localStorage.setItem('userLoggedIn', JSON.stringify({ status: true }));
                    window.location.replace("../orders.html");
                },
                error: function(error) {
                    console.log("Error :",error);
                    alert("Login failed. Please try again");
                }
            });
        }
    });
})