/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row as required
  const headerRow = ['Cards (cards19)'];

  // Get all immediate child card containers
  const cardDivs = element.querySelectorAll(':scope > div');

  // Build card rows
  const rows = Array.from(cardDivs).map(cardDiv => {
    // Defensive: find icon/image (first cell)
    let iconImg = null;
    // Find .icon div (should contain the img)
    const iconDiv = cardDiv.querySelector('.icon');
    if (iconDiv) {
      iconImg = iconDiv.querySelector('img');
    }
    // Defensive fallback: if no iconDiv, try any img
    if (!iconImg) {
      iconImg = cardDiv.querySelector('img');
    }
    // Defensive: if no image found, create empty span
    const iconCell = iconImg ? iconImg : document.createElement('span');

    // Text cell: find the p tag (description)
    let textCell = null;
    const p = cardDiv.querySelector('p');
    if (p) {
      // Optionally, if there was a heading, include it above p
      // In this HTML, there is no heading, so just use p
      textCell = p;
    } else {
      // Defensive fallback: use all text content
      textCell = document.createElement('span');
      textCell.textContent = cardDiv.textContent.trim();
    }
    return [iconCell, textCell];
  });

  // Compose table data
  const tableData = [headerRow, ...rows];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element
  element.replaceWith(block);
}
