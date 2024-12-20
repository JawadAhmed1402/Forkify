"strict";
let input,
  singleRecipe,
  recipes15div,
  allRecipesArray,
  addCount = 1,
  ingredCopy;
const key = "171782c3-aa57-48a8-95c3-61fb2f2f8b4e";
const searchBar = document.querySelector("#navbar--search");
const searchBtn = document.querySelector("#navbar--searchBtn");
const namesContainer = document.querySelector("#NAMES");
let nextBtn;
const singleRecipeContainer = document.querySelector("#recipes-content");
let ingredientsList;
let i = 0;
function ingerdAdd(i, singleRecipeinput, count) {
  let quantity = singleRecipeinput.ingredients[i].quantity;
  let unit = singleRecipeinput.ingredients[i].unit;
  let description = singleRecipeinput.ingredients[i].description;
  if (quantity == null) {
    quantity = " ";
  }
  if (unit == null) {
    unit = " ";
  }
  if (description == null) {
    description = " ";
  }
  let html2 = `
            <li class="recipes-Ingredients">
             <span>✓</span> ${quantity * count} ${unit} ${description}
          </li>`;
  ingredientsList.insertAdjacentHTML("beforeend", html2);
}
function getRecipes(n, iter) {
  let singleRecipeinput;
  let test = iter;
  n.forEach((element, i) => {
    element.addEventListener("click", function () {
      // console.log(test);
      singleRecipe = fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes/${
          allRecipesArray[i + test].id
        }?key=${key}`
      )
        .then((res) => res.json())
        .then((dataObject) => {
          singleRecipeinput = dataObject.data.recipe;
          singleRecipeContainer.innerHTML = " ";
          let html = `
      <img src="${singleRecipeinput.image_url}" />
      <h1 id="recipes-content-name">${singleRecipeinput.title}</h1>
      <div id="recipes-content-TimeNServing-section">
        <div id="recipes-content-TimeNServing">
         <p><span id="recipes-content-Time">${singleRecipeinput.cooking_time}</span>MINUTES</p>
         <p><span id="recipes-content-Serving">${singleRecipeinput.servings}</span>SERVINGS</p>
        </div>
        <div class="recipes-content-Options">
          <p id="recipes-content-Options-1">(+)</p>
          <p id="recipes-content-Options-2">(-)</p>
        </div>
      </div>
      <div id="recipes-content-Ingredients">
        <h3>RECIPE INGREDIENTS</h3>
        <ul id="recipes-Ingredients-list">
        </ul>
      </div>
      <div id="Directions">
        <h2>HOW TO COOK IT</h2>
        <p>
          This recipe was designed and tested by <span>${singleRecipeinput.publisher}</span>.
          Please<br />
          check out directions at their website.
        </p>
        <button type="submit" id="DirectionsBtn"><a href="${singleRecipeinput.source_url}">DIRECTIONS</a></button>
      </div>
          `;
          singleRecipeContainer.insertAdjacentHTML("beforeend", html);
          ingredientsList = document.querySelector("#recipes-Ingredients-list");
          ingredientsList.innerHTML = " ";
          for (let i = 0; i < singleRecipeinput.ingredients.length; i++) {
            ingerdAdd(i, singleRecipeinput, 1);
          }

          // to increse by 1 serving
          document
            .querySelector("#recipes-content-Options-1")
            .addEventListener("click", function (e) {
              e.preventDefault();
              addCount++;
              document.querySelector(
                "#recipes-content-TimeNServing"
              ).innerHTML = " ";
              let html = `
              <p><span id="recipes-content-Time">${
                singleRecipeinput.cooking_time
              }</span>MINUTES</p>
              <p><span id="recipes-content-Serving">${++singleRecipeinput.servings}</span>SERVINGS</p>`;
              document
                .querySelector("#recipes-content-TimeNServing")
                .insertAdjacentHTML("afterbegin", html);
              ingredientsList.innerHTML = " ";
              for (let i = 0; i < singleRecipeinput.ingredients.length; i++) {
                ingerdAdd(i, singleRecipeinput, addCount);
              }
            });
          // to decrese by 1 serving
          document
            .querySelector("#recipes-content-Options-2")
            .addEventListener("click", function (e) {
              e.preventDefault();

              if (singleRecipeinput.servings > 4) {
                addCount--;
                document.querySelector(
                  "#recipes-content-TimeNServing"
                ).innerHTML = " ";
                let html = `
                <p><span id="recipes-content-Time">${
                  singleRecipeinput.cooking_time
                }</span>MINUTES</p>
                <p><span id="recipes-content-Serving">${--singleRecipeinput.servings}</span>SERVINGS</p>`;
                document
                  .querySelector("#recipes-content-TimeNServing")
                  .insertAdjacentHTML("afterbegin", html);
                ingredientsList.innerHTML = " ";
                for (let i = 0; i < singleRecipeinput.ingredients.length; i++) {
                  ingerdAdd(i, singleRecipeinput, addCount);
                }
              }
            });
        });
    });
    iter++;
  });
}

function displayRecipesName(iteration) {
  for (let i = iteration; i < allRecipesArray.length; i++) {
    if (i >= 15 + iteration) {
      break;
    }
    let html = `
      <div class="NAMES-recipe">
        <img src="${allRecipesArray[i].image_url}" class="NAMES-recipe-img" />
        <div class="NAMES-recipe-text">
          <h5>${allRecipesArray[i].title}</h5>
          <p>${allRecipesArray[i].publisher}</p>
        </div>
      </div>`;
    namesContainer.insertAdjacentHTML("beforeend", html);
  }
}
searchBtn.addEventListener("click", function (e) {
  e.preventDefault();
  input = fetch(
    `https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchBar.value}`
  )
    .then((res) => res.json())
    .then((dataObject) => {
      allRecipesArray = [...dataObject.data.recipes];
      namesContainer.innerHTML = " ";
      displayRecipesName(i);
      let first15 = document.querySelectorAll(".NAMES-recipe");
      getRecipes(first15, 0);
      console.log(first15);
      if (allRecipesArray.length > 15) {
        let html = `
      <button id="NAMES-nextBtn">NEXT-></button>
      `;
        namesContainer.insertAdjacentHTML("beforeend", html);
        nextBtn = document.querySelector("#NAMES-nextBtn");
        let count = 0;

        nextBtn.addEventListener("click", function (e) {
          e.preventDefault();
          count++;
          namesContainer.innerHTML = " ";
          displayRecipesName(15 * count);
          recipes15div = document.querySelectorAll(".NAMES-recipe");
          getRecipes(recipes15div, 15 * count);
          console.log(recipes15div);
          i = i + 15;
        });
      }
    });
});
