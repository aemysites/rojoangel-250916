/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main container
  const container = element.querySelector('.container');
  if (!container) return;

  // Find the first and second grids
  const grids = container.querySelectorAll(':scope > .w-layout-grid');
  const firstGrid = grids[0];
  const secondGrid = grids[1];

  // --- First row: block name ---
  const headerRow = ['Columns (columns11)'];

  // --- Second row: headline + intro (left), author/meta/button (right) ---
  let leftColContent = [];
  let rightColContent = [];
  if (firstGrid) {
    const gridChildren = firstGrid.querySelectorAll(':scope > div');
    if (gridChildren[0]) {
      leftColContent.push(gridChildren[0]);
    }
    if (gridChildren[1]) {
      rightColContent.push(gridChildren[1]);
    }
  }
  const secondRow = [leftColContent, rightColContent];

  // --- Third row: images side by side ---
  let thirdRow = [];
  if (secondGrid) {
    const imageDivs = secondGrid.querySelectorAll(':scope > div');
    imageDivs.forEach(div => {
      thirdRow.push(div);
    });
  }

  // Only add third row if it has the same number of columns as second row
  const cells = [
    headerRow,
    secondRow
  ];
  if (thirdRow.length === secondRow.length) {
    cells.push(thirdRow);
  }

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
