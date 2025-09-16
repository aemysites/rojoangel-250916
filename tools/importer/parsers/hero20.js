/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to find the background image grid
  function getBackgroundImageGrid(el) {
    // Find the grid with multiple images
    return el.querySelector('.grid-layout.desktop-3-column');
  }

  // Helper to collect all images in the grid
  function getAllImagesFromGrid(grid) {
    if (!grid) return [];
    return Array.from(grid.querySelectorAll('img'));
  }

  // Helper to find the content container (title, subheading, CTA)
  function getContentContainer(el) {
    return el.querySelector('.container.small-container');
  }

  // ---
  // 1. Header row
  const headerRow = ['Hero (hero20)'];

  // 2. Background image row (all images as a collage)
  const grid = getBackgroundImageGrid(element);
  const images = getAllImagesFromGrid(grid);
  // Defensive: only add if images exist
  const backgroundRow = [images.length ? images : ''];

  // 3. Content row (title, subheading, CTA)
  const contentContainer = getContentContainer(element);
  const contentRow = [contentContainer ? contentContainer : ''];

  // 4. Compose table
  const cells = [
    headerRow,
    backgroundRow,
    contentRow,
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
