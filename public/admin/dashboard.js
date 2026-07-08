// ======================================
// LOAD DASHBOARD
// ======================================

async function loadDashboard(){

    try{

        const response = await fetch("/api/dashboard");

        const data = await response.json();

        document.getElementById("totalOrders").textContent =
        data.totalOrders;

        document.getElementById("totalFoods").textContent =
        data.totalFoods;

        document.getElementById("totalReservations").textContent =
        data.totalReservations;

        document.getElementById("totalRevenue").textContent =
        "Rs. " + data.totalRevenue;

    }

    catch(error){

        console.error(error);

    }

}

loadDashboard();
