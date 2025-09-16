/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout containing the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid (should be columns)
  const columns = Array.from(grid.children);
  if (columns.length < 2) return; // Expect at least 2 columns for a columns block

  // Prepare the header row
  const headerRow = ['Columns (columns32)'];

  // Prepare the second row: each cell is a column's content
  // Column 1: image
  const col1 = columns[0];
  let col1Content;
  if (col1.tagName === 'IMG') {
    col1Content = col1;
  } else {
    col1Content = Array.from(col1.childNodes);
  }

  // Column 2: structured content (text, tags, heading, author info)
  const col2 = columns[1];
  let col2Content = [];
  if (col2) {
    col2Content = Array.from(col2.childNodes);
  }

  // Build the table rows
  const rows = [
    headerRow,
    [col1Content, col2Content]
  ];

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block
  element.replaceWith(block);
}
