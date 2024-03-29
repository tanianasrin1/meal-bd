var searchBtn = document.getElementById("button-search");
var searchInput = document.getElementById("search-field");

searchInput.addEventListener("keypress", function(event) {
  // event.preventDefault();
  if (event.key == 'Enter')
  searchBtn.click();
});

const searchFood = () =>{
    const searchField = document.getElementById('search-field')
    const searchText = searchField.value;
    // clear data
    searchField.value = '';
   
    // load data
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`
    console.log(url)
    fetch(url)
    .then(res => res.json())
    .then(data => displaySearchResult(data.meals))
}

const displaySearchResult = meals => {
    const searchResult = document.getElementById('search-result')
    // ager result clear
    // searchResult.innerHTML = '';
    searchResult.textContent = '';
   meals.forEach(meal => {
      //  console.log(meal)
     const div = document.createElement('div') 
     div.classList.add('col')
     div.innerHTML = `
     <div onclick="loadMealDetail(${meal.idMeal})"  class="card h-100">
     <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
     <div class="card-body">
       <h5 class="card-title">${meal.strMeal}</h5>
       <p class="card-text">${meal.strInstructions.slice(0, 200)}</p>
     </div>
   </div>
     `
    

     searchResult.appendChild(div)
    
   })
}

const loadMealDetail = mealId => {
  console.log(mealId);
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
  fetch(url)
  .then(res => res.json())
  .then(data => displayMealDetail(data.meals))
}

const displayMealDetail = meal => {
  // console.log(meal)
  const mealDetail = document.getElementById('meal-detail')
  mealDetail.innerHTML = '';
  const div = document.createElement('div')
  div.classList.add('card')
  div.innerHTML = `
  <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${meal.strMeal}</h5>
    <p class="card-text">${meal.strInstructions.slice(0, 200)}</p>
    <a href="${meal.strYoutube}" class="btn btn-primary">Go somewhere</a>
  </div>
  `
  mealDetail.appendChild(div);

}
