/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row
  const headerRow = ['Table (bordered, tableBordered13)'];
  const rows = [headerRow];

  // Defensive: get all immediate child divs (each is a Q&A row)
  const qaDivs = element.querySelectorAll(':scope > div');

  qaDivs.forEach((qaDiv) => {
    // Each qaDiv contains a .divider > .w-layout-grid > [heading, rich-text]
    const grid = qaDiv.querySelector('.w-layout-grid');
    if (!grid) return;
    // Get the two columns: heading and answer
    const children = grid.querySelectorAll(':scope > div');
    if (children.length < 2) return;
    const question = children[0]; // heading
    const answer = children[1];   // rich text
    rows.push([question, answer]);
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(table);
}
