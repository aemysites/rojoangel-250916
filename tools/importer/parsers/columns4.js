/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Columns (columns4)'];

  // Defensive: get all immediate child divs (each is a column)
  const columnDivs = Array.from(element.querySelectorAll(':scope > div'));

  // Each div should contain one image (per source HTML)
  // We'll put each image directly into its own cell
  const imagesRow = columnDivs.map(div => {
    // Find the image inside the div
    const img = div.querySelector('img');
    // Defensive: only add if found
    return img || '';
  });

  // Compose the table rows
  const rows = [
    headerRow,
    imagesRow,
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}
