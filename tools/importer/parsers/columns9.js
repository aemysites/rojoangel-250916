/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the grid container (the columns)
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;

  // Get all immediate children of the grid (these are the columns)
  const columns = Array.from(grid.children);
  if (!columns.length) return;

  // Table header row
  const headerRow = ['Columns (columns9)'];

  // Table content row: each column cell contains the full column element
  const contentRow = columns.map(col => col);

  // Create the table block
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element with the table block
  element.replaceWith(table);
}
