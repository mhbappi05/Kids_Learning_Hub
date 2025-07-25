document.addEventListener('DOMContentLoaded', () => {
  const cells = document.querySelectorAll('.animal-cell');
  let currentAudio = null;

  cells.forEach(cell => {
    const audio = cell.querySelector('audio');

    cell.addEventListener('click', () => {
      // Stop current audio if playing
      if (currentAudio && !currentAudio.paused) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
      }

      // Play new audio
      audio.currentTime = 0;
      audio.play();
      currentAudio = audio;

      // Add feedback
      cell.classList.add('playing');
      setTimeout(() => cell.classList.remove('playing'), 800);
    });
  });
});
