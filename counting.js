document.addEventListener('DOMContentLoaded', () => {
    const numbers = Array.from({length: 20}, (_, i) => i + 1);
    const grid = document.getElementById('number-grid');
    const instruction = document.getElementById('instruction');
    let targetNumber = null;
  
    // Create number cells
    numbers.forEach(num => {
      const cell = document.createElement('div');
      cell.textContent = num;
      cell.classList.add('number-cell');
      grid.appendChild(cell);
      cell.addEventListener('click', () => checkNumber(cell, num));
    });
  
    // Pick a random target
    function pickNext() {
      const idx = Math.floor(Math.random() * numbers.length);
      targetNumber = numbers[idx];
      instruction.textContent = `Click the number: ${targetNumber}`;
      speak(`Click the number ${targetNumber}`);
    }
  
    // Check user click
    function checkNumber(cell, num) {
      if (num === targetNumber) {
        cell.classList.add('correct');
        speak('Well done!');
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
  
    // Text-to-speech helper
    function speak(text) {
      const msg = new SpeechSynthesisUtterance(text);
      msg.rate = 0.9;
      speechSynthesis.speak(msg);
    }
  
    // Initialize first prompt
    pickNext();
  });
  