/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get direct children by tag
  function getChildrenByTag(parent, tag) {
    return Array.from(parent.children).filter(child => child.tagName.toLowerCase() === tag);
  }

  // 1. Header row
  const headerRow = ['Columns (columns11)'];

  // 2. Main content extraction
  const mainGrids = element.querySelectorAll(':scope > div.container > div.w-layout-grid.grid-layout');
  const topGrid = mainGrids[0];

  // Left column: eyebrow and headline
  const leftCol = topGrid.children[0];
  const eyebrow = leftCol.querySelector('.eyebrow');
  const headline = leftCol.querySelector('h1');
  const leftColumnContent = document.createElement('div');
  if (eyebrow) leftColumnContent.appendChild(eyebrow);
  if (headline) leftColumnContent.appendChild(headline);

  // Right column: paragraph, author, button
  const rightCol = topGrid.children[1];
  const paragraph = rightCol.querySelector('.rich-text');
  const authorRow = rightCol.querySelector('.w-layout-grid.grid-layout');
  let authorBlock = null;
  if (authorRow) {
    const avatar = authorRow.querySelector('.avatar');
    const nameMeta = avatar ? avatar.nextElementSibling : null;
    const authorName = nameMeta ? nameMeta.querySelector('.paragraph-sm') : null;
    const metaInfo = nameMeta ? nameMeta.querySelector('.flex-horizontal.y-center') : null;
    authorBlock = document.createElement('div');
    if (avatar) authorBlock.appendChild(avatar);
    if (authorName) authorBlock.appendChild(authorName);
    if (metaInfo) authorBlock.appendChild(metaInfo);
  }
  const button = rightCol.querySelector('a.button');
  const rightColumnContent = document.createElement('div');
  if (paragraph) rightColumnContent.appendChild(paragraph);
  if (authorBlock) rightColumnContent.appendChild(authorBlock);
  if (button) rightColumnContent.appendChild(button);

  // 3. Second grid: images (2 columns)
  const imageGrid = element.querySelector('.w-layout-grid.grid-layout.mobile-portrait-1-column');
  let imgCells = [];
  if (imageGrid) {
    const imgDivs = getChildrenByTag(imageGrid, 'div');
    imgCells = imgDivs.map(div => {
      const img = div.querySelector('img');
      return img ? img : '';
    });
  }

  // 4. Build table rows
  const contentRow = [leftColumnContent, rightColumnContent];
  const imageRow = imgCells.length === 2 ? imgCells : ['', ''];

  // 5. Compose table
  const cells = [
    headerRow,
    contentRow,
    imageRow
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // 6. Replace original element
  element.replaceWith(table);
}
