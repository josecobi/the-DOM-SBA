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
resetApp()
dragWord()
droppableBlanks()
submitAnswer()   
nextSentence()
}

//Declare helper functions
function resetApp(){
    // Reset state
    wordsContainer.innerHTML = '';
    wordsContainer.classList.remove('hide');
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
        droppableBlanks();

    }

    else {
        // Handle end of questions
        wordsContainer.classList.add("hide");
        submit.classList.add("hide");
        instructions.classList.add("hide");
        blanksContainer.classList.add("hide");
       
        feedback.classList.add('hide');
        alert("GAME OVER");
        console.log("GAME OVER");                            
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

// Declare a function to make blanks droppable and allow the user to drop words in the blanks
function droppableBlanks() {
    const blanksArray = [...blanksContainer.children];
    // Allow the blanks to receive elements dropped on them
    blanksArray.forEach((blank) => {
        blank.addEventListener('dragover', event => {
            event.preventDefault();
            if (event.target.className === 'blanks' && !blank.firstChild) {
            }
        });

        // Prevent the blank from cancelling the drop action
        blank.addEventListener('dragleave', event => {
            event.preventDefault();
        });

        // Listen to the drop event
        blank.addEventListener('drop', event => {
            event.preventDefault();
            // Check if the blank does not have already another word in it to prevent more than one word to go be dropped in the same blank
            if (event.target.className === 'blanks' && !blank.firstChild) {
                // add the word to the blank as a child
                blank.appendChild(dragged);
                blank.classList.add('dropped');
                dragged.classList.add('dropped');
                // reset the dragged element so it can be used again
                dragged = null;
            }
        });
    });
}


// Declare a function to get the ids from the words in the answer provided by the user
// Those ids will be used to validate the answer in a different function
function getIdsFromAnswer (){
    //convert the list of children elements into an array with the spread operator [...]
    const blanksArray= [...blanksContainer.children];
    let answerCode = "";
    //iterate through the array get the id of each word dropped by the user and concatenate it to the value of answerCode
    blanksArray.forEach((blank) => {
        answerCode += blank.firstChild.id;
  
    })
    // console.log(`answ code from getidapp: `, answerCode);
    return answerCode; // it will return a string with numbers in it eg: "2314"
}


// Declare function to validate answer
function validateAnswer(){
    // get the answer key from the sentence object and store it into answerKey
    const answerKey = sentenceObject.orderOfWords;
    // get the answer code from the user and store it into userAnswer
    const userAnswer = getIdsFromAnswer();
    // Convert strings with numbers into numbers and compare them
    if(parseInt(answerKey) === parseInt(userAnswer)){
        return true;
    }
    else{
        return false;
    }
}


// Declare function to submit the answers and display feedback
function submitAnswer() {
    // add event listener to the submit button
    submit.addEventListener('click', (event) => {
        submit.classList.add('hide');
        dislplayFeedback();   
        nextButton.classList.remove('hide');      
    })
}


// Declare function to display feedback 
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


// Declare function to 
function nextSentence() {
    nextButton.addEventListener('click', (event) => {        
        sentenceNumber++;
        sentenceObject = getSentenceObject(sentenceNumber);
        displayShuffledWords(sentenceObject);
        nextButton.classList.add('hide');
        resetApp();

    });
}
