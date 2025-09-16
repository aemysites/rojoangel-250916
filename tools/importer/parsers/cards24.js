/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract the image from the card
  function getCardImage(card) {
    // The image is inside the first div of the card
    const imgDiv = card.querySelector('div.utility-aspect-2x3');
    if (imgDiv) {
      const img = imgDiv.querySelector('img');
      if (img) return img;
    }
    return null;
  }

  // Helper to extract the text content from the card
  function getCardTextContent(card) {
    // Tag and date
    const metaDiv = card.querySelector('div.flex-horizontal');
    let meta = '';
    if (metaDiv) {
      // Tag (first div)
      const tag = metaDiv.querySelector('.tag');
      // Date (second div)
      const date = metaDiv.querySelector('.paragraph-sm');
      if (tag && date) {
        meta = `<span>${tag.textContent.trim()}</span> <span>${date.textContent.trim()}</span>`;
      } else if (tag) {
        meta = `<span>${tag.textContent.trim()}</span>`;
      } else if (date) {
        meta = `<span>${date.textContent.trim()}</span>`;
      }
    }

    // Title (h3)
    const heading = card.querySelector('h3');
    // Compose content
    const frag = document.createElement('div');
    if (meta) {
      const metaDivEl = document.createElement('div');
      metaDivEl.innerHTML = meta;
      frag.appendChild(metaDivEl);
    }
    if (heading) {
      // Use a heading element for semantic structure
      const h = document.createElement('h3');
      h.textContent = heading.textContent.trim();
      frag.appendChild(h);
    }
    return frag;
  }

  // Get all cards (direct children that are links)
  const cards = Array.from(element.querySelectorAll(':scope > a.utility-link-content-block'));

  // Build table rows
  const rows = [];
  // Header row
  rows.push(['Cards (cards24)']);

  // Card rows
  cards.forEach((card) => {
    const img = getCardImage(card);
    const textContent = getCardTextContent(card);
    rows.push([
      img || '',
      textContent
    ]);
  });

  // Create the table and replace the original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
