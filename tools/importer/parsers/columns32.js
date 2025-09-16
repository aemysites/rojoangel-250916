/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid-layout div (the main columns container)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get the two columns: first is image, second is content
  // Defensive: allow for possible reordering
  let imgCol = null;
  let contentCol = null;
  const children = Array.from(grid.children);
  for (const child of children) {
    if (child.tagName === 'IMG') {
      imgCol = child;
    } else {
      contentCol = child;
    }
  }
  if (!imgCol || !contentCol) return;

  // --- Build the table rows ---
  const headerRow = ['Columns (columns32)'];

  // First column: the image
  const col1 = imgCol;

  // Second column: all content (eyebrow, tag, heading, author/date)
  // We'll use the entire contentCol div for resilience
  const col2 = contentCol;

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    [col1, col2],
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
