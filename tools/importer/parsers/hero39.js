/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: get immediate child divs
  const topDivs = element.querySelectorAll(':scope > div');
  let bgImg = null;
  let content = null;

  // Defensive: find image and content containers
  for (const div of topDivs) {
    // Find the image container (contains img)
    if (div.querySelector('img')) {
      bgImg = div.querySelector('img');
    }
    // Find the content container (contains h1, p, a, etc)
    if (div.querySelector('h1')) {
      content = div;
    }
  }

  // Fallback: If not found, try deeper
  if (!bgImg) {
    bgImg = element.querySelector('img');
  }
  if (!content) {
    content = element.querySelector('h1')?.closest('div');
  }

  // Compose content cell: heading, subheading, CTA
  let contentCell = [];
  if (content) {
    // Find h1, p, a (CTA)
    const h1 = content.querySelector('h1');
    // Subheading: look for p or div with paragraph-lg
    const subheading = content.querySelector('p, .paragraph-lg');
    // CTA: look for a.button or .button-group a
    let cta = content.querySelector('a');
    // Compose
    if (h1) contentCell.push(h1);
    if (subheading) contentCell.push(subheading);
    if (cta) contentCell.push(cta);
  }

  // Build table rows
  const headerRow = ['Hero (hero39)'];
  const imageRow = [bgImg ? bgImg : ''];
  const contentRow = [contentCell.length ? contentCell : ''];

  const rows = [headerRow, imageRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
