document.addEventListener('DOMContentLoaded', () => {
  const bgCanvas    = document.getElementById('bg-canvas');
  const fgCanvas    = document.getElementById('fg-canvas');
  const bgCtx       = bgCanvas.getContext('2d');
  const fgCtx       = fgCanvas.getContext('2d');
  const select      = document.getElementById('image-select');
  const tools       = document.querySelectorAll('.palette button');
  let drawing    = false;
  let currentColor = '#e74c3c';
  let isEraser   = false;
  let outlineImg = new Image();

  outlineImg.crossOrigin = 'anonymous';
  outlineImg.onload = () => {
    // draw outline only on bg layer
    bgCtx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);
    bgCtx.drawImage(outlineImg, 0, 0, bgCanvas.width, bgCanvas.height);
    fgCtx.clearRect(0, 0, fgCanvas.width, fgCanvas.height); // clear drawing layer
  };

  async function loadOutline(url) {
    // use CORS proxy for SVGRepo
    const proxy  = 'https://api.allorigins.win/raw?url=' + encodeURIComponent(url);
    const res    = await fetch(proxy);
    const svgTxt = await res.text();
    const blob   = new Blob([svgTxt], { type: 'image/svg+xml' });
    outlineImg.src = URL.createObjectURL(blob);
  }

  // initial and change handler
  loadOutline(select.value);
  select.addEventListener('change', () => loadOutline(select.value));

  // tool (color & eraser) selection
  tools.forEach(btn => {
    btn.addEventListener('click', () => {
      tools.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      if (btn.classList.contains('eraser')) {
        isEraser = true;
      } else {
        isEraser = false;
        currentColor = btn.dataset.color;
      }
    });
  });
  // default select first color
  tools[0].classList.add('selected');

  // drawing handlers on fg layer
  function startDraw(e) {
    drawing = true;
    draw(e);
  }
  function endDraw() {
    drawing = false;
    fgCtx.beginPath();
  }
  function draw(e) {
    if (!drawing) return;
    const rect = fgCanvas.getBoundingClientRect();
    const x = ((e.touches ? e.touches[0] : e).clientX - rect.left);
    const y = ((e.touches ? e.touches[0] : e).clientY - rect.top);

    fgCtx.globalCompositeOperation = isEraser ? 'destination-out' : 'source-over';
    fgCtx.strokeStyle = isEraser ? 'rgba(0,0,0,1)' : currentColor;
    fgCtx.lineWidth   = isEraser ? 20 : 8;
    fgCtx.lineCap     = 'round';

    fgCtx.lineTo(x, y);
    fgCtx.stroke();
    fgCtx.beginPath();
    fgCtx.moveTo(x, y);
  }

  ['mousedown','touchstart'].forEach(evt =>
    fgCanvas.addEventListener(evt, startDraw)
  );
  ['mouseup','mouseout','touchend','touchcancel'].forEach(evt =>
    fgCanvas.addEventListener(evt, endDraw)
  );
  ['mousemove','touchmove'].forEach(evt =>
    fgCanvas.addEventListener(evt, draw)
  );
});
