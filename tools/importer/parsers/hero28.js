/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to safely get direct children by selector
  function getDirectChild(parent, selector) {
    return Array.from(parent.children).find(child => child.matches(selector));
  }

  // 1. Header row
  const headerRow = ['Hero (hero28)'];

  // 2. Background image row
  let backgroundImg = null;
  // Find the grid-layout div
  const gridLayout = getDirectChild(element, 'div.grid-layout');
  if (gridLayout) {
    // The first child of grid-layout contains the image
    const bgImageContainer = gridLayout.children[0];
    if (bgImageContainer) {
      // Look for an img inside this container
      const img = bgImageContainer.querySelector('img');
      if (img) {
        backgroundImg = img;
      }
    }
  }
  const imageRow = [backgroundImg ? backgroundImg : ''];

  // 3. Content row (title, subtitle, CTA)
  let contentCell = document.createElement('div');
  // Find the container with text
  let textContainer = null;
  if (gridLayout && gridLayout.children.length > 1) {
    textContainer = gridLayout.children[1];
  }
  if (textContainer) {
    // Find the inner content div
    const innerContent = getDirectChild(textContainer, 'div.utility-margin-bottom-6rem');
    if (innerContent) {
      // Find the heading
      const h1 = innerContent.querySelector('h1');
      if (h1) contentCell.appendChild(h1);
      // Find CTA (button group)
      const buttonGroup = innerContent.querySelector('.button-group');
      if (buttonGroup && buttonGroup.children.length > 0) {
        // If there are buttons, append them
        Array.from(buttonGroup.children).forEach(btn => contentCell.appendChild(btn));
      }
    }
  }
  // Defensive: If nothing was appended, leave cell empty
  const contentRow = [contentCell.childNodes.length > 0 ? contentCell : ''];

  // Compose table rows
  const rows = [headerRow, imageRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
