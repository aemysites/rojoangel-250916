/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card info from an anchor card element
  function extractCardInfo(cardEl) {
    // Find the image (mandatory)
    const imgDiv = cardEl.querySelector('div[class*="utility-aspect"]');
    let img = imgDiv ? imgDiv.querySelector('img') : null;
    // Defensive: if no image, create a placeholder span
    if (!img) {
      img = document.createElement('span');
      img.textContent = '[No Image]';
    }

    // Find the text content: heading, description, cta
    // Some cards have a wrapper div for text, some don't
    let textWrapper = cardEl.querySelector('.utility-padding-all-2rem');
    let heading, description, cta;
    if (textWrapper) {
      heading = textWrapper.querySelector('h2, h3, h4, h5, h6');
      description = textWrapper.querySelector('p');
      cta = textWrapper.querySelector('.button');
    } else {
      // Fallback: look for heading/desc directly under cardEl
      heading = cardEl.querySelector('h2, h3, h4, h5, h6');
      description = cardEl.querySelector('p');
      cta = cardEl.querySelector('.button');
    }

    // Compose text cell content
    const textContent = [];
    if (heading) textContent.push(heading);
    if (description) textContent.push(description);
    if (cta) textContent.push(cta);
    return [img, textContent];
  }

  // Find the main grid containing all cards
  const mainGrid = element.querySelector('.w-layout-grid.grid-layout');
  if (!mainGrid) return;

  // The first card is a direct child anchor, the rest are inside a nested grid
  const directCards = Array.from(mainGrid.children).filter(
    el => el.tagName === 'A'
  );
  const nestedGrid = mainGrid.querySelector('.w-layout-grid.grid-layout');
  let nestedCards = [];
  if (nestedGrid) {
    nestedCards = Array.from(nestedGrid.querySelectorAll('a.utility-link-content-block'));
  }

  // Compose all cards in order: first direct, then nested
  const allCards = [...directCards, ...nestedCards];

  // Table header
  const headerRow = ['Cards (cards37)'];
  const rows = [headerRow];

  // For each card, extract [image, text] and push as a row
  allCards.forEach(cardEl => {
    const [img, textContent] = extractCardInfo(cardEl);
    rows.push([img, textContent]);
  });

  // Create the table and replace the original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
