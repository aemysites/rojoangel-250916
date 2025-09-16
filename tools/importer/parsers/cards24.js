/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row as per block requirements
  const headerRow = ['Cards (cards24)'];
  const rows = [headerRow];

  // Defensive: select all direct <a> children (each is a card)
  const cards = element.querySelectorAll(':scope > a');

  cards.forEach((card) => {
    // --- IMAGE CELL ---
    // Find the image inside the card
    const imgWrapper = card.querySelector('.utility-aspect-2x3');
    let imgCell = '';
    if (imgWrapper) {
      const img = imgWrapper.querySelector('img');
      if (img) {
        imgCell = img;
      }
    }

    // --- TEXT CELL ---
    // Tag and date (optional, above heading)
    const tagRow = card.querySelector('.flex-horizontal');
    let tagDateFrag = document.createDocumentFragment();
    if (tagRow) {
      // Use a div for tag/date row
      const tagDateDiv = document.createElement('div');
      tagDateDiv.append(...Array.from(tagRow.childNodes));
      tagDateFrag.appendChild(tagDateDiv);
    }

    // Heading (title)
    const heading = card.querySelector('h3, .h4-heading');
    let headingElem = null;
    if (heading) {
      headingElem = heading;
    }

    // Compose text cell content
    const textCell = [];
    if (tagDateFrag.childNodes.length > 0) {
      textCell.push(tagDateFrag);
    }
    if (headingElem) {
      textCell.push(headingElem);
    }

    // Add the row to the table
    rows.push([imgCell, textCell]);
  });

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
