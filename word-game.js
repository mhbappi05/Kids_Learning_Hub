
const words = [
    { word: 'CAT', img: 'https://i.pinimg.com/236x/67/d8/4f/67d84f0bbaab65e146b4f5ab8cb70a29.jpg' },
    { word: 'DOG', img: 'https://i.pinimg.com/236x/11/23/d1/1123d1ad76c63a75f510469075e95994.jpg' },
    { word: 'SUN', img: 'https://i.pinimg.com/236x/59/7b/b0/597bb0a99afb0eae89fcf0065469614a.jpg' },
    { word: 'BALL', img: 'https://i.pinimg.com/236x/f1/6f/3b/f16f3b4325aee15b65b38f28b9d83118.jpg' },
    { word: 'TREE', img: 'https://i.pinimg.com/236x/4c/82/46/4c82467e9dcae14d0bb54ca63eb823ea.jpg' }
  ];
  let current = {};
  
  document.addEventListener('DOMContentLoaded', () => {
    const imgEl = document.getElementById('word-image');
    const blanks = document.getElementById('letter-blanks');
    const bank = document.getElementById('letter-bank');
    const instr = document.getElementById('instruction');
  
    function pickWord() {
      const idx = Math.floor(Math.random()*words.length);
      current = { ...words[idx], letters: words[idx].word.split('') };
      imgEl.src = current.img;
      instr.textContent = 'Spell the word:';
      render();
      speak(`Spell the word`);
    }
  
    function render() {
      blanks.innerHTML = '';
      bank.innerHTML = '';
      current.letters.forEach(_ => blanks.appendChild(createBlank()));
      shuffle(current.letters).forEach(l => bank.appendChild(createTile(l)));
    }
  
    function createBlank() {
      const b = document.createElement('div'); b.className='blank'; return b;
    }
    function createTile(letter) {
      const t = document.createElement('div');
      t.className='tile'; t.textContent=letter;
      t.onclick = () => handleTile(t);
      return t;
    }
  
    function handleTile(tile) {
      const placed = blanks.querySelectorAll('.blank');
      for (let b of placed) {
        if (!b.textContent) {
          if (tile.textContent === current.letters[banksIndex(b)]) {
            b.textContent = tile.textContent; tile.classList.add('correct');
            speak(tile.textContent);
            if (Array.from(placed).every(x=>x.textContent)) {
              instr.textContent='Well done!'; speak('Great job!');
              setTimeout(pickWord,1000);
            }
          } else {
            tile.classList.add('wrong'); speak('Try again');
            setTimeout(()=>tile.classList.remove('wrong'),300);
          }
          return;
        }
      }
    }
  
    function banksIndex(blankEl) {
      return Array.from(blanks.children).indexOf(blankEl);
    }
  
    function shuffle(arr) {
      return arr.slice().sort(() => Math.random()-0.5);
    }
  
    function speak(text) {
      const u = new SpeechSynthesisUtterance(text);
      u.rate=0.9; speechSynthesis.speak(u);
    }
  
    pickWord();
  });