/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the grid-layout container (the columns block)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all immediate children of the grid (these are the columns)
  const columns = Array.from(grid.children);

  // Prepare table rows
  const headerRow = ['Columns (columns3)'];

  // For this block, the second row should have as many columns as there are column elements in the grid
  // Each cell will contain the entire column's content
  const contentRow = columns.map((col) => col);

  // Create the block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
