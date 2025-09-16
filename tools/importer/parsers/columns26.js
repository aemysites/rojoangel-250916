/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get immediate children of a node
  function getDirectChildrenByTag(parent, tagName) {
    return Array.from(parent.children).filter(el => el.tagName.toLowerCase() === tagName.toLowerCase());
  }

  // Find the main grid layout inside the section
  const container = element.querySelector('.container');
  if (!container) return;
  const mainGrid = container.querySelector('.grid-layout');
  if (!mainGrid) return;

  // Get all direct children of the main grid
  const gridChildren = Array.from(mainGrid.children);

  // Defensive: Find the two main columns visually represented in the screenshot
  // Left column: heading, testimonial text, divider, avatar, name/title
  // Right column: (empty in source, but in screenshot, right side has logo)
  // In source HTML, the right column content is missing, so we only use the left content

  // The testimonial block is visually split into two columns:
  // 1. Left: Heading, testimonial, avatar, name/title
  // 2. Right: (logo, which is not present in source HTML)

  // We'll organize the left column content into one cell, and the right cell will be empty
  // If the logo is present in future HTML, add it to the right cell

  // Extract left column content
  const heading = mainGrid.querySelector('.h2-heading');
  const testimonial = mainGrid.querySelector('.paragraph-lg');
  const innerGrid = mainGrid.querySelector('.w-layout-grid.grid-layout:not(.mobile-landscape-1-column)') || mainGrid.querySelector('.w-layout-grid.grid-layout');
  let avatarBlock = null;
  let nameTitleBlock = null;
  let divider = null;
  let logoBlock = null;

  if (innerGrid) {
    // Divider
    divider = innerGrid.querySelector('.divider');
    // Avatar block
    avatarBlock = innerGrid.querySelector('.avatar');
    // Name/title block
    const nameTitleDiv = innerGrid.querySelector('.flex-horizontal.y-center.flex-gap-xs > div:not(.avatar)');
    if (nameTitleDiv) {
      // Defensive: combine all children into a fragment
      nameTitleBlock = document.createDocumentFragment();
      Array.from(nameTitleDiv.children).forEach(child => nameTitleBlock.appendChild(child));
    }
    // Logo block (right-aligned)
    logoBlock = innerGrid.querySelector('.utility-display-inline-block');
  }

  // Compose left column cell
  const leftColumnElements = [];
  if (heading) leftColumnElements.push(heading);
  if (testimonial) leftColumnElements.push(testimonial);
  if (divider) leftColumnElements.push(divider);
  if (avatarBlock) leftColumnElements.push(avatarBlock);
  if (nameTitleBlock) leftColumnElements.push(nameTitleBlock);

  // Compose right column cell
  const rightColumnElements = [];
  if (logoBlock) rightColumnElements.push(logoBlock);

  // Table header
  const headerRow = ['Columns (columns26)'];

  // Table second row: two columns
  const secondRow = [leftColumnElements, rightColumnElements.length ? rightColumnElements : ''];

  // Build the table
  const cells = [headerRow, secondRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}
