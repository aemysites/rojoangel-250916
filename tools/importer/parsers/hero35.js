/* global WebImporter */
export default function parse(element, { document }) {
  // Header row
  const headerRow = ['Hero (hero35)'];

  // Background image row: none present in this HTML, so leave as empty string
  const imageRow = [''];

  // Content row: gather heading, subheading, CTA
  let contentCell = [''];
  const grid = element.querySelector('.grid-layout');
  if (grid) {
    const gridChildren = grid.querySelectorAll(':scope > *');
    if (gridChildren.length > 0) {
      // Compose a single div to wrap all content for the cell
      const wrapper = document.createElement('div');
      gridChildren.forEach(child => wrapper.appendChild(child.cloneNode(true)));
      contentCell = [wrapper];
    }
  }

  // Compose table rows: header, image (empty), content
  const rows = [
    headerRow,
    imageRow,
    contentCell,
  ];
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
