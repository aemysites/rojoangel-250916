/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Columns (columns31)'];

  // Defensive: Find the grid layout container (should be the first child of .container)
  const grid = element.querySelector(':scope > .grid-layout');
  // If not found, fallback to all direct children
  const columns = grid ? Array.from(grid.children) : Array.from(element.children);

  // The columns block expects each column's content in a separate cell in the second row
  // We'll reference each column's content directly
  const contentCells = columns.map(col => col);

  // Compose the table rows
  const rows = [
    headerRow,
    contentCells
  ];

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}
