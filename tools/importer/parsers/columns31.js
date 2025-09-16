/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Columns (columns31)'];

  // Defensive: find the grid-layout container (should be direct child of .container)
  const grid = element.querySelector(':scope > .grid-layout');
  if (!grid) return; // If missing, do nothing

  // Get all immediate children of the grid (these are the columns)
  const columns = Array.from(grid.querySelectorAll(':scope > div'));

  // For this block, each column is a cell in the second row
  // Each column may contain text, links, etc. Use the whole column element for resilience
  const contentRow = columns.map((col) => col);

  // Build the table data
  const cells = [headerRow, contentRow];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}
