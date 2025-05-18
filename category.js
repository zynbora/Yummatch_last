document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const categoryName = decodeURIComponent(urlParams.get("category"));

    if (!categoryName) {
        document.getElementById("category-title").innerText = "Kategori bulunamadı!";
        return;
    }

    //document.getElementById("category-title").innerText = categoryName + " Tarifleri";

    fetch("recipes.json")
        .then(response => response.json())
        .then(data => {
            const recipes = data.meals[categoryName];
            const recipeList = document.getElementById("recipe-list");

            if (!recipes) {
                recipeList.innerHTML = "<p class='text-center'>Bu kategoriye ait tarif bulunamadı.</p>";
                return;
            }

            for (const subcategory in recipes) {
                for (const recipe in recipes[subcategory]) {
                    const recipeData = recipes[subcategory][recipe];

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

            // Butonlara event listener ekle
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
