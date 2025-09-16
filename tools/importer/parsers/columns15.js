/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid layout (the two columns: left text, right image)
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;
  const gridChildren = Array.from(grid.children);

  // Defensive: find the text and image columns
  let leftCol = null;
  let rightCol = null;
  for (const child of gridChildren) {
    if (child.tagName.toLowerCase() === 'img') {
      rightCol = child;
    } else {
      leftCol = child;
    }
  }
  if (!leftCol || !rightCol) return;

  // Left column: include all content blocks
  const leftColContent = Array.from(leftCol.childNodes);

  // Right column: image
  const rightColContent = [rightCol];

  // Table header
  const headerRow = ['Columns (columns15)'];
  // Table columns row (2 columns)
  const columnsRow = [leftColContent, rightColContent];

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow,
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
