/* global WebImporter */
export default function parse(element, { document }) {
  if (!element || !element.matches('header.section')) return;

  // Header row
  const headerRow = ['Hero (hero20)'];

  // Background image row: use only the first image as background
  let bgImg = '';
  const grid = element.querySelector('.ix-hero-scale-3x-to-1x .grid-layout');
  if (grid) {
    const firstImg = grid.querySelector('img');
    if (firstImg) bgImg = firstImg;
  }
  const imagesRow = [bgImg ? bgImg : ''];

  // Content row: title, subheading, CTA (as links)
  const contentContainer = element.querySelector('.ix-hero-scale-3x-to-1x-content .container');
  const contentRowContent = [];
  if (contentContainer) {
    const h1 = contentContainer.querySelector('h1');
    if (h1) contentRowContent.push(h1);
    const subheading = contentContainer.querySelector('p.subheading');
    if (subheading) contentRowContent.push(subheading);
    const buttonGroup = contentContainer.querySelector('.button-group');
    if (buttonGroup) {
      const links = buttonGroup.querySelectorAll('a');
      if (links.length) {
        // Only push actual <a> elements, not arrays or strings
        links.forEach(link => contentRowContent.push(link));
      }
    }
  }
  const contentRow = [contentRowContent.length ? contentRowContent : ''];

  const cells = [
    headerRow,
    imagesRow,
    contentRow,
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
