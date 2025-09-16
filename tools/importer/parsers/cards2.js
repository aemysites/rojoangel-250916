/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract image and text from a card anchor
  function extractCardContent(cardAnchor) {
    // Find image (first img in anchor or descendant)
    const img = cardAnchor.querySelector('img');
    // Find tag group (optional)
    const tagGroup = cardAnchor.querySelector('.tag-group');
    // Find heading (h3 or h4)
    const heading = cardAnchor.querySelector('h3, h4');
    // Find description (p)
    const description = cardAnchor.querySelector('p');
    // Compose text cell
    const textParts = [];
    if (tagGroup) textParts.push(tagGroup.cloneNode(true));
    if (heading) textParts.push(heading.cloneNode(true));
    if (description) textParts.push(description.cloneNode(true));
    // Defensive: if no img, skip this card (do not return a row)
    if (!img) return null;
    return [img.cloneNode(true), textParts];
  }

  // Get the grid layout container
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  const rows = [];

  // --- First card: Large left image, text below ---
  // The first child is a large anchor with image and text
  const firstCardAnchor = grid.children[0];
  if (firstCardAnchor && firstCardAnchor.matches('a')) {
    const firstCardImageDiv = firstCardAnchor.querySelector('.utility-aspect-1x1');
    const firstImg = firstCardImageDiv ? firstCardImageDiv.querySelector('img') : null;
    const firstTagGroup = firstCardAnchor.querySelector('.tag-group');
    const firstHeading = firstCardAnchor.querySelector('h3, h4');
    const firstDescription = firstCardAnchor.querySelector('p');
    const firstTextParts = [];
    if (firstTagGroup) firstTextParts.push(firstTagGroup.cloneNode(true));
    if (firstHeading) firstTextParts.push(firstHeading.cloneNode(true));
    if (firstDescription) firstTextParts.push(firstDescription.cloneNode(true));
    if (firstImg) rows.push([firstImg.cloneNode(true), firstTextParts]);
  }

  // --- Second column: vertical cards with images and text ---
  // The next sibling is a flex container with two card anchors
  const secondCol = grid.children[1];
  if (secondCol) {
    const secondColCards = Array.from(secondCol.querySelectorAll('a.utility-link-content-block'));
    secondColCards.forEach(cardAnchor => {
      const row = extractCardContent(cardAnchor);
      if (row) rows.push(row);
    });
  }

  // --- Third column: vertical cards with text only ---
  // The next sibling is a flex container with text-only cards
  // These do NOT have images/icons, so they must be omitted for this block

  // Compose table
  const headerRow = ['Cards (cards2)'];
  const table = WebImporter.DOMUtils.createTable([headerRow, ...rows], document);

  // Replace original element
  element.replaceWith(table);
}
