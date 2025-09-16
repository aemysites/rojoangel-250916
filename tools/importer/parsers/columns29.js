/* global WebImporter */
export default function parse(element, { document }) {
  // Get all immediate children (columns)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // Prepare the header row as specified
  const headerRow = ['Columns (columns29)'];

  // Prepare the columns row: each cell is the content of a column
  const columnsRow = columns.map((col) => {
    // If the column is a wrapper (e.g., .utility-aspect-1x1), include all its children
    // Defensive: If empty, return an empty string
    if (col.children.length === 0) {
      return '';
    }
    // If only one child, use it directly
    if (col.children.length === 1) {
      return col.firstElementChild;
    }
    // If multiple children, include them all
    return Array.from(col.children);
  });

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow
  ], document);

  // Replace the original element with the new block table
  element.replaceWith(table);
}
