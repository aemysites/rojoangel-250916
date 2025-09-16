/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row as per block spec
  const headerRow = ['Cards (cards19)'];

  // Get all immediate card divs
  const cardDivs = Array.from(element.querySelectorAll(':scope > div'));

  // Each card is a row: [icon/image, text content]
  const rows = cardDivs.map(card => {
    // Find the icon/image (first .icon img)
    const iconDiv = card.querySelector('.icon');
    let imageOrIcon = null;
    if (iconDiv) {
      const img = iconDiv.querySelector('img');
      if (img) {
        imageOrIcon = img;
      } else {
        // fallback: use the iconDiv itself if no img
        imageOrIcon = iconDiv;
      }
    }

    // Find the text content (first <p> inside card)
    const textP = card.querySelector('p');
    let textContent = null;
    if (textP) {
      textContent = textP;
    } else {
      // fallback: use all text nodes in card
      textContent = document.createElement('span');
      textContent.textContent = card.textContent.trim();
    }

    return [imageOrIcon, textContent];
  });

  // Compose table data
  const tableData = [headerRow, ...rows];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element
  element.replaceWith(block);
}
