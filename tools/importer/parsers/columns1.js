/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Columns (columns1)'];

  // Defensive: Find the grid container (the main two-column layout)
  const grid = element.querySelector('.w-layout-grid');
  let leftCol, rightCol;

  if (grid) {
    // The grid has two children: [0]=img, [1]=content div
    const children = Array.from(grid.children);
    leftCol = children[0]; // image
    rightCol = children[1]; // text content
  } else {
    // Fallback: treat the whole element as a single cell
    leftCol = element;
    rightCol = '';
  }

  // Compose the columns row
  const columnsRow = [leftCol, rightCol];

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow,
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
