/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout container
  const grid = element.querySelector('.grid-layout');
  let columns = [];

  if (grid) {
    // Each direct child of .grid-layout is a column
    columns = Array.from(grid.children);
  }

  // Defensive fallback: if no columns found, treat the whole element as one column
  if (columns.length === 0) {
    columns = [element];
  }

  // Table header row must match the target block name exactly
  const headerRow = ['Columns (columns3)'];

  // Table content row: each column's content as a cell
  const contentRow = columns.map((col) => col);

  // Create the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
