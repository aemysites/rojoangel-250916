/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get immediate children
  const getChildren = (el, selector = ':scope > div') => Array.from(el.querySelectorAll(selector));

  // Get tab labels from tab menu
  const tabMenu = element.querySelector('.w-tab-menu');
  const tabLinks = tabMenu ? tabMenu.querySelectorAll('a[role="tab"]') : [];

  // Get tab content panes
  const tabContent = element.querySelector('.w-tab-content');
  const tabPanes = tabContent ? tabContent.querySelectorAll('.w-tab-pane') : [];

  // Defensive: if no tabs found, do nothing
  if (!tabLinks.length || !tabPanes.length) return;

  // Header row as required
  const headerRow = ['Tabs (tabs22)'];
  const rows = [headerRow];

  // For each tab, extract label and content
  for (let i = 0; i < tabLinks.length; i++) {
    const link = tabLinks[i];
    // Tab label: use the inner text of the div inside the link
    let tabLabel = '';
    const labelDiv = link.querySelector('div');
    if (labelDiv) {
      tabLabel = labelDiv.textContent.trim();
    } else {
      tabLabel = link.textContent.trim();
    }

    // Tab content: use the grid inside the pane
    const pane = tabPanes[i];
    let tabContentEl = null;
    if (pane) {
      // Defensive: find the grid layout inside the pane
      const grid = pane.querySelector('.w-layout-grid');
      if (grid) {
        tabContentEl = grid;
      } else {
        // Fallback: use the pane itself
        tabContentEl = pane;
      }
    }

    rows.push([
      tabLabel,
      tabContentEl
    ]);
  }

  // Create table block
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
