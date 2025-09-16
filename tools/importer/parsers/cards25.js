/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: Extracts image and text content for a card
  function extractCardContent(cardDiv) {
    // Find the first img (mandatory)
    const img = cardDiv.querySelector('img');
    // Find the text container (may be nested)
    let textContainer = null;
    // Search for a div with padding or a heading
    textContainer = cardDiv.querySelector('.utility-padding-all-2rem, h3, p');
    // If not found, fallback to the cardDiv itself
    if (!textContainer) textContainer = cardDiv;
    // Extract heading (h3) and description (p)
    let heading = textContainer.querySelector('h3');
    let desc = textContainer.querySelector('p');
    // Defensive: If no heading or desc, try direct children
    if (!heading) heading = cardDiv.querySelector('h3');
    if (!desc) desc = cardDiv.querySelector('p');
    // Compose text cell
    const textCell = [];
    if (heading) textCell.push(heading);
    if (desc) textCell.push(desc);
    return [img, textCell];
  }

  // Get all direct children (cards)
  const cardDivs = Array.from(element.querySelectorAll(':scope > div'));

  // Only keep divs that contain an image (cards)
  const cardRows = cardDivs
    .filter(div => div.querySelector('img'))
    .map(extractCardContent)
    .filter(([img, text]) => img && text.length > 0);

  // Table header
  const headerRow = ['Cards (cards25)'];

  // Compose table data
  const tableData = [headerRow, ...cardRows];

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element
  element.replaceWith(block);
}
