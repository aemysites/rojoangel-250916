/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the grid layout container (the columns)
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get direct children of the grid (should be columns)
  const columns = Array.from(grid.children);
  // Defensive: Only proceed if there are at least two columns
  if (columns.length < 2) return;

  // Header row as specified
  const headerRow = ['Columns (columns14)'];

  // Build the columns row
  // Each cell is the full column element (h2 or div with content)
  const columnsRow = columns.map((col) => col);

  // Compose table data
  const cells = [headerRow, columnsRow];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block
  element.replaceWith(block);
}
