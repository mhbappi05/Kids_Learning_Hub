document.addEventListener('DOMContentLoaded', () => {
    const songs = {
      twinkle: {
        lines: [
          "Twinkle, twinkle, little star,",
          "How I wonder what you are!",
          "Up above the world so high,",
          "Like a diamond in the sky.",
          "Twinkle, twinkle, little star,",
          "How I wonder what you are!"
        ],
        rate: 0.9
      },
      oldmac: {
        lines: [
          "Old MacDonald had a farm, E-I-E-I-O,",
          "And on his farm he had a cow, E-I-E-I-O,",
          "With a moo-moo here and a moo-moo there,",
          "Here a moo, there a moo, everywhere a moo-moo.",
          "Old MacDonald had a farm, E-I-E-I-O."
        ],
        rate: 0.9
      },
      wheels: {
        lines: [
          "The wheels on the bus go round and round,",
          "Round and round, round and round,",
          "The wheels on the bus go round and round,",
          "All through the town."
        ],
        rate: 0.9
      }
    };
  
    const select = document.getElementById('song-select');
    const singBtn = document.getElementById('sing-btn');
    const lyricsContainer = document.getElementById('lyrics-container');
  
    let utter, currentLines, currentIndex = 0;
  
    function renderLyrics(lines) {
      lyricsContainer.innerHTML = '';
      lines.forEach((text, i) => {
        const p = document.createElement('p');
        p.textContent = text;
        p.classList.add('line');
        p.dataset.index = i;
        lyricsContainer.appendChild(p);
      });
    }
  
    function highlightLine(idx) {
      document.querySelectorAll('.line').forEach(el => {
        el.classList.toggle('active', el.dataset.index == idx);
      });
    }
  
    function sing(lines, rate) {
      currentLines = lines;
      currentIndex = 0;
      renderLyrics(lines);
  
      function speakNext() {
        if (currentIndex >= lines.length) return;
        highlightLine(currentIndex);
        utter = new SpeechSynthesisUtterance(lines[currentIndex]);
        utter.rate = rate;
        utter.onend = () => {
          currentIndex++;
          speakNext();
        };
        speechSynthesis.speak(utter);
      }
      // start singing
      speechSynthesis.cancel();
      speakNext();
    }
  
    singBtn.addEventListener('click', () => {
      const key = select.value;
      const song = songs[key];
      sing(song.lines, song.rate);
    });
  
    // Initial render
    renderLyrics(songs.twinkle.lines);
  });
  