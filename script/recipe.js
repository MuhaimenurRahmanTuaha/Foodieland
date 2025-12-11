// Parse recipe ID from URL
const params = new URLSearchParams(window.location.search);
const recipeId = params.get("id");

// Load JSON data (locally or via fetch if hosted)
fetch("../script/recipe.json") // Adjust path if needed
  .then(res => res.json())
  .then(data => {
    const recipe = data.find(item => item.id.toString() === recipeId);
    if (!recipe) {
      document.getElementById("recipe-detail").innerHTML = "<h2>Recipe not found.</h2>";
      return;
    }

    // Build the detail HTML dynamically
    document.getElementById("recipe-detail").innerHTML = `
        <!--header section starts-->
        <head>
            <section class="header-section">
                <div class="header-section_upper">
                    <div class="header-section_upper_left">
                        <div class="header-section_caption">
                            <h1>${recipe.name}</h1>
                        </div>
                        <div class="header-section_profile">
                            <div class="head-profile_id_info">
                                <div class="head-profile_image">
                                    <img src="../images/John Smith.png" alt="profile picture">
                                </div>
                                <div class="head-profile_info">
                                    <span class="profile-name">John Smith</span>
                                    <span class="profile-date">15 March 2022</span>
                                </div>
                            </div>
                            <hr class="recipe-horizontal"/>
                            <div class="head-profile_prep_time">
                                <div class="head-profile_time_icon">
                                    <img src="../images/icons/Timer.png" alt="timer">
                                </div>
                                <div class="head-profile_prep_time_desc">
                                    <span class="prep_title">PREP TIME</span>
                                    <span class="prep_time">${recipe["prep-time"]}</span>
                                </div>
                            </div>
                            <hr class="recipe-horizontal"/>
                            <div class="head-profile_cook_time">
                                <div class="head-profile_time_icon">
                                    <img src="../images/icons/Timer.png" alt="timer">
                                </div>
                                <div class="head-profile_cook_time_desc">
                                    <span class="cook_title">COOK TIME</span>
                                    <span class="cook_time">${recipe["cook-time"]}</span>
                                </div>
                            </div>
                            <hr class="recipe-horizontal"/>
                            <div class="head-profile_category">
                                <div class="head-profile_utils_icon">
                                    <img src="../images/icons/ForkKnife.png" alt="Fork Knife icon">
                                </div>
                                <div class="head-profile_category_name">
                                    <span class="category_title">${recipe.Category}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="header-section_right">
                        <div class="header-section_right_card">
                            <div class="card_icon">
                                <img src="../images/icons/printer.png" alt="print">
                            </div>
                            <div class="icon_name">PRINT</div>
                        </div>
                        <div class="header-section_right_card">
                            <div class="card_icon">
                                <img src="../images/icons/share.png" alt="print">
                            </div>
                            <div class="icon_name">SHARE</div>
                        </div>
                    </div>
                </div>
                <div class="header-middle-section">
                    <div class="header-middle-section_img">
                        <img src="${recipe.image}" alt="${recipe.name}" />
                        <div class="play_button">
                            <img src="../images/icons/play-circle-blue.png" alt"play button"/>
                        </div>
                    </div>
                    <div class="header-middle-section_nutrition">
                        <div class="nutrition-caption">
                            <h4>Nutrition Information</h4>
                        </div>
                        <div class="nutrition-info">
                           <div class="info-card">
                                <div class="nutrition-name">Calories</div>
                                <div class="nutrition-value">${recipe.nutrition.calories}</div>
                            </div>
                            <div class="info-card">
                                <div class="nutrition-name">Total Fat</div>
                                <div class="nutrition-value">${recipe.nutrition["total-fat"]}</div>
                            </div>
                            <div class="info-card">
                                <div class="nutrition-name">Protein</div>
                                <div class="nutrition-value">${recipe.nutrition.protein}</div>
                            </div>
                            <div class="info-card">
                                <div class="nutrition-name">Carbohydrate</div>
                                <div class="nutrition-value">${recipe.nutrition.carbohydrate}</div>
                            </div>
                            <div class="info-card">
                                <div class="nutrition-name">Cholesterol</div>
                                <div class="nutrition-value">${recipe.nutrition.cholesterol}</div>
                            </div> 
                        </div>
                        <div class="nutrition-comment">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas inventore eum.
                        </div>
                    </div>
                </div>
                <div class="header-bottom">
                    ${recipe.description}
                </div>
            </section>
        </head>
      
        <main>
            <section class="ingredient-section">
                <div class="ingredient-side">
                    <h3>Ingredients</h3>
                    <div class="main-dish">
                        <h4>For main dish</h4>
                        <ul>
                        ${recipe.ingredients["for main dish"].map(ing => `<li>
                            <div class="checkbox">
                                <img class="checkbox-img" src="../images/icons/checked-not.png" alt="checkbox"/>
                            </div>
                            <span>${ing}</span>
                        </li>`).join("")}
                        </ul>
                    </div>
                    <div class="sauce">
                        <h4>For the sauce</h4>
                        <ul>
                        ${recipe.ingredients["for the sauce"].map(ing => `<li>
                            <div class="checkbox">
                                <img class="checkbox-img" src="../images/icons/checked-not.png" alt="checkbox"/>
                            </div>
                            <span>${ing}</span>
                        </li>`).join("")}
                        </ul>  
                    </div>
                </div>
                <div class="other-recipe-side">
                    <div class="other-recipe">
                        <h3>Other Recipe</h3>
                        <div class="recipe-items-container">
                            <!--it's adding dynamically, the code is start just after the end of innerHTML-->
                        </div>
                    </div>
                    <div class="advertise">
                        <img src="../images/Ads.png" alt="checkbox"/>
                    </div>
                </div>
            </section>

            <section class="direction-section">
                <h3>Directions</h3>
                <ol class="direction-container"></ol>
            </section>
        </main>
    `;
    

    // adding other recipe option 
    // Render 3 random recipes into .recipe-items-container (excluding the current one)
    const otherRecipes = data.filter(r => r.id !== recipeId);

    // Shuffle and select 3
    const randomRecipes = otherRecipes.sort(() => 0.5 - Math.random()).slice(0, 3);

    // Get container
    const container = document.querySelector(".recipe-items-container");

    // Create and insert cards
    randomRecipes.forEach(r => {
    const card = document.createElement("div");
    card.classList.add("recipe-card");
    card.innerHTML = `
        <a href="?id=${r.id}" class="card-link">
            <div class="card-img">
                <img src="${r.image}" alt="${r.name}"/>
            </div>
            <div class="card-content">
                <div class="card-title">
                    <span>${r.name}</span>
                </div>
                <p class="recipe-chef">By ${r.chef}</p>
            </div>
        </a>
    `;
    container.appendChild(card);
    });

    // adding direction part 
    const directionEntries = Object.entries(recipe.direction).filter(([key]) => key !== "image");
    const directionContainer = document.querySelector(".direction-container");
    directionEntries.forEach(([step, instruction], index) => {
    const li = document.createElement("li");

    // Special logic for the first step only
    if (index === 0) {
        const midpoint = Math.floor(instruction.length / 2);

        const firstPart = instruction.slice(0, midpoint).trim();
        const secondPart = instruction.slice(midpoint).trim();
        const imageSrc = recipe.direction.image;

        li.innerHTML = `
            <div class="checkbox">
                <img class="checkbox-img" src="../images/icons/checked-not.png" alt="checkbox"/>
            </div>
            <div class="direction-content">
                <h4>${step}</h4>
                <span>${firstPart}</span>
                <img src="${imageSrc}" alt="Step Image" />
                <span>${secondPart}</span>
            </div>            
        `;
    } else {
        li.innerHTML = `
            <div class="checkbox">
                <img class="checkbox-img" src="../images/icons/checked-not.png" alt="checkbox"/>
            </div>
            <div class="direction-content">
                <h4>${step}<h4>
                <span>${instruction}</span>
            </div>
        `;
    }

    directionContainer.appendChild(li);
    });


    // adding event listener
    // Add event listener to toggle checkbox images
    document.querySelectorAll(".checkbox-img").forEach(img => {
        img.addEventListener("click", () => {
          const src = img.src;
          const isChecked = src.endsWith("checked.png");
      
          img.src = isChecked
            ? "../images/icons/checked-not.png"
            : "../images/icons/checked.png";
      
          img.closest("li").classList.toggle("checked", !isChecked);
        });
      });            
  })
  .catch(error => {
    console.error("Error loading recipe:", error);
  });
