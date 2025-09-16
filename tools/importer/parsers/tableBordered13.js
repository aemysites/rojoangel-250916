/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row
  const headerRow = ['Table (bordered, tableBordered13)'];

  // Get all immediate children that represent each Q&A row
  const rows = [];
  const dividers = element.querySelectorAll(':scope > .divider');

  // Defensive: If no .divider children, fallback to all direct children
  const blocks = dividers.length ? dividers : element.querySelectorAll(':scope > div');

  // Each block is a Q&A pair (question + answer)
  blocks.forEach((block) => {
    // Each block contains a .grid-layout with two children: heading and paragraph
    const grid = block.querySelector('.grid-layout');
    if (grid) {
      // Defensive: Get direct children of grid
      const cells = Array.from(grid.children);
      // Typically: [heading, paragraph]
      if (cells.length >= 2) {
        rows.push([cells[0], cells[1]]);
      } else if (cells.length === 1) {
        // If only one child, fill second cell with empty string
        rows.push([cells[0], '']);
      }
    }
  });

  // Build table cells array
  const cells = [headerRow, ...rows];

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with the new table
  element.replaceWith(table);
}
