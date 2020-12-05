let orders;
const countElt = document.getElementById("count-elt");
$(document).ready(function() { 
    const userLoggedIn = JSON.parse(localStorage.getItem("userLoggedIn"));
    if(!userLoggedIn || !userLoggedIn.status) {
        window.location.replace("../index.html");
        return;
    } 
    $.ajax({
        type: "GET",
        url: "https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/orders",
        success: function(response) {
            console.log(response);
            orders=response;
            countElt.innerText=response.length;
            const ordersTable = document.getElementById("orders-table")
            for(const order of orders) {
                const { id, customerName, orderDate, orderTime, amount, orderStatus} = order;
                const tableRow = createOrderRow(id, customerName, orderDate, orderTime, amount, orderStatus);
                ordersTable.appendChild(tableRow);
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


});

const activeFilters = {
    "New":true,
    "Packed":true,
    "InTransit": true,
    "Delivered": true
};


function handleFilterCheck(e) {
    activeFilters[e.target.name] = e.target.checked;
    let count=0;
    for(const order of orders) {
        const orderRow = document.getElementById(order.id);
        if(!activeFilters[order.orderStatus]) orderRow.style.display="none";
        else {
            orderRow.style.display="block";
            count+=1;
        }
    }
    countElt.innerText=count;
    console.log(activeFilters);
}

function createOrderRow(rowId, customerName, orderDate, orderTime, amount, orderStatus) {
    const tableRow = document.createElement("tr");
    tableRow.id=rowId;
    tableRow.classList.add("TableRow");

    const rowIdElt = document.createElement("td");
    rowIdElt.classList.add("SecondaryText");
    const rowIdNum = document.createTextNode(rowId);
    rowIdElt.appendChild(rowIdNum);
    tableRow.appendChild(rowIdElt);

    const customerNameElt = document.createElement("td");
    customerNameElt.classList.add("PrimaryText");
    const customerNameText = document.createTextNode(customerName);
    customerNameElt.appendChild(customerNameText);
    tableRow.appendChild(customerNameElt);

    const orderDateTimeElt = document.createElement("td");
    orderDateTimeElt.classList.add("PrimaryText");
    const orderDateText = document.createTextNode(orderDate);
    orderDateTimeElt.appendChild(orderDateText);
    const brTag = document.createElement('br');
    orderDateTimeElt.appendChild(brTag);
    const timeElt=document.createElement('span');
    timeElt.classList.add("SecondaryText");
    const timeText = document.createTextNode(orderTime);
    timeElt.appendChild(timeText);
    orderDateTimeElt.appendChild(timeElt);
    tableRow.appendChild(orderDateTimeElt);

    const amountElt = document.createElement("td");
    amountElt.classList.add("SecondaryText");
    const amountNum = document.createTextNode('$'+amount);
    amountElt.appendChild(amountNum);
    tableRow.appendChild(amountElt);

    const orderStatusElt = document.createElement("td");
    orderStatusElt.classList.add("PrimaryText");
    const statusText = document.createTextNode(orderStatus);
    orderStatusElt.appendChild(statusText);
    tableRow.appendChild(orderStatusElt);

    return tableRow;
}