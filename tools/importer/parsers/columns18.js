/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid
  const children = Array.from(grid.children);

  // Identify left (intro), right (contacts), and image
  let leftCol = null;
  let rightCol = null;
  let imgCol = null;

  children.forEach((child) => {
    if (child.tagName === 'DIV' && !leftCol) {
      leftCol = child;
    } else if (child.tagName === 'UL' && !rightCol) {
      rightCol = child;
    } else if (child.tagName === 'IMG' && !imgCol) {
      imgCol = child;
    }
  });

  if (!leftCol || !rightCol || !imgCol) return;

  // Build table rows
  const headerRow = ['Columns (columns18)'];
  const secondRow = [leftCol, rightCol];
  // Remove the empty cell in the third row (no unnecessary empty columns)
  const thirdRow = [imgCol, rightCol.cloneNode(false)]; // Use an empty node for structure

  // Compose table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    secondRow,
    thirdRow,
  ], document);

  element.replaceWith(table);
}
