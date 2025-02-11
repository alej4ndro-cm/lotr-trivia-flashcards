# Project 3: **LOTR Trivia Flashcards**

Submitted by: **Alejandro Munoz**  

This web app: **A Lord of the Rings-themed flashcard game that tests knowledge of Middle-earth, covering both *The Lord of the Rings* and *The Silmarillion*. Users can enter answers, receive feedback on correctness, navigate through trivia questions, and track their score. The game ends once all cards have been answered, displaying the final score and an option to restart.**  

Time spent: **X** hours spent in total  

## 🎯 Goals Achieved  

By the end of this project, I was able to:  

✅ **Use `useState()` to create and manage multiple state variables**  
✅ **Use state to modify the visual appearance of the web app dynamically**  
✅ **Ensure state validation before making changes**  
✅ **Implement `onClick()` and `onChange()` events to adjust/reset state variables**  
✅ **Create an input field where users can type their answers**  
✅ **Develop nested components to handle complexity effectively**  

---

## ✅ Required Features Implemented  

### **User Input**  
- [x] The user can enter their guess before seeing the flipside of the card.  
- [x] Clicking on a submit button provides **immediate feedback** about whether the answer was correct or incorrect.  
- [x] Case-insensitive **answer validation** (e.g., “Andúril” = “anduril”).  
- [x] **Fuzzy matching** for minor variations (e.g., “ring” accepted for “The One Ring”).  

### **Moving Multiple Ways in the Card List**  
- [x] A **back button** allows users to return to the previous card.  
- [x] A **next button** allows users to navigate through the card sequence.  
- [x] Navigation buttons are now **perfectly centered across all screen sizes**.  

---

## 🚀 Stretch Features Implemented  

- [x] **Shuffle Button** - Randomizes card order for a varied experience.  
- [x] **Enhanced Answer Matching** - Accepts close matches (e.g., “ring” instead of “The One Ring”).  
- [x] **Score Tracking & Longest Streak** - Tracks the number of correct answers and the highest streak achieved.  
- [x] **Prevents Answer Changes** - Once a card is answered (correct or incorrect), it **cannot be modified** to prevent score manipulation.  
- [x] **Final Score & Restart Screen** - When all cards are answered, the game displays the **final score** and a **“Try Again”** button.  
- [x] **Fire-Themed Animations** - Dynamic **fire effects** applied to “Game Over!”, “Final Score”, and “Card Counter”.  
- [x] **Middle-earth Theming** - Custom-designed **LOTR parchment textures and fonts**.  
- [x] **Animated Button Borders** - Buttons now feature subtle glowing effects.  
- [x] **Smooth Flip Animation Fix** - Fixed an issue where answers flashed briefly when flipping to a new card.  

---

## 🎥 Video Walkthrough  

Here's a walkthrough of implemented required features:

<img src='https://i.imgur.com/2UFBHnV.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />

<!-- Replace this with whatever GIF tool you used! -->
GIF created with [peek](https://github.com/phw/peek) for Linux.


---

## 📂 Repository  

GitHub Repository: [LOTR Trivia Cards](https://github.com/FAU-FullStack-Dev-Spring2025/project-3-alej4ndro-cm)  

---

## 📝 Notes & Challenges  

### **Bugs & Fixes**  
❌ **Flashing Answer Bug:** The answer was briefly visible when switching to the next card.  
✔️ **Fixed!** Now the card resets properly before flipping.  

❌ **Score Manipulation Issue:** Users could revisit old questions and modify their score.  
✔️ **Fixed!** Once a question is answered, it cannot be changed.  

❌ **Answer Matching Too Strict:** Previously, users had to type the exact response.  
✔️ **Fixed!** Now the system allows minor variations and synonyms.  

❌ **Button Alignment on Smaller Screens:** Buttons were misaligned at **767x923** resolution.  
✔️ **Fixed!** The `button-container` now adapts to all screen sizes.  

---

## 🛠 Technologies Used  

- **React.js** for component-based UI  
- **ReactCardFlip** for smooth card flip animation  
- **CSS & Flexbox/Grid** for responsive design  
- **Custom Middle-earth Styling** (fonts, textures, fire effects)  

---

## 📜 License  

    Copyright 2024 Alejandro Munoz  

    Licensed under the Apache License, Version 2.0 (the "License");  
    you may not use this file except in compliance with the License.  
    You may obtain a copy of the License at  

        http://www.apache.org/licenses/LICENSE-2.0  

    Unless required by applicable law or agreed to in writing, software  
    distributed under the License is distributed on an "AS IS" BASIS,  
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.  
    See the License for the specific language governing permissions and  
    limitations under the License.  
