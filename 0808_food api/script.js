/*
=============
Selector
=============
*/
let searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');
const mealResult = document.querySelector('.meal-result');

/*
=============
Function Expression
=============
*/
// const getMealListAwait = async() =>{
//     let awaitResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=egg`);
//     let awaitData = await awaitResponse.json();

//     console.log(awaitData);
// }

const getMealList = async() =>{
    let searchInputTxt = document.getElementById('search-input').value.trim();
    
    // fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
    // .then( response => {
    //     return response.json();
    // })
    // .then(data => {
    //     console.log(data);
    // })

    let awaitResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`);
    let awaitData = await awaitResponse.json();

    console.log(awaitData);
    
    let html="";
    if(awaitData.meals){
        mealList.classList.remove('notFound');
        awaitData.meals.forEach(eachMeal => {
            html += `
                <div class = "meal-item" data-id = ${eachMeal.idMeal}>
                    <div class = "meal-img">
                        <img src = "${eachMeal.strMealThumb}" alt = "${eachMeal.strMeal}">
                    </div>
                <div class = "meal-name">
                    <h3>${eachMeal.strMeal}</h3>
                    <a href = "#" class = "recipe-btn">Get Recipe</a>
                </div>
                </div>
            `;
        });    
    }else{
        html = "抱歉，沒有沒有找到符合的菜餚哦!";
        mealList.classList.add('notFound');
    }
    mealList.innerHTML = html;
}

/*
=============
EventListener
=============
*/

// 在搜尋框按Enter觸發 點擊button的效果
searchInput.addEventListener("keyup", function(event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
      event.preventDefault();  // Cancel the default action, if needed
      // Trigger the button element with a click
      searchBtn.click();
    }
});

searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', getMealRecipe);
recipeCloseBtn.addEventListener('click', () => {
    mealDetailsContent.parentElement.classList.remove('showRecipe');
});
/*
=============
Function
=============
*/

function getMealRecipe(e){
    e.preventDefault();
    // console.log(e.target); // 點擊處的html標籤
    if(e.target.classList.contains('recipe-btn')){
        let mealItem = e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
        .then(response => response.json())
        .then(data => mealRecipeModal(data.meals));


        // 若使用async()且將放置於檔案最上方時可使用，這邊先以函式方法撰寫
        // let awaitResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`);
        // let awaitData = await awaitResponse.json();
        // console.log(awaitData);
        // mealRecipeModal(awaitData.meals);
    }
}

function mealRecipeModal(meal){
    //console.log(meal); // Array()
    meal = meal[0]; // API的詳細recipe內容位於array中的[0]
    //console.log(meal.strInstructions);
    let instruction = meal.strInstructions; // 食譜文字太多
    let brInstruction = instruction.replaceAll("STEP", "<br>STEP"); // 找到STEP，做br分隔

    let html=`
            <h2 class = "recipe-title">${meal.strMeal}</h2>
            <p class = "recipe-category">${meal.strCategory}</p>
            <div class = "recipe-instruct">
                <h3>Instructions:</h3>
                <p>${brInstruction}</p>
            </div>
            <div class = "recipe-meal-img">
                <img src = "${meal.strMealThumb}" alt = "${meal.strMeal}">
            </div>
            <div class = "recipe-link">
                <a href = "${meal.strYoutube}" target = "_blank">Watch Video</a>
            </div> 
    `;
    mealDetailsContent.innerHTML = html;
    mealDetailsContent.parentElement.classList.add('showRecipe');
}