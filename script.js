document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
      card.addEventListener('click', () => {
        const name = card.getAttribute('data-name');
        // Placeholder action: you can replace with actual module logic
        alert(`"${name}" module is coming soon!`);
      });
    });
  });
  