/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid-layout container (the columns root)
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all direct children of the grid
  const children = Array.from(grid.children);
  // Defensive: expect at least 2 children (heading and content)
  if (children.length < 2) return;

  // First column: heading/title (keep original element for semantic meaning)
  const heading = children[0];
  // Second column: right column (paragraph + button)
  const rightCol = children[1];

  // Table header row must match block name exactly
  const headerRow = ['Columns (columns14)'];
  // Table content row: 2 columns, left is heading, right is content
  const contentRow = [heading, rightCol];

  // Create the table using DOMUtils
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
