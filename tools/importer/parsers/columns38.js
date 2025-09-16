/* global WebImporter */
export default function parse(element, { document }) {
  // Get all direct children (columns)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // Each column contains an image; reference the <img> element directly
  const cells = columns.map(col => {
    const img = col.querySelector('img');
    return img || col; // fallback: reference the column if no img
  });

  // Table header must match target block name exactly
  const headerRow = ['Columns (columns38)'];
  const contentRow = cells;

  // Create the table using WebImporter.DOMUtils.createTable
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
