/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid-layout container
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all immediate children of the grid
  const gridChildren = Array.from(grid.querySelectorAll(':scope > *'));

  // Identify columns and image
  const leftCol = gridChildren.find((el) => el.tagName === 'DIV' && el.querySelector('h2,h3,p'));
  const rightCol = gridChildren.find((el) => el.tagName === 'UL');
  const image = gridChildren.find((el) => el.tagName === 'IMG');

  if (!leftCol || !rightCol || !image) return;

  // Table header
  const headerRow = ['Columns (columns18)'];

  // Compose the columns row
  const columnsRow = [leftCol, rightCol];
  // The image row must have the same number of columns as columnsRow, but no empty columns allowed.
  // Place the image in the first column, and the second column should also have content or be omitted.
  // Per feedback, if only one cell is needed, only one column should be present in the row.
  const imageRow = [image];

  // Build table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow,
    imageRow,
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
