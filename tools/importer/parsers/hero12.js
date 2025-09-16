/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to find direct children by class
  function findDirectChildByClass(parent, className) {
    return Array.from(parent.children).find(child => child.classList.contains(className));
  }

  // 1. Header row
  const headerRow = ['Hero (hero12)'];

  // 2. Background image row
  // The main background image is in the first grid cell (cover-image, utility-position-absolute)
  let backgroundImg = null;
  const gridDivs = element.querySelectorAll(':scope > div > div');
  // Defensive: find img with class 'cover-image utility-position-absolute' (background)
  for (const div of gridDivs) {
    const img = div.querySelector('img.cover-image.utility-position-absolute');
    if (img) {
      backgroundImg = img;
      break;
    }
  }
  // If not found, fallback to first img
  if (!backgroundImg) {
    backgroundImg = element.querySelector('img');
  }
  const backgroundRow = [backgroundImg ? backgroundImg : ''];

  // 3. Content row (headline, subheading, cta)
  // The content is in the second grid cell, inside .card-body
  let contentCell = document.createElement('div');
  const contentDiv = Array.from(gridDivs).find(div => div.classList.contains('container'));
  if (contentDiv) {
    const cardBody = contentDiv.querySelector('.card-body');
    if (cardBody) {
      // The inner grid has 3 columns visually, but for this block, we want headline/subhead/cta only
      // Find headline
      const headline = cardBody.querySelector('h2');
      if (headline) contentCell.appendChild(headline);
      // Find subheading paragraphs (with icons)
      const verticalFlex = cardBody.querySelector('.flex-vertical');
      if (verticalFlex) {
        // Each flex-horizontal contains icon + p
        const rows = verticalFlex.querySelectorAll('.flex-horizontal');
        rows.forEach(row => {
          // Find the paragraph
          const p = row.querySelector('p');
          if (p) contentCell.appendChild(p);
        });
      }
      // Find CTA button
      const buttonGroup = cardBody.querySelector('.button-group');
      if (buttonGroup) {
        const button = buttonGroup.querySelector('a');
        if (button) contentCell.appendChild(button);
      }
    }
  }
  const contentRow = [contentCell];

  // Compose table
  const cells = [
    headerRow,
    backgroundRow,
    contentRow,
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace element
  element.replaceWith(table);
}
