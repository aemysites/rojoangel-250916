/* global WebImporter */
export default function parse(element, { document }) {
  // Get all immediate child <a> elements (each is a card)
  const cards = Array.from(element.querySelectorAll(':scope > a'));

  // Table header row
  const headerRow = ['Cards (cards33)'];
  const rows = [headerRow];

  cards.forEach(card => {
    // Image (mandatory)
    const img = card.querySelector('img');

    // Find the content container (the first div after the image)
    let textContentDiv = null;
    if (img) {
      let next = img.nextElementSibling;
      while (next && next.nodeType === 3) next = next.nextSibling; // skip text nodes
      if (next && next.tagName === 'DIV') textContentDiv = next;
    }
    if (!textContentDiv) {
      // fallback: first div inside card after img
      const divs = Array.from(card.querySelectorAll('div'));
      textContentDiv = divs.length > 0 ? divs[0] : null;
    }

    // Compose the text cell content
    const textCellContent = [];
    if (textContentDiv) {
      // Tag and time (optional)
      const tagRow = textContentDiv.querySelector('.flex-horizontal');
      if (tagRow) {
        const tag = tagRow.querySelector('.tag');
        const time = tagRow.querySelector('.paragraph-sm');
        if (tag) textCellContent.push(tag);
        if (time) textCellContent.push(time);
      }
      // Heading (h3)
      const heading = textContentDiv.querySelector('h3');
      if (heading) textCellContent.push(heading);
      // Description (p)
      const description = textContentDiv.querySelector('p');
      if (description) textCellContent.push(description);
      // CTA ("Read")
      // Find the last direct child div (usually the CTA)
      const directDivs = Array.from(textContentDiv.children).filter(el => el.tagName === 'DIV');
      if (directDivs.length > 0) {
        const cta = directDivs[directDivs.length - 1];
        if (cta && cta !== tagRow && cta.textContent.trim().length > 0) {
          textCellContent.push(cta);
        }
      }
    }

    // Compose the row: [image, text cell]
    const row = [img, textCellContent];
    rows.push(row);
  });

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(block);
}
