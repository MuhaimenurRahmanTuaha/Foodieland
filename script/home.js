// Function to fetch JSON
function fetchRecipeData() {
    fetch('../script/recipe.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .then(data => {
        populateRecipeCards(data);
        populateBottomRecipeCards(data);
      })
      .catch(error => {
        console.error('Error fetching JSON:', error);
      });
  }
  
  // Function to manipulate DOM
  function populateRecipeCards(data) {
    const upperRecipeContainer = document.querySelectorAll(".upper-recipe-card");
  
    if (!upperRecipeContainer) {
      console.error('No recipe card container found');
      return;
    }
  
    for (let i = 0; i < 8; i++) {
        // Adding love react icon
        const reactIcon = document.createElement("div");
        reactIcon.classList.add("recipe-reactIcon");
  
        const reactIconImage = document.createElement("img");
        reactIconImage.src = "../images/icons/Heart.png";
        reactIconImage.id = "toggoleImg";
  
        // Toggle heart image only (no CSS)
        reactIcon.addEventListener("click", () => {
            if (reactIconImage.src.includes("Heart-Red.png")) {
                reactIconImage.src = "../images/icons/Heart.png";
            } else {
                reactIconImage.src = "../images/icons/Heart-Red.png";
            }
        });
  
        reactIcon.appendChild(reactIconImage);
        upperRecipeContainer[i].appendChild(reactIcon);

        // Adding recipe image
        const imageWrapper = document.createElement("div");
        imageWrapper.classList.add("upper-recipe-img");
        const recipeCardImageElement = document.createElement("img");
        recipeCardImageElement.src = data[i].image;
        recipeCardImageElement.alt = data[i].name;
        imageWrapper.appendChild(recipeCardImageElement);
        upperRecipeContainer[i].appendChild(imageWrapper);

        // Adding recipe title
        const titleWrapper = document.createElement("div");
        titleWrapper.classList.add("upper-recipe-title");
        const titleAnchor = document.createElement("a");
        titleAnchor.href = `recipe.html?id=${data[i].id}`;
        const recipeCardCaptionElement = document.createElement("h3");
        recipeCardCaptionElement.innerHTML = data[i].name;
        titleAnchor.appendChild(recipeCardCaptionElement);
        titleWrapper.appendChild(titleAnchor);
        upperRecipeContainer[i].appendChild(titleWrapper);

        // Adding bottom part (time and category)
        const bottomPart = document.createElement("div");
        bottomPart.classList.add("upper-recipe-bottom-part");

        const bottomPartLeft = document.createElement("div");
        bottomPartLeft.classList.add("upper-recipe-bottom-part_left");

        const bottomPartLeftImage = document.createElement("img");
        bottomPartLeftImage.src = "../images/icons/Timer.png";
        bottomPartLeft.appendChild(bottomPartLeftImage);

        const bottomPartLeftTime = document.createElement("span");
        bottomPartLeftTime.innerHTML = data[i]["total-time"];
        bottomPartLeft.appendChild(bottomPartLeftTime);

        bottomPart.appendChild(bottomPartLeft);

        const bottomPartRight = document.createElement("div");
        bottomPartRight.classList.add("upper-recipe-bottom-part_right");

        const bottomPartRightImage = document.createElement("img");
        bottomPartRightImage.src = "../images/icons/ForkKnife.png";
        bottomPartRight.appendChild(bottomPartRightImage);

        const bottomPartRightCategory = document.createElement("span");
        bottomPartRightCategory.innerHTML = data[i]["Category"];
        bottomPartRight.appendChild(bottomPartRightCategory);

        bottomPart.appendChild(bottomPartRight);

        upperRecipeContainer[i].appendChild(bottomPart);
    }
  }

  function populateBottomRecipeCards(data) {
    const lowerRecipeContainer = document.querySelectorAll(".bottom-recipe_lower_card");
  
    if (!lowerRecipeContainer) {
      console.error('No recipe card container found');
      return;
    }
  
    for (let i = 0; i < 8; i++) {
        // Adding love react icon
        const reactIcon = document.createElement("div");
        reactIcon.classList.add("lower-recipe-reactIcon");
  
        const reactIconImage = document.createElement("img");
        reactIconImage.src = "../images/icons/Heart.png";
        reactIconImage.id = "toggoleImg";
  
        // Toggle heart image only (no CSS)
        reactIcon.addEventListener("click", () => {
            if (reactIconImage.src.includes("Heart-Red.png")) {
                reactIconImage.src = "../images/icons/Heart.png";
            } else {
                reactIconImage.src = "../images/icons/Heart-Red.png";
            }
        });
  
        reactIcon.appendChild(reactIconImage);
        lowerRecipeContainer[i].appendChild(reactIcon);

        // Adding recipe image
        const imageWrapper = document.createElement("div");
        imageWrapper.classList.add("lower-recipe-img");
        const recipeCardImageElement = document.createElement("img");
        recipeCardImageElement.src = data[8+i].image;
        recipeCardImageElement.alt = data[8+i].name;
        imageWrapper.appendChild(recipeCardImageElement);
        lowerRecipeContainer[i].appendChild(imageWrapper);

        // Adding recipe title
        const titleWrapper = document.createElement("div");
        titleWrapper.classList.add("lower-recipe-title");
        const titleAnchor = document.createElement("a");
        titleAnchor.href = `recipe.html?id=${data[8+i].id}`;
        const recipeCardCaptionElement = document.createElement("h3");
        recipeCardCaptionElement.innerHTML = data[8+i].name;
        titleAnchor.appendChild(recipeCardCaptionElement);
        titleWrapper.appendChild(titleAnchor);
        lowerRecipeContainer[i].appendChild(titleWrapper);

        // Adding bottom part (time and category)
        const bottomPart = document.createElement("div");
        bottomPart.classList.add("lower-recipe-bottom-part");

        const bottomPartLeft = document.createElement("div");
        bottomPartLeft.classList.add("lower-recipe-bottom-part_left");

        const bottomPartLeftImage = document.createElement("img");
        bottomPartLeftImage.src = "../images/icons/Timer.png";
        bottomPartLeft.appendChild(bottomPartLeftImage);

        const bottomPartLeftTime = document.createElement("span");
        bottomPartLeftTime.innerHTML = data[8+i]["total-time"];
        bottomPartLeft.appendChild(bottomPartLeftTime);

        bottomPart.appendChild(bottomPartLeft);

        const bottomPartRight = document.createElement("div");
        bottomPartRight.classList.add("lower-recipe-bottom-part_right");

        const bottomPartRightImage = document.createElement("img");
        bottomPartRightImage.src = "../images/icons/ForkKnife.png";
        bottomPartRight.appendChild(bottomPartRightImage);

        const bottomPartRightCategory = document.createElement("span");
        bottomPartRightCategory.innerHTML = data[8+i]["Category"];
        bottomPartRight.appendChild(bottomPartRightCategory);

        bottomPart.appendChild(bottomPartRight);

        lowerRecipeContainer[i].appendChild(bottomPart);
    }
  }
  
  // Call the fetch function
  fetchRecipeData();