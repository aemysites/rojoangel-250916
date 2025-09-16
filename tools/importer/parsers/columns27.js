/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout (columns wrapper)
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get the two columns: left (text), right (image)
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // Use references to the actual DOM nodes, not clones
  const leftCol = columns[0];
  const rightCol = columns[1];

  // Build the table rows
  const headerRow = ['Columns (columns27)'];
  const contentRow = [leftCol, rightCol];

  // Create the block table using the DOMUtils helper
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the section with the table
  element.replaceWith(table);
}
