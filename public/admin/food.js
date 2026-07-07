// ======================================
// LOAD FOODS
// ======================================

let allFoods = [];

async function loadFoods() {

    try {

        const response = await fetch("/api/foods");

        allFoods = await response.json();

        renderFoods(allFoods);

    } catch (error) {

        console.error(error);

        alert("Unable to load foods.");

    }

}

// ======================================
// RENDER TABLE
// ======================================

function renderFoods(foods) {

    const table = document.getElementById("foodTable");

    table.innerHTML = "";

    foods.forEach(food => {

        table.innerHTML += `

        <tr>

            <td>${food.id}</td>

            <td>${food.food_name}</td>

            <td>${food.category}</td>

            <td>Rs. ${food.price}</td>

            <td>

                <img
                src="../images/${food.image}"
                class="food-image">

            </td>

            <td>

                <button
                class="delete-btn"
                onclick="deleteFood(${food.id})">

                Delete

                </button>

            </td>

        </tr>

        `;

    });

}

// ======================================
// ADD FOOD
// ======================================

const foodForm = document.getElementById("foodForm");

foodForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const food = {

        food_name: document.getElementById("food_name").value,

        description: document.getElementById("description").value,

        price: document.getElementById("price").value,

        category: document.getElementById("category").value,

        image: document.getElementById("image").value

    };

    try {

        await fetch("/api/foods", {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(food)

        });

        foodForm.reset();

        loadFoods();

    }

    catch(error){

        console.error(error);

        alert("Unable to add food.");

    }

});

// ======================================
// DELETE FOOD
// ======================================

async function deleteFood(id){

    if(!confirm("Delete this food?")){

        return;

    }

    try{

        await fetch(`/api/foods/${id}`,{

            method:"DELETE"

        });

        loadFoods();

    }

    catch(error){

        console.error(error);

        alert("Unable to delete food.");

    }

}

// ======================================
// SEARCH
// ======================================

const searchBox=document.getElementById("searchFood");

searchBox.addEventListener("keyup",()=>{

    const keyword=searchBox.value.toLowerCase();

    const filtered=allFoods.filter(food=>

        food.food_name.toLowerCase().includes(keyword)||

        food.category.toLowerCase().includes(keyword)

    );

    renderFoods(filtered);

});

// ======================================
// START
// ======================================

loadFoods();
