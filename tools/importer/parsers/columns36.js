/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: get the main grid layout containing columns
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;

  // Get the two main columns: left (text/buttons), right (images)
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // LEFT COLUMN: Heading, subheading, buttons
  const leftCol = columns[0];
  // We'll include all content from leftCol

  // RIGHT COLUMN: Images grid
  const rightCol = columns[1];
  // Defensive: find the nested grid containing images
  const imagesGrid = rightCol.querySelector('.w-layout-grid');
  let images = [];
  if (imagesGrid) {
    images = Array.from(imagesGrid.querySelectorAll('img'));
  }

  // Build the table rows
  const headerRow = ['Columns (columns36)'];

  // The second row: left column (all text/buttons), right column (all images)
  // For resilience, reference the full leftCol and images array
  const secondRow = [leftCol, images];

  // Assemble table
  const cells = [headerRow, secondRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(table);
}
