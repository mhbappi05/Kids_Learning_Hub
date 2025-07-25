document.addEventListener('DOMContentLoaded', () => {
    const select = document.getElementById('puzzle-select');
    const pieces = document.querySelectorAll('.piece');
    const cells  = document.querySelectorAll('.cell');
    const bank   = document.getElementById('piece-bank');
    let dragged = null;
  
    // Load puzzle image into each piece
    function loadPuzzle(url) {
      // Set background for each piece
      pieces.forEach(p => {
        const index = parseInt(p.dataset.index);
        const x = index % 3;
        const y = Math.floor(index / 3);
        p.style.backgroundImage = `url(${url})`;
        p.style.backgroundSize = `300px 300px`;
        p.style.backgroundPosition = `-${x * 100}px -${y * 100}px`;
      });
    
      // Set preview image
      document.getElementById('preview-image').src = url;
    
      // Shuffle pieces
      const shuffled = [...pieces];
      shuffled.sort(() => Math.random() - 0.5);
      shuffled.forEach(p => bank.appendChild(p));
    }
  
  
    // Initialize first puzzle
    loadPuzzle(select.value);
  
    // Change puzzle on dropdown
    select.addEventListener('change', () => loadPuzzle(select.value));
  
    // Drag-and-drop logic
    pieces.forEach(p => p.addEventListener('dragstart', e => dragged = e.target));
  
    [...cells, bank].forEach(el => {
      el.addEventListener('dragover', e => e.preventDefault());
      el.addEventListener('drop', e => {
        if (el.classList.contains('cell')) {
          if (!el.querySelector('.piece')) el.appendChild(dragged);
        } else {
          bank.appendChild(dragged);
        }
        checkWin();
      });
    });
  
    // Check for win
    function checkWin() {
      const done = [...cells].every(cell => {
        const piece = cell.querySelector('.piece');
        return piece && piece.dataset.index === cell.dataset.index;
      });
      if (done) setTimeout(() => alert('Congratulations! 🎉'), 100);
    }
  });
  