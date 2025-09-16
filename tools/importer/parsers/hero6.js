/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get direct children by tag name
  function getDirectChildByTag(parent, tagName) {
    return Array.from(parent.children).find(child => child.tagName.toLowerCase() === tagName.toLowerCase());
  }

  // 1. Header row
  const headerRow = ['Hero (hero6)'];

  // 2. Background image row
  let bgImg = null;
  // Find the image in the first grid cell
  const gridDivs = element.querySelectorAll(':scope > div > div');
  // Defensive: look for an img with class 'cover-image'
  for (const div of gridDivs) {
    const img = div.querySelector('img.cover-image');
    if (img) {
      bgImg = img;
      break;
    }
  }
  const imageRow = [bgImg ? bgImg : ''];

  // 3. Content row: title, subheading, CTA
  let contentCell = document.createElement('div');
  // Find the card with text and buttons
  let card = null;
  for (const div of gridDivs) {
    const maybeCard = div.querySelector('.card');
    if (maybeCard) {
      card = maybeCard;
      break;
    }
  }
  if (card) {
    // Extract heading
    const heading = card.querySelector('h1');
    if (heading) contentCell.appendChild(heading);
    // Extract subheading
    const subheading = card.querySelector('p');
    if (subheading) contentCell.appendChild(subheading);
    // Extract button group
    const buttonGroup = card.querySelector('.button-group');
    if (buttonGroup) {
      // Defensive: only include direct children that are links
      Array.from(buttonGroup.children).forEach(btn => {
        if (btn.tagName === 'A') contentCell.appendChild(btn);
      });
    }
  }
  const contentRow = [contentCell];

  // Compose table
  const cells = [headerRow, imageRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(table);
}
