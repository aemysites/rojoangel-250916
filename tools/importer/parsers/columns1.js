/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout that contains the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get the columns (should be two: image and content)
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // Reference the actual DOM nodes for each column
  const imageCol = columns[0];
  const contentCol = columns[1];

  // Table header must match the target block name exactly
  const headerRow = ['Columns (columns1)'];
  // Second row: each column's content as a cell
  const columnsRow = [imageCol, contentCol];

  // Create the table using WebImporter.DOMUtils.createTable
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow,
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
