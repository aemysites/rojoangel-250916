/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row as required
  const headerRow = ['Hero (hero35)'];

  // Find the grid layout container (content row)
  const grid = element.querySelector('.grid-layout');
  let title = null;
  let subheading = null;
  let cta = null;

  if (grid) {
    // Get all direct children of the grid
    const gridChildren = grid.querySelectorAll(':scope > *');
    // The first child should contain the headings and subheading
    const contentBlock = gridChildren[0];
    if (contentBlock) {
      // Find heading (h2), subheading (p), etc.
      title = contentBlock.querySelector('h1, h2, h3, h4, h5, h6');
      subheading = contentBlock.querySelector('p');
    }
    // The second child should be the CTA link/button
    if (gridChildren.length > 1) {
      cta = gridChildren[1];
    }
  }

  // Compose the content cell for row 3
  const contentCell = [];
  if (title) contentCell.push(title);
  if (subheading) contentCell.push(subheading);
  if (cta) contentCell.push(cta);

  // Build the table rows
  const rows = [
    headerRow,
    [''], // Row 2: Background image (none in this HTML, so single empty cell)
    [contentCell], // Row 3: Title, subheading, CTA
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block
  element.replaceWith(block);
}
