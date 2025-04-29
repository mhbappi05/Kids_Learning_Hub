document.addEventListener('DOMContentLoaded', () => {
    const shapes = ['circle', 'square', 'triangle', 'star'];
    const colors = [
      { name: 'red',    hex: '#e74c3c' },
      { name: 'blue',   hex: '#3498db' },
      { name: 'green',  hex: '#2ecc71' },
      { name: 'yellow', hex: '#f1c40f' }
    ];
  
    // Build all shape–color combinations
    const combos = [];
    shapes.forEach(shape => {
      colors.forEach(color => {
        combos.push({ shape, color });
      });
    });
  
    const grid = document.getElementById('shape-grid');
    const instruction = document.getElementById('instruction');
    let target = null;
  
    // Create grid cells
    combos.forEach(({ shape, color }) => {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.shape = shape;
      cell.dataset.color = color.name;
  
      // set the CSS variable for color
      cell.style.setProperty('--color', color.hex);
  
      // create the shape inside
      if (shape === 'star') {
        // use Unicode star
        cell.textContent = '★';
      } else {
        const shapeEl = document.createElement('div');
        shapeEl.classList.add(`shape-${shape}`);
        cell.appendChild(shapeEl);
      }
  
      // click handler
      cell.addEventListener('click', () => {
        const isCorrect =
          cell.dataset.shape === target.shape &&
          cell.dataset.color === target.color.name;
  
        if (isCorrect) {
          cell.classList.add('correct');
          speak('Great job!');
          setTimeout(() => {
            cell.classList.remove('correct');
            pickNext();
          }, 800);
        } else {
          cell.classList.add('wrong');
          speak('Try again!');
          setTimeout(() => {
            cell.classList.remove('wrong');
          }, 300);
        }
      });
  
      grid.appendChild(cell);
    });
  
    // Pick and announce a new target
    function pickNext() {
      const idx = Math.floor(Math.random() * combos.length);
      target = combos[idx];
      instruction.textContent = `Click the ${target.color.name} ${target.shape}`;
      speak(`Click the ${target.color.name} ${target.shape}`);
    }
  
    // Text-to-speech helper
    function speak(text) {
      const msg = new SpeechSynthesisUtterance(text);
      msg.rate = 0.9;
      speechSynthesis.speak(msg);
    }
  
    // start the first round
    pickNext();
  });
  