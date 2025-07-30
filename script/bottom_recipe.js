// Adding caption portion
const caption = document.querySelector(".bottom-delicious-caption");

const captionHeading = document.createElement("h2");
captionHeading.innerText = "Check out the delicious recipe";
caption.appendChild(captionHeading);

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
    })
    .catch(error => {
      console.error('Error fetching JSON:', error);
    });
}

// Function to manipulate DOM
function populateRecipeCards(data) {
  const recipeBox = document.querySelector(".bottom-delicious-recipes_card");

  if (!recipeBox) {
    console.error('No recipe card container found');
    return;
  }

  for (let i = 0; i < recipeBox.children.length; i++) {
    const cardBox = recipeBox.children[i];

    // Adding love react icon
    const reactIcon = document.createElement("div");
    reactIcon.classList.add("recipe-reactIcon");

    const reactIconImage = document.createElement("img");
    reactIconImage.src = "../images/icons/Heart.png";
    reactIconImage.id = "toggoleImg";

    // Toggle heart image only (no CSS)
    reactIconImage.addEventListener("click", () => {
      if (reactIconImage.src.includes("Heart-Red.png")) {
        reactIconImage.src = "../images/icons/Heart.png";
      } else {
        reactIconImage.src = "../images/icons/Heart-Red.png";
      }
    });

    reactIcon.appendChild(reactIconImage);
    cardBox.appendChild(reactIcon);

    // Adding recipe image
    const imageWrapper = document.createElement("div");
    imageWrapper.classList.add("bottom-recipe-img");

    const recipeCardImageElement = document.createElement("img");
    recipeCardImageElement.src = data[8 + i].image;
    recipeCardImageElement.alt = data[8 + i].name;

    imageWrapper.appendChild(recipeCardImageElement);
    cardBox.appendChild(imageWrapper);

    // Adding recipe title
    const recipeCardCaptionElement = document.createElement("h3");
    recipeCardCaptionElement.classList.add("recipe-title");
    recipeCardCaptionElement.innerHTML = data[8 + i].name;
    cardBox.appendChild(recipeCardCaptionElement);

    // Adding bottom part (time and category)
    const bottomPart = document.createElement("div");
    bottomPart.classList.add("bottom-part");

    const bottomPartLeft = document.createElement("div");
    bottomPartLeft.classList.add("bottom-part_left");

    const bottomPartLeftImage = document.createElement("img");
    bottomPartLeftImage.src = "../images/icons/Timer.png";
    bottomPartLeft.appendChild(bottomPartLeftImage);

    const bottomPartLeftTime = document.createElement("span");
    bottomPartLeftTime.innerHTML = data[8 + i]["total-time"];
    bottomPartLeft.appendChild(bottomPartLeftTime);

    bottomPart.appendChild(bottomPartLeft);

    const bottomPartRight = document.createElement("div");
    bottomPartRight.classList.add("bottom-part_right");

    const bottomPartRightImage = document.createElement("img");
    bottomPartRightImage.src = "../images/icons/ForkKnife.png";
    bottomPartRight.appendChild(bottomPartRightImage);

    const bottomPartRightCategory = document.createElement("span");
    bottomPartRightCategory.innerHTML = data[8 + i]["Category"];
    bottomPartRight.appendChild(bottomPartRightCategory);

    bottomPart.appendChild(bottomPartRight);

    cardBox.appendChild(bottomPart);
  }
}

// Call the fetch function
fetchRecipeData();
