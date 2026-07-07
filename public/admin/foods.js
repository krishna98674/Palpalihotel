// ======================================
// FOOD MANAGEMENT
// ======================================

let allFoods = [];
let editingId = null;

// ======================================
// LOAD FOODS
// ======================================

async function loadFoods() {

    try {

        const response = await fetch("/api/foods");

        allFoods = await response.json();

        renderFoods(allFoods);

    } catch (error) {

        console.error(error);

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
                width="70">

            </td>

            <td>

                <button
                onclick="editFood(${food.id})">

                Edit

                </button>

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
// EDIT FOOD
// ======================================

function editFood(id){

    const food = allFoods.find(f=>f.id===id);

    editingId = id;

    document.getElementById("food_name").value = food.food_name;

    document.getElementById("description").value = food.description;

    document.getElementById("price").value = food.price;

    document.getElementById("category").value = food.category;

    document.getElementById("image").value = food.image;

    document.querySelector("#foodForm button").textContent =
    "Update Food";

}

// ======================================
// SAVE
// ======================================

const foodForm = document.getElementById("foodForm");

foodForm.addEventListener("submit", async (e)=>{

    e.preventDefault();

    const food={

        food_name:document.getElementById("food_name").value,

        description:document.getElementById("description").value,

        price:document.getElementById("price").value,

        category:document.getElementById("category").value,

        image:document.getElementById("image").value

    };

    try{

        if(editingId){

            await fetch(`/api/foods/${editingId}`,{

                method:"PUT",

                headers:{

                    "Content-Type":"application/json"

                },

                body:JSON.stringify(food)

            });

            editingId=null;

            document.querySelector("#foodForm button").textContent =
            "Add Food";

        }

        else{

            await fetch("/api/foods",{

                method:"POST",

                headers:{

                    "Content-Type":"application/json"

                },

                body:JSON.stringify(food)

            });

        }

        foodForm.reset();

        loadFoods();

    }

    catch(error){

        console.error(error);

    }

});

// ======================================
// DELETE
// ======================================

async function deleteFood(id){

    if(!confirm("Delete this food?")){

        return;

    }

    await fetch(`/api/foods/${id}`,{

        method:"DELETE"

    });

    loadFoods();

}

// ======================================
// SEARCH
// ======================================

document.getElementById("searchFood")
.addEventListener("keyup",function(){

    const keyword=this.value.toLowerCase();

    renderFoods(

        allFoods.filter(food=>

            food.food_name.toLowerCase().includes(keyword)||

            food.category.toLowerCase().includes(keyword)

        )

    );

});

// ======================================
// START
// ======================================

loadFoods();
