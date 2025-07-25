
const words = [
    { word: 'CAT', img: 'https://i.pinimg.com/236x/67/d8/4f/67d84f0bbaab65e146b4f5ab8cb70a29.jpg' },
    { word: 'DOG', img: 'https://i.pinimg.com/236x/11/23/d1/1123d1ad76c63a75f510469075e95994.jpg' },
    { word: 'SUN', img: 'https://i.pinimg.com/236x/59/7b/b0/597bb0a99afb0eae89fcf0065469614a.jpg' },
    { word: 'BALL', img: 'https://i.pinimg.com/236x/f1/6f/3b/f16f3b4325aee15b65b38f28b9d83118.jpg' },
    { word: 'TREE', img: 'https://i.pinimg.com/236x/4c/82/46/4c82467e9dcae14d0bb54ca63eb823ea.jpg' },
    { word: 'CAR', img: 'https://i.pinimg.com/736x/b5/96/02/b5960217718f6c6b13cfd434f3f37139.jpg' },
    { word: 'APPLE', img: 'https://i.pinimg.com/736x/93/ee/ae/93eeae50f268042e49cb8cec649f9c9e.jpg' },
    { word: 'FISH', img: 'https://i.pinimg.com/1200x/1e/d1/99/1ed1997e2c92523d588202df39d6f258.jpg' },
    { word: 'BOOK', img: 'https://i.pinimg.com/736x/cd/69/34/cd6934d4dd20201cb4a320c3d511e546.jpg' },
    { word: 'Boat', img: 'https://i.pinimg.com/736x/65/dd/3f/65dd3f0296fd60bf202c9bd2e2cdaec4.jpg' },
    { word: 'Airplane', img: 'https://i.pinimg.com/736x/09/a1/3d/09a13dd0157a9c4f1e53a9b8781ac70a.jpg' },
    { word: 'Doll', img: 'https://i.pinimg.com/736x/39/5e/01/395e01923f39181f1af65e710530228e.jpg' },
    { word: 'Lion', img: 'https://i.pinimg.com/736x/14/5b/8f/145b8f79e492a6cb2b640b8d1b79b876.jpg' },
    { word: 'Tiger', img: 'https://i.pinimg.com/736x/ee/15/cd/ee15cd2286c5aa92b7bdbca2d12375e9.jpg' },
    { word: 'Fox', img: 'https://i.pinimg.com/1200x/9e/1f/44/9e1f445953ab7fd8a8bfa906d073efed.jpg' },
    { word: 'Mango', img: 'https://i.pinimg.com/736x/ff/8a/af/ff8aaf10360fec617ffdac652c7f6d48.jpg' },
    { word: 'Orange', img: 'https://i.pinimg.com/1200x/a7/32/d8/a732d80f0ffe10cc4159c6f38b9dd60e.jpg' },
    { word: 'Watermelon', img: 'https://i.pinimg.com/736x/42/01/cf/4201cf9132063826b83007a7685b0bea.jpg' },
    { word: 'IceCream', img: 'https://i.pinimg.com/1200x/05/18/6c/05186c8a4382076e9ffd4116f2cd6a7e.jpg' },
    { word: 'Chocolate', img: 'https://i.pinimg.com/736x/2f/24/24/2f24249411ec2131e5a5def3b4093916.jpg' },
    { word: 'Milk', img: 'https://i.pinimg.com/1200x/37/79/60/37796058d6bca22e018bffcd6cace39e.jpg' },
    { word: 'Kingfisher', img: 'https://i.pinimg.com/736x/0c/22/63/0c2263ca755eb53b3a97ae9aa9bd64e1.jpg' },
    { word: 'Pigeon', img: 'https://i.pinimg.com/736x/39/08/03/3908037147b8cc22385ad4349bc05520.jpg' },
    { word: 'Sparrow', img: 'https://i.pinimg.com/736x/53/95/f2/5395f2a57dcca6d70091994d979c4f1b.jpg' },
    { word: 'Telephone', img: 'https://i.pinimg.com/736x/a4/18/c2/a418c2fba3a5080f1554bab58ad88f3b.jpg' },
    { word: 'Clock', img: 'https://i.pinimg.com/736x/0d/41/cc/0d41ccaf1b0223a76da4ae4dfe2adb82.jpg' },
    { word: 'Fan', img: 'https://i.pinimg.com/736x/ba/69/f1/ba69f1b142d0c68c1fd9bab0d5524579.jpg' },
    { word: 'Duck', img: 'https://i.pinimg.com/736x/c3/4a/05/c34a057b44261b58f5fc7fd3983da044.jpg' },
    { word: 'Rabbit', img: 'https://i.pinimg.com/736x/dd/16/86/dd16862bf8e91102f25af5630eecdc2e.jpg' },
    { word: 'Horse', img: 'https://i.pinimg.com/736x/24/08/0a/24080a7722510832006ab75065b2b6e5.jpg' }
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
      u.rate=1.5; speechSynthesis.speak(u);
    }
  
    pickWord();
  });