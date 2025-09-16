/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: safely get the first matching descendant by selector
  function safeQuerySelector(parent, selector) {
    return parent ? parent.querySelector(selector) : null;
  }

  // 1. Header row (always required)
  const headerRow = ['Hero (hero28)'];

  // 2. Background image row
  let bgImg = null;
  // Find the first image inside the header (background image)
  // The structure is: header > div.grid-layout > div > div > img
  const grid = safeQuerySelector(element, ':scope > .w-layout-grid');
  if (grid) {
    // The first child div contains the image
    const bgDiv = grid.children[0];
    if (bgDiv) {
      const parallaxDiv = safeQuerySelector(bgDiv, ':scope > div');
      if (parallaxDiv) {
        bgImg = safeQuerySelector(parallaxDiv, 'img');
      }
    }
  }
  const bgImgRow = [bgImg ? bgImg : ''];

  // 3. Content row (title, subheading, CTA)
  // The second grid child contains the text content
  let contentCell = [];
  if (grid && grid.children.length > 1) {
    const contentDiv = grid.children[1];
    // Find the container with the heading
    const container = safeQuerySelector(contentDiv, ':scope > .utility-margin-bottom-6rem');
    if (container) {
      // Title (h1)
      const h1 = safeQuerySelector(container, 'h1');
      if (h1) contentCell.push(h1);
      // Subheading: none in this example
      // CTA: check for a button or link in the button group
      const btnGroup = safeQuerySelector(container, '.button-group');
      if (btnGroup && btnGroup.children.length > 0) {
        // Add all buttons/links as CTA
        Array.from(btnGroup.children).forEach(child => contentCell.push(child));
      }
    }
  }
  // If no content, ensure cell is not empty (for robustness)
  if (contentCell.length === 0) contentCell = [''];
  const contentRow = [contentCell];

  // Compose the table
  const tableCells = [
    headerRow,
    bgImgRow,
    contentRow,
  ];

  const table = WebImporter.DOMUtils.createTable(tableCells, document);
  element.replaceWith(table);
}
