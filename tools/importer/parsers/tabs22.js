/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: Get direct children by selector
  const getDirectChildren = (el, sel) => Array.from(el.querySelectorAll(sel));

  // 1. Table header
  const headerRow = ['Tabs (tabs22)'];
  const rows = [headerRow];

  // 2. Find tab menu and tab content containers
  const tabMenu = getDirectChildren(element, ':scope > div')[0];
  const tabContent = getDirectChildren(element, ':scope > div')[1];

  // Defensive: Ensure both exist
  if (!tabMenu || !tabContent) return;

  // 3. Get tab labels (from tabMenu)
  const tabLinks = getDirectChildren(tabMenu, ':scope > a');

  // 4. Get tab panes (from tabContent)
  const tabPanes = getDirectChildren(tabContent, ':scope > div');

  // Defensive: Only proceed if counts match
  if (tabLinks.length !== tabPanes.length) return;

  // 5. For each tab, add a row: [label, content]
  for (let i = 0; i < tabLinks.length; i++) {
    // Tab label: Use the inner text of the label div inside the link
    const labelDiv = tabLinks[i].querySelector('div');
    let tabLabel = labelDiv ? labelDiv.textContent.trim() : tabLinks[i].textContent.trim();

    // Tab content: Use the grid-layout div inside the pane
    const pane = tabPanes[i];
    const gridDiv = pane.querySelector('.grid-layout');
    let tabContentCell = gridDiv ? gridDiv : pane;

    rows.push([tabLabel, tabContentCell]);
  }

  // 6. Create table and replace
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
