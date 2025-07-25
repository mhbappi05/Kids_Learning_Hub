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
        rate: 1.2
      },
      oldmac: {
        lines: [
          "Old MacDonald had a farm, E-I-E-I-O,",
          "And on his farm he had a cow, E-I-E-I-O,",
          "With a moo-moo here and a moo-moo there,",
          "Here a moo, there a moo, everywhere a moo-moo.",
          "Old MacDonald had a farm, E-I-E-I-O."
        ],
        rate: 1.2
      },
      wheels: {
        lines: [
          "The wheels on the bus go round and round,",
          "Round and round, round and round,",
          "The wheels on the bus go round and round,",
          "All through the town."
        ],
        rate: 1.2
      },
      moon: {
        lines: [
          "Good night moon,",
          "Good night star,",
          "Good night clouds",
          "Up so far.",
          
          "Close your eyes,",
          "Drift and dream,",
          "Float on by",
          "A silver stream."
        ],
        rate: 1.2
      },
      chick: {
        lines: [
          "Little chick in yellow fluff,",
          "Peep and cheep, you’re small but tough.",
          "Pecking grain and running fast,",
          "Growing up so big, so fast!"
        ],
        rate: 1.2
      },
      sun: {
        lines: [
          "Hello sun, so bright and high,",
          "Warming up the morning sky.",
          "Shine on flowers, trees, and me,",
          "Lighting up the world I see!"
        ],
        rate: 1.2
      },
      froggy: {
        lines: [
          "Froggy hop, froggy leap,",
          "Splashing in the pond so deep.",
          "Croak and jump from log to log,",
          "You silly, happy little frog!"
        ],
        rate: 1.2
      },
      apple: {
        lines: [
          "Up in the tree, red apples grow,",
          "Sweet and round in the sun's warm glow.",
          "Pick one now, and take a bite,",
          "Crisp and juicy — what delight!"
        ],
        rate: 1.2
      },
      cat: {
        lines: [
          "My little cat is soft and gray,",
          "She purrs and naps the day away.",
          "She likes to chase and likes to play,",
          "Then curls up at the end of day."
        ],
        rate: 1.2
      },
      bug: {
        lines: [
          "Ladybug, ladybug,",
          "Up in the sky,",
          "Flying so gently",
          "As clouds pass by.",
          
          "Land on my finger,",
          "Stay for a while,",
          "I’ll watch you dance",
          "And giggle and smile!"
        ],
        rate: 1.2
      },
      puppy: {
        lines: [
          "I have a puppy, soft and sweet,",
          "With wagging tail and happy feet.",
          "He licks my face and runs around,",
          "He barks and plays without a sound!"
        ],
        rate: 1.2
      },
      rain: {
        lines: [
          "Raindrops falling on the ground,",
          "Pitter, patter, what a sound!",
          "Splash in puddles, wear your boots,",
          "Dance in rain in your bright suits!"
        ],
        rate: 1.2
      },
      sunflower: {
        lines: [
          "Sunflower tall, reaching the sky,",
          "Stretching your face to the sun up high.",
          "Golden petals, big green leaves,",
          "Waving gently in the breeze."
        ],
        rate: 1.2
      },
      caterpiller: {
        lines: [
          "A little caterpillar crawled on a leaf,",
          "Munching and crunching, not a thief!",
          "He made a cocoon, quiet and tight,",
          "Then came out a butterfly, flying in light!"
        ],
        rate: 1.2
      },
      star: {
        lines: [
          "Stars above are shining bright,",
          "Twinkling softly through the night.",
          "One by one, they light the sky,",
          "Winking gently as they fly."
        ],
        rate: 1.2
      },
      bunny: {
        lines: [
          "Hop, hop, hop goes the bunny,",
          "Through the grass when it’s sunny.",
          "Wiggle nose and floppy ears,",
          "Hopping brings the bunny cheers!"
        ],
        rate: 1.2
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
  