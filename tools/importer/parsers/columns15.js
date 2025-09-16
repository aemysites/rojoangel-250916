/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid layout (the two columns: text and image)
  const container = element.querySelector('.container');
  let grid = null;
  if (container) {
    grid = container.querySelector('.w-layout-grid');
  }

  // Defensive: if grid not found, fallback to all direct children
  let leftCol = null;
  let rightCol = null;
  if (grid) {
    // The grid has two children: left (text/buttons), right (image)
    const gridChildren = Array.from(grid.children);
    leftCol = gridChildren.find((el) => el.tagName.toLowerCase() === 'div');
    rightCol = gridChildren.find((el) => el.tagName.toLowerCase() === 'img');
  }

  // Defensive: fallback if not found
  if (!leftCol) {
    leftCol = element.querySelector('h1')?.parentElement;
  }
  if (!rightCol) {
    rightCol = element.querySelector('img');
  }

  // Compose left column content: include all block-level elements in leftCol
  let leftContent = [];
  if (leftCol) {
    // Get all block-level elements (h1, h2, h3, p, ul, ol, .button-group, etc.)
    const blocks = leftCol.querySelectorAll('h1, h2, h3, h4, h5, h6, p, ul, ol, .button-group, a, button');
    if (blocks.length > 0) {
      leftContent = Array.from(blocks);
    } else {
      // fallback: all children
      leftContent = Array.from(leftCol.children);
    }
  }

  // Compose right column content: image (and any siblings, e.g., captions)
  let rightContent = [];
  if (rightCol) {
    // If the image has a parent with more content, include all siblings
    if (rightCol.parentElement && rightCol.parentElement.children.length > 1) {
      rightContent = Array.from(rightCol.parentElement.children);
    } else {
      rightContent = [rightCol];
    }
  }

  // Table header row
  const headerRow = ['Columns (columns15)'];
  // Table second row: two columns (left and right)
  const secondRow = [leftContent, rightContent];

  // Compose the table
  const cells = [headerRow, secondRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
