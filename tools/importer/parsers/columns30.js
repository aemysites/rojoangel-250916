/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid layout inside the section
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid (these are the columns)
  const columns = Array.from(grid.children);

  // Defensive: If no columns, do nothing
  if (!columns.length) return;

  // Compose the table rows
  const headerRow = ['Columns (columns30)'];
  const columnsRow = columns;

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow,
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
