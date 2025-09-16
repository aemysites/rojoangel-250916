/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get direct children by tag name
  function getDirectChild(parent, tag) {
    return Array.from(parent.children).find(child => child.tagName.toLowerCase() === tag);
  }

  // 1. Header row
  const headerRow = ['Hero (hero39)'];

  // 2. Background image row
  let backgroundImg = null;
  // Find the image inside the first grid cell
  const gridDivs = element.querySelectorAll(':scope > div > div');
  if (gridDivs.length > 0) {
    const img = gridDivs[0].querySelector('img');
    if (img) backgroundImg = img;
  }
  // Defensive fallback: look for any img in the block
  if (!backgroundImg) {
    backgroundImg = element.querySelector('img');
  }
  const imageRow = [backgroundImg ? backgroundImg : ''];

  // 3. Content row: Headline, subheading, CTA
  let contentCell = [];
  // The second grid cell contains the text content
  if (gridDivs.length > 1) {
    const contentGrid = gridDivs[1].querySelector('.w-layout-grid');
    if (contentGrid) {
      // Headline
      const h1 = contentGrid.querySelector('h1');
      if (h1) contentCell.push(h1);
      // Subheading (paragraph)
      const paragraph = contentGrid.querySelector('p');
      if (paragraph) contentCell.push(paragraph);
      // CTA (button link)
      const buttonGroup = contentGrid.querySelector('.button-group');
      if (buttonGroup) {
        const ctaLink = buttonGroup.querySelector('a');
        if (ctaLink) contentCell.push(ctaLink);
      }
    }
  }
  // Defensive fallback: look for h1, p, a anywhere in the block
  if (contentCell.length === 0) {
    const h1 = element.querySelector('h1');
    if (h1) contentCell.push(h1);
    const p = element.querySelector('p');
    if (p) contentCell.push(p);
    const a = element.querySelector('a');
    if (a) contentCell.push(a);
  }
  const contentRow = [contentCell.length ? contentCell : ''];

  // Compose table rows
  const cells = [
    headerRow,
    imageRow,
    contentRow
  ];

  // Create and replace block
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
