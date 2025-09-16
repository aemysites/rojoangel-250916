/* global WebImporter */
export default function parse(element, { document }) {
  // Get all direct children of the main grid
  const grid = element.querySelector('.grid-layout.container');
  let contentContainer = null;
  let imageEl = null;

  // Find the image (background asset)
  // The image is a direct child of the top-level grid
  imageEl = element.querySelector('img');

  // Find the content container (contains heading, paragraph, buttons)
  contentContainer = grid ? grid.querySelector('.section') : null;

  // Extract heading (h2 or h1)
  let heading = null;
  if (contentContainer) {
    heading = contentContainer.querySelector('h2, h1');
  }

  // Extract subheading (first paragraph in .rich-text)
  let subheading = null;
  if (contentContainer) {
    const richText = contentContainer.querySelector('.rich-text, .w-richtext');
    if (richText) {
      subheading = richText.querySelector('p');
    }
  }

  // Extract CTA buttons (all <a> in .button-group)
  let ctaGroup = null;
  if (contentContainer) {
    ctaGroup = contentContainer.querySelector('.button-group');
  }

  // Compose the 3 rows
  const headerRow = ['Hero (hero5)'];
  const imageRow = [imageEl ? imageEl : ''];
  // Compose content row: heading, subheading, CTA
  const contentRow = [];
  const contentElements = [];
  if (heading) contentElements.push(heading);
  if (subheading) contentElements.push(subheading);
  if (ctaGroup) contentElements.push(ctaGroup);
  contentRow.push(contentElements);

  // Build the table
  const cells = [
    headerRow,
    imageRow,
    contentRow
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(table);
}
