/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get all immediate child divs of the grid
  function getGridItems(grid) {
    return Array.from(grid.querySelectorAll(':scope > div'));
  }

  // Find the grid container that holds the images
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all grid items (each is a slide)
  const items = getGridItems(grid);

  // Table header row
  const headerRow = ['Carousel (carousel16)'];
  const rows = [headerRow];

  // For each grid item, extract the image and create a row
  items.forEach((item) => {
    // Find the image inside the grid item
    const img = item.querySelector('img');
    if (!img) return; // Defensive: skip if no image
    // Always include two columns: image and empty string (for text content)
    rows.push([img, '']);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
