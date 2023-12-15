//Create array of objects. Each object contains information of each sentence
const sentencesArray = [
    {
      // Order of words to validate the answer  
        orderOfWords: 12345,
        hint: "The kids play...",
        // Words that conform the sentence. It will be used to validate the answer
        words: [
            { id: 3, text: "en" },
            { id: 2, text: "juegan" },
            { id: 4, text: "el" },
            { id: 5, text: "parque" },
            { id: 1, text: "los niños" },
        ],
    },
    {
        orderOfWords: 123,
        hint: "She brushes...",
        words: [
            { id: 2, text: "se cepilla" },
            { id: 1, text: "ella" },
            { id: 3, text: "los dientes" },
        ],
    },
    {
        orderOfWords: 123,
        hint: "The man runs",
        words: [
            { id: 3, text: "corre" },
            { id: 1, text: "el" },
            { id: 2, text: "hombre" },
        ],
    },
    {
        orderOfWords: 123,
        hint: "The kid plays",
        words: [
            { id: 3, text: "juega" },
            { id: 2, text: "niño" },
            { id: 1, text: "el" },
        ],
    },
    {
        orderOfWords: 12345,
        hint: "The woman reads...",
        words: [
            { id: 1, text: "la"},
            { id: 3, text: "lee" },
            { id: 5, text: "libro" },
            { id: 2, text: "mujer" },
            { id: 4, text: "un" },

        ],
    },
];

// Create variables to manipulate the DOM
const $ = document.querySelector.bind(document);
const startButton = document.getElementById("start-button"); 
const instructions = $("#instructions");
const gameContainer = $(".game-container");
const questionContainer = $("#question-container");
const nextButton = $("#next-button");
const blanksContainer = $(".blanks-container");
const blanks = $('.blanks');

const wordsContainer = $('#words-container');
const feedback = $("#answerFeedback");
const submit = $("#submit");
const gameOverMessage = $(".game-over-message");
let dragged = null;
let numberOfBlanks = null;
let sentenceNumber = 0;
let sentenceObject = getSentenceObject(sentenceNumber);

//Add event listener to the start button to start the game
submit.classList.add("hide");
wordsContainer.classList.add("hide");    

//run the main function
startButton.addEventListener("click", startGame);
      

//Declare the main function of the app
function startGame(evt){
startButton.classList.add("hide");
evt.preventDefault();   
// Call helper functions
// Reset app (hide feedback and next button show submit button. If user run out of questions display finish button instead of submit)
resetApp()
// Call function to display shuffled words
// const sentenceObject = getSentenceObject(sentenceNumber);
// displayShuffledWords(sentenceObject);

// add event listener for drag and drop to the words
dragWord()
    //transfer data to target

//make blanks a droppable zone
    //when a word is dropped, transfer data to the blank
droppableBlanks()

submitAnswer()
    
// add event listener for submit/finish button
// Hide submit button

// Call function to validate answer
    // Concatenate id of the words in the user's answer. ParseInt and compare to OrderOfwords of the current object
    
    // Provide feedback

// Show next button
// add event listener for the next button
nextSentence()
}

//Declare helper functions
function resetApp(){
    // Reset state
    wordsContainer.innerHTML = '';
    wordsContainer.classList.remove('hide');
    console.log("resetApp wordsCont; ", wordsContainer);
    if (blanksContainer.firstChild) {
        // Remove all child nodes from the blanks container
        while (blanksContainer.firstChild) {
            blanksContainer.firstChild.remove();
        }
    }
    answerFeedback.innerHTML = '';
    nextButton.classList.add("hide");
    
    answerFeedback.classList.remove("feedback-wrong");
    answerFeedback.classList.remove("feedback-correct");
    dragged = null;
    displayShuffledWords(sentenceObject);
}
//Get the object that contains the information of the sentence located at the index provided of the array.
function getSentenceObject(index){
    return sentencesArray[index];
}

