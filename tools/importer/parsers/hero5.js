/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the main grid container
  const mainGrid = element.querySelector('.grid-layout.grid-gap-xxl');
  if (!mainGrid) return;

  // Find the image (background/hero visual)
  let imageEl = null;
  // Look for an <img> directly inside mainGrid
  const imgs = mainGrid.querySelectorAll('img');
  if (imgs.length > 0) {
    imageEl = imgs[0];
  }

  // Find the content block (headings, paragraph, CTA)
  let contentBlock = null;
  // Look for a child grid inside mainGrid
  const innerGrids = mainGrid.querySelectorAll('.grid-layout.container');
  if (innerGrids.length > 0) {
    // The first inner grid contains the content
    contentBlock = innerGrids[0];
  }

  // Defensive: Find the actual section with the heading, paragraph, and buttons
  let heroContent = null;
  if (contentBlock) {
    const possibleSections = contentBlock.querySelectorAll('.section');
    if (possibleSections.length > 0) {
      heroContent = possibleSections[0];
    }
  }

  // Compose the content cell for row 3: heading, paragraph, buttons
  let contentCell = [];
  if (heroContent) {
    // Heading
    const heading = heroContent.querySelector('h2');
    if (heading) contentCell.push(heading);
    // Paragraph
    const paragraph = heroContent.querySelector('.rich-text p');
    if (paragraph) contentCell.push(paragraph);
    // Buttons
    const buttonGroup = heroContent.querySelector('.button-group');
    if (buttonGroup) {
      // Add all buttons as links
      const buttons = buttonGroup.querySelectorAll('a');
      buttons.forEach(btn => contentCell.push(btn));
    }
  }

  // Table rows
  const headerRow = ['Hero (hero5)'];
  const imageRow = [imageEl ? imageEl : ''];
  const contentRow = [contentCell.length ? contentCell : ''];

  const cells = [headerRow, imageRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
