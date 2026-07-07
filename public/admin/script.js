// ==========================================
// LOAD DASHBOARD
// ==========================================

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

    }catch(error){

        console.error(error);

    }

}

// ==========================================
// LOAD ORDERS
// ==========================================

async function loadOrders(){

    try{

        const response = await fetch("/api/orders");

        const orders = await response.json();

        const table = document.getElementById("ordersTable");

        if(!table){

            return;

        }

        table.innerHTML = "";

        orders.forEach(order=>{

            table.innerHTML += `

            <tr>

                <td>${order.id}</td>

                <td>${order.customer_name}</td>

                <td>Rs. ${order.total_amount}</td>

                <td>

                    <span class="status pending">

                        ${order.order_status}

                    </span>

                </td>

                <td>

                    ${new Date(order.created_at).toLocaleString()}

                </td>

            </tr>

            `;

        });

    }catch(error){

        console.error(error);

    }

}

// ==========================================
// LOAD RESERVATIONS
// ==========================================

async function loadReservations(){

    try{

        const response = await fetch("/api/reservations");

        const reservations = await response.json();

        const table = document.getElementById("reservationTable");

        if(!table){

            return;

        }

        table.innerHTML = "";

        reservations.forEach(reservation=>{

            table.innerHTML += `

            <tr>

                <td>${reservation.id}</td>

                <td>${reservation.customer_name}</td>

                <td>${reservation.email}</td>

                <td>${reservation.phone}</td>

                <td>${reservation.reservation_date}</td>

                <td>${reservation.reservation_time}</td>

                <td>${reservation.guests}</td>

            </tr>

            `;

        });

    }catch(error){

        console.error(error);

    }

}

// ==========================================
// START
// ==========================================

loadDashboard();

loadOrders();

loadReservations();
