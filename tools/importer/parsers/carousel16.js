/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: Get all immediate children of a given element matching selector
  function getDirectChildren(parent, selector) {
    return Array.from(parent.children).filter((el) => el.matches(selector));
  }

  // 1. Table header row
  const headerRow = ['Carousel (carousel16)'];
  const rows = [headerRow];

  // 2. Find the grid container with the images
  let grid;
  const centered = element.querySelector('.centered');
  if (centered) {
    grid = centered.querySelector('.grid-layout');
  }
  if (!grid) {
    grid = element.querySelector('.grid-layout');
  }
  if (!grid) return;

  // 3. For each image cell in the grid, create a row: [image, ''] (always two columns per row)
  const gridItems = getDirectChildren(grid, 'div');
  gridItems.forEach((item) => {
    const img = item.querySelector('img');
    if (img) {
      rows.push([img, '']); // Always two columns per row, second cell empty if no text
    }
  });

  // 4. Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // 5. Replace the original element
  element.replaceWith(table);
}