//Declare a function to display shuffled words
function displayShuffledWords(sentenceObj){
    // if the sentence counter's value is smaller than the number of objects(sentences) in the array of sentences, display the next sentence
    if(sentenceNumber < sentencesArray.length){
        //Iterate through words in the array words within the sentence object
        sentenceObj.words.forEach((word) => {
            //create a new span in the words container and set the id and text content
            const spanWord = document.createElement('span');
            spanWord.className = "word";
            spanWord.id = word.id;
            spanWord.textContent = word.text;
            // make it draggable
            spanWord.draggable = true;
            // add event listener to the word
            spanWord.addEventListener('dragstart', (event) => {
                if(dragged === null){
                    // console.log(dragged);
                    //update the dragged variable in order to use it in other functions
                    dragged = event.target;
                }
            });
            // Add the word to the word container
            wordsContainer.appendChild(spanWord);

            // Display blanks
            const spanBlank = document.createElement("span");
            spanBlank.className = "blanks";
            blanksContainer.appendChild(spanBlank);
             
        });
        // show the submit button
        submit.classList.remove("hide");
        // sentenceNumber++;
        droppableBlanks();

    }

    else {
        // Handle end of questions
        wordsContainer.classList.add("hide");
        submit.classList.add("hide");
        instructions.classList.add("hide");
        blanks.classList.add("hide");
        gameOverMessage.classList.remove("hide");
        document.querySelector(".game-score").textContent = "Your Score: " +  (currentTotalPoints * 100 / questionsSelected.length) + "%";
        console.log("END OF GAME!");                            
    }

}
// Declare function to nake words draggable
function dragWord() {
    // Convert wordsContainer's children(Span) into an array of html elements using the spread operator [...parent.children] so I can iterate through them
   
    const wordsArray = [...wordsContainer.children];

    wordsArray.forEach((word) => {
        word.addEventListener("dragstart", (event) => {
           dragged = event.target;
           dragged.draggable = true;
        //    transfer and set data from the original element to the event
           event.dataTransfer.setData("id", dragged.id); 
        })
    });
   
}


function droppableBlanks() {
    const blanksArray = [...blanksContainer.children];

    blanksArray.forEach((blank) => {
        blank.addEventListener('dragover', event => {
            event.preventDefault();
            if (event.target.className === 'blanks' && !blank.firstChild) {
                blank.classList.add('droppable'); // Optionally, add a visual cue for a droppable area
            }
        });

        blank.addEventListener('dragleave', event => {
            event.preventDefault();
            blank.classList.remove('droppable'); // Remove the visual cue when leaving the droppable area
        });

        blank.addEventListener('drop', event => {
            event.preventDefault();
            blank.classList.remove('droppable'); // Remove the visual cue when dropping

            if (event.target.className === 'blanks' && !blank.firstChild) {
                
                blank.appendChild(dragged);
                blank.classList.add('dropped');
                dragged.classList.add('dropped');
                dragged = null;
            }
        });
    });
}
// Declare a function to get the ids from the words in the answer provided by the user
//Those ids will be used to validate the answer in a different function
function getIdsFromAnswer (){
    const blanksArray= [...blanksContainer.children];
    let answerCode = "";
    blanksArray.forEach((blank) => {
        answerCode += blank.firstChild.id;
  
    })
    // console.log(`answ code from getidapp: `, answerCode);
    return answerCode;
}
// Declare function to validate answer
function validateAnswer(){
    const answerKey = sentenceObject.orderOfWords;
    console.log(`answerKey: `, answerKey);
    const userAnswer = getIdsFromAnswer();
    console.log(`user answer key: `, userAnswer)
    if(parseInt(answerKey) === parseInt(userAnswer)){
        return true;
    }
    else{
        return false;
    }
}

function submitAnswer() {
    submit.addEventListener('click', (event) => {
        submit.classList.add('hide');
        dislplayFeedback();   
        nextButton.classList.remove('hide');
      
    })
}

function dislplayFeedback() {
    const isCorrect = validateAnswer();
    if(!isCorrect){
        feedback.textContent = "¡Uy, casi!";
        feedback.classList.add("feedback-wrong");
        feedback.classList.remove('hide')
    }
    else {
        feedback.textContent = "¡Perfecto!"
        feedback.classList.add("feedback-correct");  
        feedback.classList.remove('hide')
    }
}
function nextSentence() {
    nextButton.addEventListener('click', (event) => {
        
        sentenceNumber++;
        sentenceObject = getSentenceObject(sentenceNumber);
        displayShuffledWords(sentenceObject);
        nextButton.classList.add('hide');
        resetApp();

    });
}
function updatePoints() {
//TO-DO
}