//Create array of objects. Each object contains information of each sentence
const sentencesArray = [
    {
      // Order of words to validate the answer  
      orderOfWords: 12345,
      hint: "The kids play...",
      // Words that conform the sentence. Id will be used to validate the answer
      words: [
        { id: 1, word: "los niños" },
        { id: 2, word: "juegan" },
        { id: 3, word: "en" },
        { id: 4, word: "el" },
        { id: 5, word: "parque" },
      ],
    },
    {
      orderOfWords: 123,
      hint: "She brushes...",
      words: [
        { id: 1, word: "ella" },
        { id: 2, word: "se cepilla" },
        { id: 3, word: "los dientes" },
      ],
    },
    {
      orderOfWords: 123,
      hint: "We're going to...",
      words: [
        { id: 1, word: "el" },
        { id: 2, word: "hombre" },
        { id: 3, word: "corre" },
      ],
    },
    {
      orderOfWords: 123,
      hint: "En la playa",
      words: [
        { id: 1, word: "el" },
        { id: 2, word: "niño" },
        { id: 3, word: "juega" },
      ],
    },
    {
      orderOfWords: 12345,
      hint: "Cena familiar",
      words: [
        { id: 1, word: "la" },
        { id: 2, word: "mujer" },
        { id: 3, word: "lee" },
        { id: 4, word: "un" },
        { id: 5, word: "libro" },

      ],
    },
  ];

  // Create variables to manipulate the DOM
  const $ = document.querySelector;
  const startButton = $("#start-button"); 
  const instructions = $("#instructions");
  const gameContainer = $(".game-container");
  const questionContainer = $("#question-container");
  const nextButton = $("#next-button");
  const blanks = $('.blanks');
  const wordsContainer = $('.wordsContainer');
  const feedback = $("#answerFeedback");

  //Add event listener to the start button to start the game
                        
  startButton.addEventListener("click", startGame);
      

  //Declare the main function of the app
  function startGame(evt){
    evt.preventDefault();   
    // Call helper functions
    // Reset app (hide feedback and next button show submit button. If user run out of questions display finish button instead of submit)



    // Call function to display shuffled words
    // add event listener for drag and drop
    // add event listener for submit/finish button
    // Hide submit button
    
    // Call function to validate answer
        // Concatenate id of the words in the user's answer. ParseInt and compare to OrderOfwords of the current object
        // Provide feedback

    // Show next button
    // add event listener for the next button
        
  }
  //Declare helper functions
  function resetApp(){
      wordsContainer.innerHTML = '';
      blanks.innerHTML = '';
      answerFeedback.innerHTML = '';
      // Do I need submitClicked = false;?

      // Reset state
      blanks.className = 'blank';
      nextButton.classList.add("hide");
      submit.classList.remove("hide");
      answerFeedback.classList.remove("feedback-wrong");
      answerFeedback.classList.remove("feedback-correct");
  }

