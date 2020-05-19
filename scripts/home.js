export let defaultQuizURL = `https://opentdb.com/api.php?amount=10`;
const categoryURL = 'https://opentdb.com/api_category.php';
const categoryElement = document.getElementById('categories');
const difficultyElement = document.getElementById('difficulty');


fetch(categoryURL)

  .then((response) => response.json())
  .then((data) => {

    const dataCategory = data.trivia_categories;

    dataCategory.forEach((category, index) => {
      const categoryElements = document.createElement('option');
      categoryElements.id = 'choice';
      categoryElements.value = `${index}`;
      categoryElements.innerHTML = `
            <p>${category.name}</p>
            `;
      categoryElement.append(categoryElements);
    })


    return data;
  })
  .catch((error) => {
    console.log(error);
  });

categoryElement.addEventListener('click', function () {
  let choiceCategory = `&category=${this.value}`
  console.log(choiceCategory)

}, false);

difficultyElement.addEventListener('click', function () {
  let choiceDifficulty = `&difficulty=${this.value}`
  console.log(choiceDifficulty)
}, false);



// let choiceDifficulty = difficultyElement.options[difficultyElement.selectedIndex].value;
// console.log(choiceDifficulty)
// let choiceCategory = categoryElement.options[categoryElement.selectedIndex].value;
// console.log(choiceCategory)