/* global WebImporter */
export default function parse(element, { document }) {
  // Get all direct child divs (each is a column)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // Always use the required header row
  const headerRow = ['Columns (columns38)'];

  // Each column's content: use the <img> element directly if present
  const contentRow = columns.map(col => {
    const img = col.querySelector('img');
    if (img) return img; // Reference the image element directly
    // If no image, return the column div (should not happen in this case)
    return col;
  });

  // Create the table with the correct structure
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original element with the table
  element.replaceWith(table);
}
