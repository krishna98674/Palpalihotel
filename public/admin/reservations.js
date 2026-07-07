// ======================================
// LOAD RESERVATIONS
// ======================================

let allReservations = [];

async function loadReservations() {

    try {

        const response = await fetch("/api/reservations");

        allReservations = await response.json();

        renderReservations(allReservations);

    } catch (error) {

        console.error(error);

        alert("Unable to load reservations.");

    }

}

// ======================================
// RENDER TABLE
// ======================================

function renderReservations(reservations) {

    const table = document.getElementById("reservationTable");

    table.innerHTML = "";

    reservations.forEach(reservation => {

        table.innerHTML += `

        <tr>

            <td>${reservation.id}</td>

            <td>${reservation.customer_name}</td>

            <td>${reservation.email}</td>

            <td>${reservation.phone}</td>

            <td>${reservation.reservation_date}</td>

            <td>${reservation.reservation_time}</td>

            <td>${reservation.guests}</td>

            <td>

                <button
                    class="delete-btn"
                    onclick="deleteReservation(${reservation.id})">

                    Delete

                </button>

            </td>

        </tr>

        `;

    });

}

// ======================================
// DELETE
// ======================================

async function deleteReservation(id) {

    const confirmDelete = confirm("Delete this reservation?");

    if (!confirmDelete) {

        return;

    }

    try {

        await fetch(`/api/reservations/${id}`, {

            method: "DELETE"

        });

        loadReservations();

    } catch (error) {

        console.error(error);

        alert("Delete failed.");

    }

}

// ======================================
// SEARCH
// ======================================

const searchBox = document.getElementById("searchReservation");

searchBox.addEventListener("keyup", () => {

    const keyword = searchBox.value.toLowerCase();

    const filtered = allReservations.filter(reservation =>

        reservation.customer_name.toLowerCase().includes(keyword) ||

        reservation.email.toLowerCase().includes(keyword) ||

        reservation.phone.toLowerCase().includes(keyword)

    );

    renderReservations(filtered);

});

// ======================================
// START
// ======================================

loadReservations();
