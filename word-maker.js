document.addEventListener('DOMContentLoaded', () => {
    const families = {
      at: ['c','b','h','r','m'],
      an: ['c','b','m','p','t'],
      it: ['s','f','h','l','p']
    };
    const select = document.getElementById('family-select');
    const display = document.getElementById('word-display');
    const container = document.getElementById('button-container');
  
    function speak(text) {
      const msg = new SpeechSynthesisUtterance(text);
      msg.rate = 0.9;
      speechSynthesis.speak(msg);
    }
  
    function renderButtons() {
      container.innerHTML = '';
      const fam = select.value;
      families[fam].forEach(letter => {
        const btn = document.createElement('button');
        btn.className = 'letter-btn';
        btn.textContent = letter.toUpperCase();
        btn.onclick = () => {
          const word = letter + fam;
          display.textContent = word.toUpperCase();
          speak(word);
        };
        container.appendChild(btn);
      });
      // clear display initially
      display.textContent = '_'.repeat(fam.length + 1);
    }
  
    select.addEventListener('change', renderButtons);
  
    // initial load
    renderButtons();
  });
  