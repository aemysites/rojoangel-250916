/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract title and content from each accordion item
  function extractAccordionItem(accordionDiv) {
    // Title: find the .w-dropdown-toggle, then the .paragraph-lg inside
    const toggle = accordionDiv.querySelector('.w-dropdown-toggle');
    let title = null;
    if (toggle) {
      title = toggle.querySelector('.paragraph-lg') || toggle;
    }
    // Content: find the .accordion-content (nav), then the rich text inside
    const contentNav = accordionDiv.querySelector('.accordion-content');
    let content = null;
    if (contentNav) {
      // Defensive: look for .rich-text or just grab the first child
      const richText = contentNav.querySelector('.rich-text') || contentNav.querySelector('div') || contentNav;
      content = richText;
    }
    return [title, content];
  }

  // Get all accordion items (direct children with .accordion)
  const accordionDivs = Array.from(element.querySelectorAll(':scope > .accordion'));

  // Build table rows: header row is one column, data rows are two columns
  const rows = [];
  rows.push(['Accordion (accordion34)']);
  accordionDivs.forEach((accDiv) => {
    const [title, content] = extractAccordionItem(accDiv);
    rows.push([
      title || '',
      content || ''
    ]);
  });

  // Create table block
  const table = document.createElement('table');
  // Header row (one cell, but set colspan=2 for valid HTML)
  const thead = document.createElement('thead');
  const headerTr = document.createElement('tr');
  const headerTh = document.createElement('th');
  headerTh.textContent = rows[0][0];
  headerTh.colSpan = 2;
  headerTr.appendChild(headerTh);
  thead.appendChild(headerTr);
  table.appendChild(thead);

  // Body rows (each with two cells)
  const tbody = document.createElement('tbody');
  for (let i = 1; i < rows.length; i++) {
    const tr = document.createElement('tr');
    const td1 = document.createElement('td');
    const td2 = document.createElement('td');
    if (rows[i][0] instanceof Element) {
      td1.appendChild(rows[i][0]);
    } else {
      td1.textContent = rows[i][0];
    }
    if (rows[i][1] instanceof Element) {
      td2.appendChild(rows[i][1]);
    } else {
      td2.textContent = rows[i][1];
    }
    tr.appendChild(td1);
    tr.appendChild(td2);
    tbody.appendChild(tr);
  }
  table.appendChild(tbody);

  // Replace the original element
  element.replaceWith(table);
}
