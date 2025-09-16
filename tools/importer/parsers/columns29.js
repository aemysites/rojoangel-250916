/* global WebImporter */
export default function parse(element, { document }) {
  // Get all immediate children (each column)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // Each child div contains an image inside another div
  // We'll put each top-level child div as a column cell
  const headerRow = ['Columns (columns29)'];
  const contentRow = columns.map(col => col);

  // Compose table data
  const tableData = [headerRow, contentRow];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element
  element.replaceWith(block);
}
