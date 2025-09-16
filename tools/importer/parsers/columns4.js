/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: ensure element exists and is a container with children
  if (!element || !element.children || element.children.length === 0) return;

  // Block header row (required)
  const headerRow = ['Columns (columns4)'];

  // Get all immediate children (these are the column wrappers)
  const columnDivs = Array.from(element.querySelectorAll(':scope > div'));

  // For this block, each column is a div containing one img (per HTML structure)
  // We want one row, with each cell containing the image from its column
  const imagesRow = columnDivs.map((colDiv) => {
    // Defensive: find the first img inside the column div
    const img = colDiv.querySelector('img');
    if (img) return img;
    // If no img, fallback to the entire div (shouldn't happen in this HTML)
    return colDiv;
  });

  // Compose table rows
  const rows = [headerRow, imagesRow];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new table block
  element.replaceWith(table);
}
