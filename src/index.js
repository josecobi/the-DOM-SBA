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
        hint: "We're going to...",
        words: [
            { id: 3, text: "corre" },
            { id: 1, text: "el" },
            { id: 2, text: "hombre" },
        ],
    },
    {
        orderOfWords: 123,
        hint: "En la playa",
        words: [
            { id: 3, text: "juega" },
            { id: 2, text: "niño" },
            { id: 1, text: "el" },
        ],
    },
    {
        orderOfWords: 12345,
        hint: "Cena familiar",
        words: [
            { id: 1, text: "la" },
            { id: 3, text: "lee" },
            { id: 5, text: "libro" },
            { id: 2, text: "mujer" },
            { id: 4, text: "un" },

        ],
    },
];

// Create variables to manipulate the DOM
const $ = document.querySelector.bind(document);
const startButton = $("#start-button"); 
const instructions = $("#instructions");
const gameContainer = $(".game-container");
const questionContainer = $("#question-container");
const nextButton = $("#next-button");
const blanksContainer = $(".blanks-container");
const blanks = $('.blanks');

const wordsContainer = $('#words-container');
const feedback = $("#answerFeedback");
const submit = $("#submit");
let dragged = null;
let numberOfBlanks = null;
let questionNumber = 0;

//Add event listener to the start button to start the game
submit.classList.add("hide");                
startButton.addEventListener("click", startGame);
      

//Declare the main function of the app
function startGame(evt){
startButton.classList.add("hide");
evt.preventDefault();   
// Call helper functions
// Reset app (hide feedback and next button show submit button. If user run out of questions display finish button instead of submit)
resetApp()
// Call function to display shuffled words
const sentenceObject = getSentenceObject(questionNumber);
console.log("Sentence object: ", sentenceObject);
displayShuffledWords(sentenceObject);

// add event listener for drag and drop
// add event listener for submit/finish button
// Hide submit button

// Call function to validate answer
    // Concatenate id of the words in the user's answer. ParseInt and compare to OrderOfwords of the current object
    // Provide feedback

// Show next button
// add event listener for the next button
    questionNumber++;
}

//Declare helper functions
function resetApp(){
    // Reset state
    wordsContainer.innerHTML = '';
    if(blanks){
        console.log("blanks: ", blanks);
        blanks.innerHTML = '';
        blanks.className = 'blanks';
    }
    answerFeedback.innerHTML = '';
    submitClicked = false;    
    nextButton.classList.add("hide");
    
    answerFeedback.classList.remove("feedback-wrong");
    answerFeedback.classList.remove("feedback-correct");
    dragged = null;
}

function getSentenceObject(IndexOfsentenceObj){
    console.log(sentencesArray[IndexOfsentenceObj]);
    return sentencesArray[IndexOfsentenceObj];
}
//Declare a function to display shuffled words
function displayShuffledWords(sentenceObj){
    console.log("sentenceObj in display app: ", sentenceObj);
    sentenceObj.words.forEach((word) => {
        const spanWord = document.createElement('span');
        spanWord.className = "word";
        spanWord.id = word.id;
        spanWord.textContent = word.text;
        spanWord.draggable = true;
        spanWord.addEventListener('dragstart', (event) => {
            if(dragged === null){
                console.log(dragged);
                dragged = event.target;
            }
        });
        wordsContainer.appendChild(spanWord);

        // Display blanks
        const spanBlank = document.createElement("span");
        spanBlank.className = "blanks";
        blanksContainer.appendChild(spanBlank);
        console.log("first child: ", wordsContainer.firstChild); 
    });
    submit.classList.remove("hide");
}