document.addEventListener('DOMContentLoaded', () => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    const grid = document.getElementById('letter-grid');
    const instruction = document.getElementById('instruction');
    let targetLetter = '';
  
    // Create letter cells
    letters.forEach(letter => {
      const cell = document.createElement('div');
      cell.textContent = letter;
      cell.classList.add('letter-cell');
      grid.appendChild(cell);
      cell.addEventListener('click', () => checkLetter(cell, letter));
    });
  
    // Pick a random target
    function pickNext() {
      const idx = Math.floor(Math.random() * letters.length);
      targetLetter = letters[idx];
      instruction.textContent = `Click the letter: ${targetLetter}`;
      speak(`Click the letter ${targetLetter}`);
    }
  
    // Check user click
    function checkLetter(cell, letter) {
      if (letter === targetLetter) {
        cell.classList.add('correct');
        speak('Great job!');
        setTimeout(() => {
          cell.classList.remove('correct');
          pickNext();
        }, 800);
      } else {
        cell.classList.add('wrong');
        speak('Try again!');
        setTimeout(() => cell.classList.remove('wrong'), 300);
      }
    }
  
    // Text-to-speech
    function speak(text) {
      const utter = new SpeechSynthesisUtterance(text);
      utter.rate = 0.9;
      speechSynthesis.speak(utter);
    }
  
    // Start!
    pickNext();
  });
  