"use strict";
let input,
  singleRecipe,
  recipes15div,
  allRecipesArray,
  addCount = 1,
  ingredCopy;
let getStorage;
const key = "171782c3-aa57-48a8-95c3-61fb2f2f8b4e";
const modal = document.querySelector(".new-recipe-list");
const overlay = document.querySelector(".overlay");
const searchBar = document.querySelector("#navbar--search");
const searchBtn = document.querySelector("#navbar--searchBtn");
const namesContainer = document.querySelector("#NAMES");
const addRecipe = document.querySelector("#addRecipeBtn");
const bookMark = document.querySelector("#bookmarkBtn");
const escBtn = document.querySelector("#escapeBtn");
const singleRecipeContainer = document.querySelector("#recipes-content");
const bookMarkMenu = document.querySelector(".bookmark-menu");
let nextBtn;
let ingredientsList;
let i = 0;
let bookMArkArray = [];
getlocalSortage();
const openModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};
addRecipe.addEventListener("click", openModal);
overlay.addEventListener("click", closeModal);
escBtn.addEventListener("click", closeModal);
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

bookMark.addEventListener("mouseover", function (e) {
  e.preventDefault();
  bookMarkMenu.classList.remove("hidden");
  bookMarkMenu.addEventListener("mouseleave", function (e) {
    e.preventDefault();
    bookMarkMenu.classList.add("hidden");
  });
});
bookMark.addEventListener("mouseleave", function (e) {
  e.preventDefault();
  bookMarkMenu.classList.add("hidden");
});
function ingerdAdd(i, singleRecipeinput, count) {
  // let copy = count;
  // if (count == 0) copy = -2;
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
  if (count <= 0) {
    console.log(count);
    // count = 0;
    let html2;
    if (count == 0)
      html2 = `
            <li class="recipes-Ingredients">
             <span>✓</span> ${(quantity / 2).toFixed(2)} ${unit} ${description}
          </li>`;
    if (count == -1)
      html2 = `
            <li class="recipes-Ingredients">
              <span>✓</span> ${(quantity / 3).toFixed(2)} ${unit} ${description}
            </li>`;
    if (count == -2)
      html2 = `
            <li class="recipes-Ingredients">
              <span>✓</span> ${(quantity / 4).toFixed(2)} ${unit} ${description}
            </li>`;
    ingredientsList.insertAdjacentHTML("beforeend", html2);
  } else {
    let html2 = `
            <li class="recipes-Ingredients">
             <span>✓</span> ${quantity * count} ${unit} ${description}
          </li>`;
    ingredientsList.insertAdjacentHTML("beforeend", html2);
  }
}
function getRecipes(n, iter) {
  let singleRecipeinput;
  let test = iter;
  n.forEach((element, i) => {
    element.addEventListener("click", function () {
      // console.log(test);
      singleRecipeContainer.innerHTML = " ";
      let loaderHtml = `<div class="loader-2"></div>`;
      singleRecipeContainer.insertAdjacentHTML("afterbegin", loaderHtml);
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
            <svg id="recipes-content-Options-1">
                <use href="./icons.svg#icon-plus-circle"></use>
            </svg>
             <svg id="recipes-content-Options-2">
                <use href="./icons.svg#icon-minus-circle"></use>
            </svg>
            <svg id="recipes-content-Options-3">
                <use href="./icons.svg#icon-bookmark" id="Bookmark-icon"></use>
            </svg>
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

              if (singleRecipeinput.servings > 1) {
                --addCount;
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
                  if (singleRecipeinput.servings !== 0)
                    ingerdAdd(i, singleRecipeinput, addCount);
                  if (singleRecipeinput.servings == 0) {
                    ingerdAdd(i, singleRecipeinput, -2);
                  }
                }
              }
            });
          document
            .querySelector("#recipes-content-Options-3")
            .addEventListener("click", function (e) {
              let count = 0;
              let z;
              for (z = 0; z < Object.values(localStorage).length; z++) {
                if (singleRecipeinput.id === localStorage.key(z)) {
                  localStorage.removeItem(singleRecipeinput.id);
                  count++;
                  let changeInBookmark =
                    document.querySelector("#Bookmark-icon");
                  changeInBookmark.getAttribute("href");
                  changeInBookmark.setAttribute(
                    "href",
                    "./icons.svg#icon-bookmark"
                  );
                  break;
                }
              }
              e.preventDefault();
              if (count === 0) {
                let changeInBookmark = document.querySelector("#Bookmark-icon");
                changeInBookmark.getAttribute("href");
                changeInBookmark.setAttribute(
                  "href",
                  "./icons.svg#icon-bookmark-fill"
                );
                bookMArkArray.push(singleRecipeinput);
                localStorage.setItem(
                  `${singleRecipeinput.id}`,
                  JSON.stringify(singleRecipeinput)
                );
              } else {
                delete bookMArkArray[z];
                // if (bookMArkArray.join(" ").length === 0) {

                // }
                // document.querySelectorAll("")
              }
              console.log(bookMArkArray);
              bookMarkMenu.innerHTML = " ";
              for (let i = bookMArkArray.length - 1; i >= 0; i--) {
                if (!bookMArkArray[i]) {
                  bookMArkArray.splice(i, 1);
                }
              }
              if (bookMArkArray.length > 0) {
                bookMArkArray.forEach((el, i) => {
                  // console.log(el.title);
                  // getRecipes(bookMArkArray, i);
                  let html = `
                    <div class="bookMark-recipe">
                      <img src="${el.image_url}" class="NAMES-recipe-img" />
                      <div class="NAMES-recipe-text">
                        <h5>${el.title}</h5>
                        <p>${el.publisher}</p>
                      </div>
                    </div>`;
                  bookMarkMenu.insertAdjacentHTML("afterbegin", html);
                  document
                    .querySelector(".bookMark-recipe")
                    .addEventListener("click", function (e) {
                      singleRecipeDisplay(el);
                    });
                });
              } else {
                bookMarkMenu.innerHTML = " ";
                let html = `<p id="emptyMessage">No bookmarks Yet!</p>`;
                bookMarkMenu.insertAdjacentHTML("afterbegin", html);
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
  let loaderHtml = `<div class="loader-1"></div>`;
  namesContainer.insertAdjacentHTML("afterbegin", loaderHtml);
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
      // console.log(first15);
      if (allRecipesArray.length > 15) {
        let html = `
      <button id="NAMES-nextBtn"><p>NEXT-><p></button>
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
function getlocalSortage() {
  // console.log(bookMArkArray);
  Object.keys(localStorage).forEach(function (key) {
    let el = JSON.parse(localStorage.getItem(key));
    bookMArkArray.push(el);
  });
  bookMarkMenu.innerHTML = " ";
  // if (bookMArkArray.length === 0) {
  //   let emptyMessage = `<p id="emptyMessage">No bookmarks Yet!</p>`;
  //   bookMarkMenu.insertAdjacentHTML("afterbegin", emptyMessage);
  // }
  for (let i = bookMArkArray.length - 1; i >= 0; i--) {
    if (!bookMArkArray[i]) {
      bookMArkArray.splice(i, 1);
    }
  }

  if (bookMArkArray.length > 0) {
    bookMArkArray.forEach((el, i) => {
      // console.log(el.title);
      // getRecipes(bookMArkArray, i);
      let html = `
        <div class="bookMark-recipe">
          <img src="${el.image_url}" class="NAMES-recipe-img" />
          <div class="NAMES-recipe-text">
            <h5>${el.title}</h5>
            <p>${el.publisher}</p>
          </div>
        </div>`;
      bookMarkMenu.insertAdjacentHTML("afterbegin", html);
      document
        .querySelector(".bookMark-recipe")
        .addEventListener("click", function (e) {
          singleRecipeDisplay(el);
        });
    });
  } else {
    bookMarkMenu.innerHTML = " ";
    let html = `<p id="emptyMessage">No bookmarks Yet!</p>`;
    bookMarkMenu.insertAdjacentHTML("afterbegin", html);
  }
}
function singleRecipeDisplay(recipe) {
  // let bookmark = false;
  let singleRecipeinput = recipe;
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
          <svg id="recipes-content-Options-1">
                <use href="./icons.svg#icon-plus-circle"></use>
            </svg>
             <svg id="recipes-content-Options-2">
                <use href="./icons.svg#icon-minus-circle"></use>
            </svg>
            <svg id="recipes-content-Options-3">
                <use href="./icons.svg#icon-bookmark-fill" id="Bookmark-icon"></use>
            </svg>
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
      document.querySelector("#recipes-content-TimeNServing").innerHTML = " ";
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

      if (singleRecipeinput.servings > 1) {
        --addCount;
        document.querySelector("#recipes-content-TimeNServing").innerHTML = " ";
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
          if (singleRecipeinput.servings !== 0)
            ingerdAdd(i, singleRecipeinput, addCount);
          if (singleRecipeinput.servings == 0) {
            ingerdAdd(i, singleRecipeinput, -2);
          }
        }
      }
    });
  document
    .querySelector("#recipes-content-Options-3")
    .addEventListener("click", function (e) {
      let count = 0;
      let z;
      for (z = 0; z < Object.values(localStorage).length; z++) {
        if (singleRecipeinput.id === localStorage.key(z)) {
          localStorage.removeItem(singleRecipeinput.id);
          count++;
          let changeInBookmark = document.querySelector("#Bookmark-icon");
          changeInBookmark.getAttribute("href");
          changeInBookmark.setAttribute("href", "./icons.svg#icon-bookmark");
          break;
        }
      }
      e.preventDefault();
      if (count === 0) {
        bookMArkArray.push(singleRecipeinput);
        localStorage.setItem(
          `${singleRecipeinput.id}`,
          JSON.stringify(singleRecipeinput)
        );
        let changeInBookmark = document.querySelector("#Bookmark-icon");
        changeInBookmark.getAttribute("href");
        changeInBookmark.setAttribute("href", "./icons.svg#icon-bookmark-fill");
      } else {
        delete bookMArkArray[z];
        if (bookMArkArray.length === 0) {
          let emptyMessage = `<p id="emptyMessage">No bookmarks Yet!</p>`;
          bookMarkMenu.insertAdjacentHTML("afterbegin", emptyMessage);
        }
      }
      console.log(bookMArkArray);
      bookMarkMenu.innerHTML = " ";
      for (let i = bookMArkArray.length - 1; i >= 0; i--) {
        if (!bookMArkArray[i]) {
          bookMArkArray.splice(i, 1);
        }
      }
      if (bookMArkArray.length > 0) {
        bookMArkArray.forEach((el, i) => {
          // console.log(el.title);
          // getRecipes(bookMArkArray, i);
          let html = `
            <div class="bookMark-recipe">
              <img src="${el.image_url}" class="NAMES-recipe-img" />
              <div class="NAMES-recipe-text">
                <h5>${el.title}</h5>
                <p>${el.publisher}</p>
              </div>
            </div>`;
          bookMarkMenu.insertAdjacentHTML("afterbegin", html);
          document
            .querySelector(".bookMark-recipe")
            .addEventListener("click", function (e) {
              singleRecipeDisplay(el);
            });
        });
      } else {
        bookMarkMenu.innerHTML = " ";
        let html = `<p id="emptyMessage">No bookmarks Yet!</p>`;
        bookMarkMenu.insertAdjacentHTML("afterbegin", html);
      }
    });
}
