/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as per block spec
  const headerRow = ['Cards (cards10)'];
  const rows = [headerRow];

  // Get all card links (each card is an <a> block)
  const cards = element.querySelectorAll(':scope > a.card-link');

  cards.forEach((card) => {
    // Image cell: find the first <img> inside the card
    const imageWrapper = card.querySelector('.utility-aspect-3x2');
    let imageCell = '';
    if (imageWrapper) {
      const img = imageWrapper.querySelector('img');
      if (img) imageCell = img;
    }

    // Text cell: collect tag, heading, paragraph, and CTA if present
    const textWrapper = card.querySelector('.utility-padding-all-1rem');
    let textCellElements = [];
    if (textWrapper) {
      // Tag (optional)
      const tag = textWrapper.querySelector('.tag-group');
      if (tag) textCellElements.push(tag);
      // Heading (h3)
      const heading = textWrapper.querySelector('h3');
      if (heading) textCellElements.push(heading);
      // Paragraph (description)
      const desc = textWrapper.querySelector('p');
      if (desc) textCellElements.push(desc);
      // CTA: if the card's href is not just '#' or '', add a link at the end
      const href = card.getAttribute('href');
      if (href && href !== '#' && href !== '') {
        // We'll use the heading text or "Learn more" as link text
        let linkText = 'Learn more';
        if (heading && heading.textContent) linkText = heading.textContent.trim();
        const cta = document.createElement('a');
        cta.href = href;
        cta.textContent = linkText;
        cta.setAttribute('style', 'display:block;margin-top:0.5em;');
        textCellElements.push(cta);
      }
    }
    // Defensive: fallback if text cell is empty
    if (textCellElements.length === 0) textCellElements = [card];

    rows.push([
      imageCell,
      textCellElements,
    ]);
  });

  // Create table and replace original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
