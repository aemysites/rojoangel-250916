/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid containing the two columns
  const container = element.querySelector('.container');
  if (!container) return;
  const grid = container.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;

  // Get the main two columns (heading/author and quote/logo)
  // The grid has three children: leftCol, rightCol, bottomRowGrid
  const gridChildren = Array.from(grid.children);
  if (gridChildren.length < 3) return;
  const leftCol = gridChildren[0]; // heading
  const rightCol = gridChildren[1]; // quote
  const bottomGrid = gridChildren[2];

  // Defensive: bottomGrid is a grid with divider, avatar+name, logo
  let avatarBlock = null, logoBlock = null;
  if (bottomGrid.classList.contains('w-layout-grid')) {
    for (const child of bottomGrid.children) {
      if (child.classList.contains('flex-horizontal')) {
        avatarBlock = child;
      } else if (child.classList.contains('utility-display-inline-block')) {
        logoBlock = child;
      }
    }
  }

  // Compose left column: heading + avatar
  const leftColContent = document.createElement('div');
  leftColContent.appendChild(leftCol);
  if (avatarBlock) leftColContent.appendChild(avatarBlock);

  // Compose right column: quote + logo
  const rightColContent = document.createElement('div');
  rightColContent.appendChild(rightCol);
  if (logoBlock) rightColContent.appendChild(logoBlock);

  // Table structure
  const headerRow = ['Columns (columns26)'];
  const contentRow = [leftColContent, rightColContent];

  // Create table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  element.replaceWith(table);
}
