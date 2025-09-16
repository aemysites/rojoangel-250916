/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid containing the two columns
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;

  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // LEFT COLUMN: heading, subheading, buttons
  const leftCol = columns[0];
  const leftContent = [];
  // Heading
  const heading = leftCol.querySelector('h1');
  if (heading) leftContent.push(heading);
  // Subheading
  const subheading = leftCol.querySelector('p');
  if (subheading) leftContent.push(subheading);
  // Button group
  const buttonGroup = leftCol.querySelector('.button-group');
  if (buttonGroup) leftContent.push(buttonGroup);

  // RIGHT COLUMN: images
  const rightCol = columns[1];
  const imageGrid = rightCol.querySelector('.w-layout-grid');
  const rightContent = [];
  if (imageGrid) {
    Array.from(imageGrid.querySelectorAll('img')).forEach(img => {
      rightContent.push(img);
    });
  }

  // Compose the table
  const headerRow = ['Columns (columns36)'];
  const contentRow = [leftContent, rightContent];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  element.replaceWith(table);
}
