const pairs = [
    { word: 'CAT', img: 'https://i.pinimg.com/236x/67/d8/4f/67d84f0bbaab65e146b4f5ab8cb70a29.jpg' },
    { word: 'DOG', img: 'https://i.pinimg.com/236x/11/23/d1/1123d1ad76c63a75f510469075e95994.jpg' },
    { word: 'SUN', img: 'https://i.pinimg.com/236x/59/7b/b0/597bb0a99afb0eae89fcf0065469614a.jpg' },
    { word: 'BALL', img: 'https://i.pinimg.com/236x/f1/6f/3b/f16f3b4325aee15b65b38f28b9d83118.jpg' },
    { word: 'TREE', img: 'https://i.pinimg.com/236x/4c/82/46/4c82467e9dcae14d0bb54ca63eb823ea.jpg' }
  ];
  
  let selectedImg = null;
  let selectedWord = null;
  
  document.addEventListener('DOMContentLoaded', () => {
    const imagesGrid = document.getElementById('images-grid');
    const wordsGrid = document.getElementById('words-grid');
  
    // Shuffle arrays
    const imgItems = shuffle(pairs.slice());
    const wordItems = shuffle(pairs.slice());
  
    // Render images
    imgItems.forEach(item => {
      const div = document.createElement('div');
      div.className = 'card-item';
      div.dataset.word = item.word;
      div.innerHTML = `<img src="${item.img}" alt="${item.word}" /><div class="word-text">${item.word}</div>`;
      div.addEventListener('click', () => selectImage(div));
      imagesGrid.appendChild(div);
    });
  
    // Render words only
    wordItems.forEach(item => {
      const div = document.createElement('div');
      div.className = 'card-item';
      div.dataset.word = item.word;
      div.innerHTML = `<div class="word-text">${item.word}</div>`;
      div.addEventListener('click', () => selectWord(div));
      wordsGrid.appendChild(div);
    });
  });
  
  function selectImage(div) {
    if (div.classList.contains('matched')) return;
    clearSelection();
    selectedImg = div;
    div.classList.add('selected');
    checkMatch();
  }
  
  function selectWord(div) {
    if (div.classList.contains('matched')) return;
    clearSelection();
    selectedWord = div;
    div.classList.add('selected');
    checkMatch();
  }
  
  function clearSelection() {
    document.querySelectorAll('.selected').forEach(el => el.classList.remove('selected'));
  }
  
  function checkMatch() {
    if (selectedImg && selectedWord) {
      if (selectedImg.dataset.word === selectedWord.dataset.word) {
        selectedImg.classList.add('matched');
        selectedWord.classList.add('matched');
        speak('Correct!');
      } else {
        selectedImg.classList.add('wrong');
        selectedWord.classList.add('wrong');
        speak('Try again!');
        setTimeout(() => {
          selectedImg.classList.remove('wrong');
          selectedWord.classList.remove('wrong');
        }, 500);
      }
      selectedImg = null;
      selectedWord = null;
    }
  }
  
  function shuffle(arr) {
    return arr.sort(() => Math.random() - 0.5);
  }
  
  function speak(text) {
    const u = new SpeechSynthesisUtterance(text);
    u.rate = 0.9;
    speechSynthesis.speak(u);
  }
  