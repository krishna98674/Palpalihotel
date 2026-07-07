// ======================================
// LOAD ORDERS
// ======================================

let allOrders = [];

async function loadOrders() {

    const response = await fetch("/api/orders");

    allOrders = await response.json();

    renderOrders(allOrders);

}

// ======================================
// RENDER TABLE
// ======================================

function renderOrders(orders) {

    const table = document.getElementById("ordersTable");

    table.innerHTML = "";

    orders.forEach(order => {

        table.innerHTML += `

        <tr>

            <td>${order.id}</td>

            <td>${order.customer_name}</td>

            <td>Rs. ${order.total_amount}</td>

            <td>

                <select onchange="updateStatus(${order.id},this.value)">

                    <option value="Pending" ${order.order_status=="Pending"?"selected":""}>

                        Pending

                    </option>

                    <option value="Preparing" ${order.order_status=="Preparing"?"selected":""}>

                        Preparing

                    </option>

                    <option value="Completed" ${order.order_status=="Completed"?"selected":""}>

                        Completed

                    </option>

                    <option value="Cancelled" ${order.order_status=="Cancelled"?"selected":""}>

                        Cancelled

                    </option>

                </select>

            </td>

            <td>

                ${new Date(order.created_at).toLocaleString()}

            </td>

            <td>

                <button onclick="viewOrder(${order.id})">

                    View

                </button>

                <button class="delete-btn"

                    onclick="deleteOrder(${order.id})">

                    Delete

                </button>

            </td>

        </tr>

        `;

    });

}

// ======================================
// VIEW ORDER
// ======================================

async function viewOrder(id){

    const response = await fetch(`/api/orders/${id}/items`);

    const items = await response.json();

    let text = "Order Items\n\n";

    items.forEach(item=>{

        text += `${item.food_name}

Quantity : ${item.quantity}

Price : Rs. ${item.price}

-------------------------\n`;

    });

    alert(text);

}

// ======================================
// UPDATE STATUS
// ======================================

async function updateStatus(id,status){

    await fetch(`/api/orders/${id}`,{

        method:"PUT",

        headers:{

            "Content-Type":"application/json"

        },

        body:JSON.stringify({

            status

        })

    });

    loadOrders();

}

// ======================================
// DELETE ORDER
// ======================================

async function deleteOrder(id){

    if(!confirm("Delete Order?")){

        return;

    }

    await fetch(`/api/orders/${id}`,{

        method:"DELETE"

    });

    loadOrders();

}

// ======================================
// SEARCH
// ======================================

document.getElementById("searchOrder")

.addEventListener("keyup",function(){

    const keyword=this.value.toLowerCase();

    renderOrders(

        allOrders.filter(order=>

            order.customer_name.toLowerCase().includes(keyword)||

            String(order.id).includes(keyword)

        )

    );

});

// ======================================
// START
// ======================================

loadOrders();
