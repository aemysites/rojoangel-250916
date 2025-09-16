/* global WebImporter */
export default function parse(element, { document }) {
  // Get all immediate accordion items
  const accordions = Array.from(element.querySelectorAll(':scope > .accordion'));

  // Table header row: single cell only
  const headerRow = ['Accordion (accordion34)'];
  const rows = [headerRow];

  // For each accordion item, extract title and content
  accordions.forEach((acc) => {
    // Title: find the toggle div with the title text
    const toggle = acc.querySelector('.w-dropdown-toggle');
    let title = null;
    if (toggle) {
      title = toggle.querySelector('.paragraph-lg') || toggle;
    }
    // Content: find the nav.accordion-content
    const contentNav = acc.querySelector('nav.accordion-content');
    let content = null;
    if (contentNav) {
      const richText = contentNav.querySelector('.rich-text') || contentNav;
      content = richText;
    }
    if (!title) title = document.createElement('div');
    if (!content) content = document.createElement('div');
    rows.push([title, content]);
  });

  // Create table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Fix header row to have only one cell and span two columns
  const headerRowEl = table.querySelector('thead tr');
  if (headerRowEl && headerRowEl.children.length === 1) {
    headerRowEl.children[0].setAttribute('colspan', '2');
  }
  element.replaceWith(table);
}
