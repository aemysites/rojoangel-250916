/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract cards from a grid container
  function extractCardsFromGrid(grid) {
    const cards = [];
    grid.querySelectorAll(':scope > a').forEach((card) => {
      // Find image (mandatory)
      let img = card.querySelector('img');
      if (!img) return; // SKIP card if no image (image is mandatory)
      // Find heading
      let heading = card.querySelector('h1, h2, h3, h4');
      // Find description
      // Use all paragraph-like elements inside the card, not just .paragraph-sm
      const descs = Array.from(card.querySelectorAll('p, .paragraph-sm'));
      // If heading is also in descs, remove it
      if (heading) {
        descs.forEach((desc, i) => {
          if (desc === heading) descs.splice(i, 1);
        });
      }
      // Build text cell content
      const textContent = [];
      if (heading) textContent.push(heading);
      descs.forEach(desc => textContent.push(desc));
      // If there is a CTA (link inside the card that's not the card itself), add it
      const cta = Array.from(card.querySelectorAll('a')).find(a => a !== card);
      if (cta) textContent.push(cta);
      // If no heading and no desc, fallback to all text nodes inside card
      if (!heading && descs.length === 0) {
        const fallback = document.createElement('div');
        fallback.textContent = card.textContent.trim();
        if (fallback.textContent) textContent.push(fallback);
      }
      // Push row: [image, text content]
      cards.push([
        img,
        textContent.length ? textContent : '',
      ]);
    });
    return cards;
  }

  // Find all tab panes (each tab contains a grid of cards)
  const tabPanes = element.querySelectorAll(':scope > div');
  const rows = [
    ['Cards (cards23)']
  ];

  tabPanes.forEach((tabPane) => {
    if (tabPane.hasAttribute('data-hlx-imp-hidden-div')) return;
    const grid = tabPane.querySelector('.w-layout-grid');
    if (grid) {
      const cards = extractCardsFromGrid(grid);
      rows.push(...cards);
    }
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
