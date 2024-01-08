# Spanish Hub - Order the Words Game

## Overview

"Order the Words" is an application that helps users practice and enhance their Spanish language skills through an interactive game. The game challenges users to arrange words in the correct order to form coherent Spanish sentences. Each sentence is associated with a hint to guide users in constructing the correct sentence. This app will be included in the ongoing project [SpanishHub](https://github.com/josecobi/SpanishHub).

## Screenshots
![Screenshot 2024-01-08 160503](https://github.com/josecobi/the-DOM-SBA/assets/58313777/8e0efe96-0d94-4198-a1b2-84fc24e60b2a)

![Screenshot 2024-01-08 160517](https://github.com/josecobi/the-DOM-SBA/assets/58313777/547f8854-4385-4f7b-8302-505ff711baee)

![Screenshot 2024-01-08 160527](https://github.com/josecobi/the-DOM-SBA/assets/58313777/e9b048b2-f628-48d2-855e-0b764e008f7a)

![Screenshot 2024-01-08 160856](https://github.com/josecobi/the-DOM-SBA/assets/58313777/33bd8f5f-1932-4443-9952-e226f4794546)

![Screenshot 2024-01-08 160713](https://github.com/josecobi/the-DOM-SBA/assets/58313777/3537030c-544c-4f9b-a831-b826919850cc)

![Screenshot 2024-01-08 160729](https://github.com/josecobi/the-DOM-SBA/assets/58313777/eb4bac7b-4d6d-49d9-9700-ec8e6b65e196)

![Screenshot 2024-01-08 160749](https://github.com/josecobi/the-DOM-SBA/assets/58313777/c7f9be8c-8d42-43fa-85ba-26b870f6bdf9)

## Game Rules

1. **Username Submission:**
   - Users are required to submit their names before starting the game.
   - The username must be at least four characters long, contain at least two unique characters, and cannot include special characters or whitespace.

2. **Gameplay:**
   - Users start the game by clicking the "Start" button.
   - They are presented with a sentence along with a set of words. The goal is to drag and drop the words into the correct order to form a grammatically correct sentence.
   - A set of blanks is provided to drop the words into. The order of the blanks corresponds to the correct order of the words in the sentence.

3. **Feedback:**
   - After arranging the words, users can submit their answers by clicking the "Submit" button.
   - Feedback is provided based on the correctness of the sentence:
     - If incorrect, users receive feedback such as "¡Uy, casi!" (Oh no, almost!).
     - If correct, users receive positive feedback such as "¡Perfecto!" (Perfect!).

4. **Next Sentence:**
   - After submitting an answer, users can proceed to the next sentence by clicking the "Next" button.
   - The game continues until all sentences are completed.

## Code Structure

### Array of Sentences

The game utilizes an array of objects, each representing a sentence. Each object includes information about the order of words, a hint, and an array of words.

```javascript
const sentencesArray = [
  {
    orderOfWords: 12345,
    hint: "The kids play...",
    words: [
      { id: 3, text: "en" },
      // ... (other words)
    ],
  },
  // ... (other sentences)
];
```

## DOM Manipulation

The code includes functions for handling user interactions and updating the DOM. It utilizes variables to select and manipulate DOM elements, ensuring a dynamic and responsive user interface.

## Styling

The game's visual elements are styled using CSS to provide an engaging and user-friendly experience.

## How to Play

1. Enter your name and click "Submit."
2. Click the "Start" button to begin the game.
3. Drag and drop words to form a correct sentence.
4. Click "Submit" to check your answer and receive feedback.
5. Click "Next" to move on to the next sentence.
6. Repeat the process until all sentences are completed.

Have fun learning and improving your Spanish language skills with Spanish Hub!
