/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row
  const headerRow = ['Hero (hero6)'];

  // Find the background image (first <img> in the header)
  const bgImg = element.querySelector('img');
  const bgImgCell = bgImg ? bgImg : '';

  // Find the card content (headline, subheading, CTA)
  const card = element.querySelector('.card');
  const cardCellContent = [];
  if (card) {
    // Headline (h1)
    const h1 = card.querySelector('h1');
    if (h1) cardCellContent.push(h1);
    // Subheading (p.subheading)
    const subheading = card.querySelector('p.subheading');
    if (subheading) cardCellContent.push(subheading);
    // CTA buttons (button-group)
    const buttonGroup = card.querySelector('.button-group');
    if (buttonGroup) cardCellContent.push(buttonGroup);
  }
  // If nothing found, use empty string
  const cardCell = cardCellContent.length ? cardCellContent : '';

  // Compose table rows
  const rows = [
    headerRow,
    [bgImgCell],
    [cardCell]
  ];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
