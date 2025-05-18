document.addEventListener("DOMContentLoaded", function () {
    fetch("recipes.json")
        .then(response => response.json())
        .then(data => {
            const recipes = data.meals;
            const recipeList = document.getElementById("recipe-list");

            for (const category in recipes) {
                for (const subcategory in recipes[category]) {
                    for (const recipe in recipes[category][subcategory]) {
                        const recipeData = recipes[category][subcategory][recipe];

                        const recipeCard = document.createElement("div");
                        recipeCard.classList.add("col-md-4", "mb-4");
                        recipeCard.innerHTML = `
                            <div class="card custom-card">
                                <img src="${recipeData.image}" class="card-img-top" alt="${recipe}">
                                <div class="card-body">
                                    <h5 class="card-title">${recipe}</h5>
                                    <p class="card-text"><strong>Time:</strong> ${recipeData.time}</p>
                                    <button class="btn show-recipe-btn" data-bs-toggle="modal" data-bs-target="#recipeModal"
                                        data-name="${recipe}"
                                        data-image="${recipeData.image}"
                                        data-time="${recipeData.time}"
                                        data-ingredients='${JSON.stringify(recipeData.ingredients)}'
                                        data-directions='${JSON.stringify(recipeData.directions)}'>
                                        Details
                                    </button>
                                </div>
                            </div>
                        `;

                        recipeList.appendChild(recipeCard);
                    }
                }
            }

            // Butonlara event listener ekleyelim (index.html için)
            document.querySelectorAll(".show-recipe-btn").forEach(button => {
                button.addEventListener("click", function () {
                    document.getElementById("recipeTitle").innerText = this.dataset.name;
                    document.getElementById("recipeImage").src = this.dataset.image;
                    document.getElementById("recipeTime").innerText = this.dataset.time;

                    const ingredientsList = document.getElementById("recipeIngredients");
                    ingredientsList.innerHTML = "";
                    JSON.parse(this.dataset.ingredients).forEach(ing => {
                        const li = document.createElement("li");
                        li.innerText = ing;
                        ingredientsList.appendChild(li);
                    });

                    const directionsList = document.getElementById("recipeDirections");
                    directionsList.innerHTML = "";
                    JSON.parse(this.dataset.directions).forEach(dir => {
                        const li = document.createElement("li");
                        li.innerText = dir;
                        directionsList.appendChild(li);
                    });
                });
            });

        })
        .catch(error => console.error("Tarifler yüklenirken hata oluştu:", error));
});
