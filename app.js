/* =====================================
   GLOBALS
===================================== */

let inventoryData = [];
let filteredData = [];

/* =====================================
   PAGE LOAD
===================================== */

document.addEventListener("DOMContentLoaded", () => {

    initTabs();

    loadInventory();

    initSearch();

    initButtons();

});

/* =====================================
   TABS
===================================== */

function initTabs(){

    const buttons =
    document.querySelectorAll(".tab-btn");

    const tabs =
    document.querySelectorAll(".tab-content");

    buttons.forEach(btn=>{

        btn.addEventListener("click",()=>{

            buttons.forEach(b=>{
                b.classList.remove("active");
            });

            tabs.forEach(tab=>{
                tab.classList.remove("active");
            });

            btn.classList.add("active");

            const tabId =
            btn.dataset.tab;

            document
            .getElementById(tabId)
            .classList.add("active");

        });

    });

}

/* =====================================
   LOAD INVENTORY
===================================== */

async function loadInventory(){

    try{

        const response =
        await fetch(
            `${API_URL}?action=inventory`
        );

        inventoryData =
        await response.json();

        filteredData =
        [...inventoryData];

        renderInventory();

        updateDashboard();

    }

    catch(error){

        console.error(error);

        alert(
            "Inventory loading failed"
        );

    }

}

/* =====================================
   INVENTORY TABLE
===================================== */

function renderInventory(){

    const tbody =
    document.getElementById(
        "inventoryTable"
    );

    tbody.innerHTML = "";

    filteredData.forEach(item=>{

        let stockClass =
        "stock-good";

        if(item.stock <= 0){

            stockClass =
            "stock-out";

        }
        else if(item.stock <= 5){

            stockClass =
            "stock-low";

        }

        tbody.innerHTML += `
        <tr>

        <td>${item.sku}</td>

        <td>${item.name}</td>

        <td>${item.opening}</td>

        <td>${item.sales}</td>

        <td>${item.returns}</td>

        <td>${item.production}</td>

        <td class="${stockClass}">
            ${item.stock}
        </td>

        </tr>
        `;

    });

}

/* =====================================
   DASHBOARD
===================================== */

function updateDashboard(){

    let totalSku =
    inventoryData.length;

    let totalStock = 0;

    let lowStock = 0;

    let outStock = 0;

    inventoryData.forEach(item=>{

        totalStock +=
        Number(item.stock);

        if(item.stock <= 0){

            outStock++;

        }
        else if(item.stock <= 5){

            lowStock++;

        }

    });

    document.getElementById(
        "totalSku"
    ).textContent = totalSku;

    document.getElementById(
        "totalStock"
    ).textContent = totalStock;

    document.getElementById(
        "lowStock"
    ).textContent = lowStock;

    document.getElementById(
        "outStock"
    ).textContent = outStock;

}

/* =====================================
   SEARCH
===================================== */

function initSearch(){

    const input =
    document.getElementById(
        "skuSearch"
    );

    input.addEventListener(
        "input",
        searchInventory
    );

}

function normalizeText(text){

    return String(text)
    .toLowerCase()
    .replace(/-/g,"")
    .replace(/\s/g,"");

}

function searchInventory(){

    const keyword =
    normalizeText(
        document.getElementById(
            "skuSearch"
        ).value
    );

    if(!keyword){

        filteredData =
        [...inventoryData];

        renderInventory();

        return;
    }

    filteredData =
    inventoryData.filter(item=>{

        const sku =
        normalizeText(item.sku);

        const name =
        normalizeText(item.name);

        return (
            sku.includes(keyword)
            ||
            name.includes(keyword)
        );

    });

    renderInventory();

}

/* =====================================
   BUTTONS
===================================== */

function initButtons(){

    document
    .getElementById("saleBtn")
    .addEventListener(
        "click",
        saveSale
    );

    document
    .getElementById("returnBtn")
    .addEventListener(
        "click",
        saveReturn
    );

    document
    .getElementById("productionBtn")
    .addEventListener(
        "click",
        saveProduction
    );

    document
    .getElementById("awbBtn")
    .addEventListener(
        "click",
        searchAwb
    );

}

/* =====================================
   SAVE SALE
===================================== */

async function saveSale(){

    const payload = {

        action:"sale",

        awb:
        document
        .getElementById("saleAwb")
        .value
        .trim(),

        orderId:
        document
        .getElementById("saleOrder")
        .value
        .trim(),

        sku:
        document
        .getElementById("saleSku")
        .value
        .trim(),

        qty:
        document
        .getElementById("saleQty")
        .value

    };

    await saveData(payload);

    alert(
        "Sale Saved"
    );

    loadInventory();

}

/* =====================================
   SAVE RETURN
===================================== */

async function saveReturn(){

    const payload = {

        action:"return",

        type:
        document
        .getElementById("returnType")
        .value,

        awb:
        document
        .getElementById("returnAwb")
        .value
        .trim(),

        sku:
        document
        .getElementById("returnSku")
        .value
        .trim(),

        qty:
        document
        .getElementById("returnQty")
        .value

    };

    await saveData(payload);

    alert(
        "Return Saved"
    );

    loadInventory();

}

/* =====================================
   SAVE PRODUCTION
===================================== */

async function saveProduction(){

    const payload = {

        action:"production",

        sku:
        document
        .getElementById("prodSku")
        .value
        .trim(),

        qty:
        document
        .getElementById("prodQty")
        .value

    };

    await saveData(payload);

    alert(
        "Production Added"
    );

    loadInventory();

}

/* =====================================
   COMMON SAVE
===================================== */

async function saveData(payload){

    try{

        await fetch(API_URL,{

            method:"POST",

            body:
            JSON.stringify(payload)

        });

    }
    catch(error){

        console.error(error);

        alert(
            "Save Failed"
        );

    }

}

/* =====================================
   AWB SEARCH
===================================== */

async function searchAwb(){

    const awb =
    document
    .getElementById("awbInput")
    .value
    .trim();

    if(!awb){

        return;

    }

    try{

        const response =
        await fetch(
            `${API_URL}?action=awb&awb=${awb}`
        );

        const data =
        await response.json();

        const result =
        document.getElementById(
            "awbResult"
        );

        if(data.found){

            result.innerHTML = `
            <strong>AWB:</strong>
            ${data.awb}
            <br>

            <strong>Order:</strong>
            ${data.orderId}
            <br>

            <strong>Status:</strong>
            ${data.status}
            `;

        }
        else{

            result.innerHTML =
            "AWB Not Found";

        }

    }
    catch(error){

        console.error(error);

    }

}

/* =====================================
   AUTO REFRESH
===================================== */

setInterval(()=>{

    loadInventory();

},60000);
