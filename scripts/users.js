let users;
$(document).ready(function() { 

    const userLoggedIn = JSON.parse(localStorage.getItem("userLoggedIn"));
    if(!userLoggedIn || !userLoggedIn.status) {
        window.location.replace("../index.html");
        return;
    } 

    $.ajax({
        type: "GET",
        url: "https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/users",
        success: function(response) {
            console.log(response);
            users=response;
            const usersTable = document.getElementById("users-table")
            for(const user of users) {
                const { id, profilePic, fullName, dob, gender, currentCity, currentCountry} = user;
                const tableRow = createUserRow(id, profilePic, fullName, dob, gender, currentCity, currentCountry);
                usersTable.appendChild(tableRow);
            }
        },
        error: function(error) {
            console.log("Error :",error);
        }
    });

    const filterCheckBoxes = document.querySelectorAll(".FilterCheckbox > input");
    console.log(filterCheckBoxes);

    for(const checkBox of filterCheckBoxes)  {
        checkBox.checked=true;
        checkBox.addEventListener("click", function(e) { 
            handleFilterCheck(e);
        });
    }

    const searchInput=document.getElementById("search-text");
    searchInput.addEventListener('keydown', function(e) {
        handleNameSearch(e);
    });

    $("#reset-search").click(function() {
        searchInput.value="";
        for(const user of users) {
            const userRow = document.getElementById(user.id);
            userRow.style.display="block"
        }
    })


});

const activeFilters = {
    "New":true,
    "Packed":true,
    "InTransit": true,
    "Delivered": true
};


function handleNameSearch(e) {
    const searchText = e.target.value;

    for(const user of users) {
        const userRow=document.getElementById(user.id);
        if(!searchText) userRow.style.display="block";
        if(user.fullName.toLowerCase().includes(searchText.toLowerCase())) userRow.style.display="block";
        else userRow.style.display="none";
    }
}


function createUserRow(rowId, profilePic, fullName, dob, gender, currentCity, currentCountry) {
    const tableRow = document.createElement("tr");
    tableRow.id=rowId;
    tableRow.classList.add("TableRow");

    const rowIdElt = document.createElement("td");
    rowIdElt.classList.add("SecondaryText");
    const rowIdNum = document.createTextNode(rowId);
    rowIdElt.appendChild(rowIdNum);
    tableRow.appendChild(rowIdElt);

    const profilePicElt = document.createElement("td");
    const profilePicImg = document.createElement("img");
    profilePicElt.classList.add("PrimaryText");
    profilePicImg.src=profilePic;
    profilePicElt.appendChild(profilePicImg);
    tableRow.appendChild(profilePicElt);

    const userNameElt = document.createElement("td");
    userNameElt.classList.add("SecondaryText");
    const userNameText = document.createTextNode(fullName);
    userNameElt.appendChild(userNameText);
    tableRow.appendChild(userNameElt);


    const [day, month, year] = dob.split("-");
    const dobElt = document.createElement("td");
    dobElt.classList.add("PrimaryText");
    const dobText = document.createTextNode(day+' '+month+', '+year);
    dobElt.appendChild(dobText);
    tableRow.appendChild(dobElt);

    const genderElt = document.createElement("td");
    genderElt.classList.add("SecondaryText");
    const genderText = document.createTextNode(gender);
    genderElt.appendChild(genderText);
    tableRow.appendChild(genderElt);

    const locationElt = document.createElement("td");
    locationElt.classList.add("SecondaryText");
    const locationText = document.createTextNode(currentCity+', '+currentCountry);
    locationElt.appendChild(locationText);
    tableRow.appendChild(locationElt);

    return tableRow;
}