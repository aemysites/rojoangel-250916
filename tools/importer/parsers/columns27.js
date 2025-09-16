/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout (columns)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get immediate children of the grid (should be two: left content, right image)
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // Left column: rich content (text, heading, button)
  const leftCol = columns[0];
  // Right column: image
  const rightCol = columns[1];

  // Table header: must match block name exactly
  const headerRow = ['Columns (columns27)'];

  // Table second row: each cell is a reference to the original element (not cloned)
  const secondRow = [leftCol, rightCol];

  // Build table using WebImporter.DOMUtils.createTable
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    secondRow
  ], document);

  // Replace original element with the table
  element.replaceWith(table);
}
