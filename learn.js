document.addEventListener('DOMContentLoaded', () => {
    // --- Data ---
    const abcData = [
      { letter: 'A', word: 'Apple 🍎' },
      { letter: 'B', word: 'Ball ⚽' },
      { letter: 'C', word: 'Cat 🐱' },
      { letter: 'D', word: 'Dog 🐶' },
      { letter: 'E', word: 'Elephant 🐘' },
      { letter: 'F', word: 'Fish 🐟' },
      { letter: 'G', word: 'Grapes 🍇' },
      { letter: 'H', word: 'House 🏠' },
      { letter: 'I', word: 'Ice-cream 🍨' },
      { letter: 'J', word: 'Juice 🧃' },
      { letter: 'K', word: 'Kite 🪁' },
      { letter: 'L', word: 'Lion 🦁' },
      { letter: 'M', word: 'Monkey 🐒' },
      { letter: 'N', word: 'Nest 🪺' },
      { letter: 'O', word: 'Orange 🍊' },
      { letter: 'P', word: 'Pencil ✏️' },
      { letter: 'Q', word: 'Queen 👸' },
      { letter: 'R', word: 'Rabbit 🐰' },
      { letter: 'S', word: 'Sun ☀️' },
      { letter: 'T', word: 'Tree 🌳' },
      { letter: 'U', word: 'Umbrella ☂️' },
      { letter: 'V', word: 'Violin 🎻' },
      { letter: 'W', word: 'Whale 🐋' },
      { letter: 'X', word: 'X-ray (Bone) 🦴' },
      { letter: 'Y', word: 'Yacht 🚤' },
      { letter: 'Z', word: 'Zebra 🦓' },
    ];
  
    // number-to-words for 1–100
    const ones   = ["","one","two","three","four","five","six","seven","eight","nine"];
    const teens  = ["ten","eleven","twelve","thirteen","fourteen","fifteen","sixteen","seventeen","eighteen","nineteen"];
    const tens   = ["","","twenty","thirty","forty","fifty","sixty","seventy","eighty","ninety"];
    function numToWords(n) {
      if (n === 0) return "zero";
      if (n < 10) return ones[n];
      if (n < 20) return teens[n - 10];
      if (n < 100) {
        const t = Math.floor(n / 10), o = n % 10;
        return tens[t] + (o ? "-" + ones[o] : "");
      }
      if (n === 100) return "one hundred";
    }
  
    // --- Elements ---
    const abcModule   = document.getElementById('abc-module');
    const numModule   = document.getElementById('num-module');
    const btnABC      = document.getElementById('mode-abc');
    const btnNum      = document.getElementById('mode-num');
    const letterDisp  = document.getElementById('letter-display');
    const wordDisp    = document.getElementById('word-display');
    const prevLet     = document.getElementById('prev-letter');
    const nextLet     = document.getElementById('next-letter');
    const numDisp     = document.getElementById('number-display');
    const spellDisp   = document.getElementById('spelling-display');
    const prevNum     = document.getElementById('prev-num');
    const nextNum     = document.getElementById('next-num');
  
    let abcIndex = 0;
    let numIndex = 1;
  
    // --- Mode Toggle ---
    btnABC.addEventListener('click', () => {
      btnABC.classList.add('selected');
      btnNum.classList.remove('selected');
      abcModule.classList.remove('hidden');
      numModule.classList.add('hidden');
      speak(`${abcData[abcIndex].letter} for ${abcData[abcIndex].word.split(' ')[0]}`);
    });
    btnNum.addEventListener('click', () => {
      btnNum.classList.add('selected');
      btnABC.classList.remove('selected');
      numModule.classList.remove('hidden');
      abcModule.classList.add('hidden');
      speak(numToWords(numIndex));
    });
  
    // --- ABC Navigation ---
    function updateABC() {
      const { letter, word } = abcData[abcIndex];
      letterDisp.textContent = letter;
      wordDisp.textContent   = word;
    }
    prevLet.addEventListener('click', () => {
      abcIndex = (abcIndex + abcData.length - 1) % abcData.length;
      updateABC();
      speak(`${abcData[abcIndex].letter} for ${abcData[abcIndex].word.split(' ')[0]}`);
    });
    nextLet.addEventListener('click', () => {
      abcIndex = (abcIndex + 1) % abcData.length;
      updateABC();
      speak(`${abcData[abcIndex].letter} for ${abcData[abcIndex].word.split(' ')[0]}`);
    });
  
    // --- Number Navigation ---
    function updateNum() {
      numDisp.textContent   = numIndex;
      spellDisp.textContent = numToWords(numIndex);
    }
    prevNum.addEventListener('click', () => {
      numIndex = numIndex > 1 ? numIndex - 1 : 100;
      updateNum();
      speak(numToWords(numIndex));
    });
    nextNum.addEventListener('click', () => {
      numIndex = numIndex < 100 ? numIndex + 1 : 1;
      updateNum();
      speak(numToWords(numIndex));
    });
  
    // --- Speech Helper ---
    function speak(text) {
      const u = new SpeechSynthesisUtterance(text);
      u.rate = 0.9;
      speechSynthesis.speak(u);
    }
  
    // --- Initialize ---
    updateABC();
    updateNum();
    speak(`${abcData[0].letter} for ${abcData[0].word.split(' ')[0]}`);
  });
  