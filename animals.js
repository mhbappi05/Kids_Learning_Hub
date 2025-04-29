document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.animal-cell');
  
    cells.forEach(cell => {
      const audio = cell.querySelector('audio');
      cell.addEventListener('click', () => {
        // reset & play
        audio.currentTime = 0;
        audio.play();
  
        // highlight feedback
        cell.classList.add('playing');
        setTimeout(() => cell.classList.remove('playing'), 800);
      });
    });
  });
  