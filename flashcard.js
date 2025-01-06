//sets an array for the content items and sets it to localstorage to hold the items
var contentArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];

//Save card button function
document.getElementById("save_card").addEventListener("click", () => {
  addFlashcard();
});
//Delete card button function
document.getElementById("delete_cards").addEventListener("click", () => {
  localStorage.clear();
  flashcards.innerHTML = '';
  contentArray = [];
});


//shows created cards
document.getElementById("show_card_box").addEventListener("click", () => {
  document.getElementById("create_card").style.display = "block";
});

//closes created cards
document.getElementById("close_card_box").addEventListener("click", () => {
  document.getElementById("create_card").style.display = "none";
});

//Makes the flash card in the input of text 
flashcardMaker = (text, delThisIndex) => {
  const flashcard = document.createElement("div");
  const question = document.createElement('h2');
  const answer = document.createElement('h2');
  const del = document.createElement('i');

  flashcard.className = 'flashcard';
//sets line on flashcard to pink
  question.setAttribute("style", "border-top:1px solid pink; padding: 20px; margin-top:30px");
  question.textContent = text.my_question;
//sets answer to pink on each flashcard
  answer.setAttribute("style", "text-align:center; display:none; color:black");
  answer.textContent = text.my_answer;
 
  del.className = "fas fa-minus";
  del.addEventListener("click", () => {
    contentArray.splice(delThisIndex, 1);
    localStorage.setItem('items', JSON.stringify(contentArray));
    //reloads the page to render the added flashcard
    window.location.reload();
  })

  flashcard.appendChild(question);
  flashcard.appendChild(answer);
  flashcard.appendChild(del);

  flashcard.addEventListener("click", () => {
    if(answer.style.display == "none")
      answer.style.display = "block";
    else
      answer.style.display = "none";
  })

  document.querySelector("#flashcards").appendChild(flashcard);
}

contentArray.forEach(flashcardMaker);


addFlashcard = () => {
  const question = document.querySelector("#question");
  const answer = document.querySelector("#answer");

  //sotres user input for questions and anwser
  let flashcard_info = {
    'my_question' : question.value,
    'my_answer'  : answer.value
  }
  
  //puts flashcard info into array
  contentArray.push(flashcard_info);
  //sets class item and and the converted json content array into local storage
  localStorage.setItem('items', JSON.stringify(contentArray));
  //flashcard function with the content array to make the card
  flashcardMaker(contentArray[contentArray.length - 1], contentArray.length - 1);
  question.value = "";
  answer.value = "";
}