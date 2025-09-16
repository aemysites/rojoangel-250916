/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  const gridChildren = Array.from(grid.children);

  // Defensive: Expecting 4 children, but allow for variations
  // 0: left text (Taylor Brooks)
  // 1: vertical tags
  // 2: heading (Trends made for living bold)
  // 3: rich text description

  // Left column: name + tags
  const leftCol = document.createElement('div');
  if (gridChildren[0]) leftCol.appendChild(gridChildren[0]);
  if (gridChildren[1]) leftCol.appendChild(gridChildren[1]);

  // Middle column: heading
  const middleCol = gridChildren[2] ? gridChildren[2] : document.createElement('div');

  // Right column: rich text description
  const rightCol = gridChildren[3] ? gridChildren[3] : document.createElement('div');

  // Table header
  const headerRow = ['Columns (columns30)'];
  // Table columns row (3 columns)
  const columnsRow = [leftCol, middleCol, rightCol];

  // Build table
  const cells = [headerRow, columnsRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(table);
}
