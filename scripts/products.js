let products;
const countElt = document.getElementById("count-elt");
$(document).ready(function() { 
    const userLoggedIn = JSON.parse(localStorage.getItem("userLoggedIn"));
    if(!userLoggedIn || !userLoggedIn.status) {
        window.location.replace("../index.html");
        return;
    } 
    $.ajax({
        type: "GET",
        url: "https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/products",
        success: function(response) {
            console.log(response);
            products=response;
            countElt.innerText=response.length;
            const productsTable = document.getElementById("products-table")
            for(const product of products) {
                const { id, medicineName, medicineBrand, expiryDate, unitPrice, stock } = product;
                const tableRow = createProductRow(id, medicineName, medicineBrand, expiryDate, unitPrice, stock);
                productsTable.appendChild(tableRow);
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
    "expired":true,
    "low_stock":true,
};


function handleFilterCheck(e) {
    activeFilters[e.target.name] = e.target.checked;
    let count=0;
    for(const product of products) {
        const productRow = document.getElementById(product.id);
        if(activeFilters["expired"]===true) {
            const now = new Date();
            const expiryDate = new Date(product.expiryDate);
            if(expiryDate < now)  {
                productRow.style.display="block";
                count+=1;
            }
            else productRow.style.display="none";
        }
        if(activeFilters["low_stock"]===true) {
            if(!isNaN(Number(product.stock)) && (Number(product.stock)<100)) {
                productRow.style.display="block";
                count+=1;
            }
            else productRow.style.display="none";
        }
        if(activeFilters["low_stock"]===false && activeFilters["expired"]===false ||
           activeFilters["low_stock"]===true && activeFilters["expired"]===true) {
           count=100;
           productRow.style.display="block";
        }
    }
    countElt.innerText=count;
    console.log(activeFilters);
}

function createProductRow(rowId, productName, productBrand, expiryDate, unitPrice, stock) {
    const tableRow = document.createElement("tr");
    tableRow.id=rowId;
    tableRow.classList.add("TableRow");

    const rowIdElt = document.createElement("td");
    rowIdElt.classList.add("SecondaryText");
    const rowIdNum = document.createTextNode(rowId);
    rowIdElt.appendChild(rowIdNum);
    tableRow.appendChild(rowIdElt);

    const productNameElt = document.createElement("td");
    productNameElt.classList.add("PrimaryText");
    const productNameText = document.createTextNode(productName);
    productNameElt.appendChild(productNameText);
    tableRow.appendChild(productNameElt);


    const productBrandElt = document.createElement("td");
    productBrandElt.classList.add("SecondaryText");
    const productBrandText = document.createTextNode(productBrand);
    productBrandElt.appendChild(productBrandText);
    tableRow.appendChild(productBrandElt);

    const productExpiryElt = document.createElement("td");
    productExpiryElt.classList.add("PrimaryText");
    const productExpiryText = document.createTextNode(expiryDate);
    productExpiryElt.appendChild(productExpiryText);
    tableRow.appendChild(productExpiryElt);

    const priceElt = document.createElement("td");
    priceElt.classList.add("SecondaryText");
    const priceNum = document.createTextNode('$'+unitPrice);
    priceElt.appendChild(priceNum);
    tableRow.appendChild(priceElt);

    const stockElt = document.createElement("td");
    stockElt.classList.add("SecondaryText");
    const stockNum = document.createTextNode(stock);
    stockElt.appendChild(stockNum);
    tableRow.appendChild(stockElt);

    return tableRow;
}