/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the grid container (columns)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid (these are columns)
  const columns = Array.from(grid.children);
  if (columns.length === 0) return;

  // Header row per spec
  const headerRow = ['Columns (columns9)'];

  // Each column cell will contain the full column element
  const contentRow = columns.map((col) => col);

  // Build table
  const cells = [headerRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(table);
}
