/* global WebImporter */
export default function parse(element, { document }) {
  // Find the top-level grid columns
  const gridDivs = element.querySelectorAll(':scope > div');

  // Row 2: Background image (first column)
  let bgImg = null;
  if (gridDivs.length > 0) {
    const img = gridDivs[0].querySelector('img');
    if (img) bgImg = img;
  }

  // Row 3: Title, Subheading, Features, Call-to-Action (extract actual content)
  let contentCell = [];
  if (gridDivs.length > 1) {
    const cardBody = gridDivs[1].querySelector('.card-body');
    if (cardBody) {
      // Extract headline
      const headline = cardBody.querySelector('h2');
      if (headline) contentCell.push(headline);

      // Extract all feature rows (icon + text)
      const featureRows = cardBody.querySelectorAll('.flex-horizontal.flex-gap-xxs');
      featureRows.forEach(row => {
        // Include icon (if present)
        const iconDiv = row.querySelector('.icon-small');
        if (iconDiv) contentCell.push(iconDiv);
        // Include paragraph
        const p = row.querySelector('p');
        if (p) contentCell.push(p);
      });

      // Extract CTA button
      const cta = cardBody.querySelector('.button-group a');
      if (cta) contentCell.push(cta);
    }
  }

  // Compose table rows
  const headerRow = ['Hero (hero12)'];
  const imageRow = [bgImg ? bgImg : ''];
  // Always include third row, even if empty
  const contentRow = [contentCell.length ? contentCell : ''];

  const cells = [headerRow, imageRow, contentRow];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
