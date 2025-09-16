/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: Get immediate child divs
  const topDivs = element.querySelectorAll(':scope > div');
  // Table header row
  const headerRow = ['Carousel (carousel21)'];
  const rows = [headerRow];

  // Defensive: find all card containers (each is a slide)
  topDivs.forEach((outerDiv) => {
    // Find the deepest .card-body (contains image and text)
    const cardBody = outerDiv.querySelector('.card-body');
    if (!cardBody) return;

    // Find image (mandatory)
    const img = cardBody.querySelector('img');
    // Defensive: skip if no image
    if (!img) return;

    // Find heading (optional)
    const heading = cardBody.querySelector('.h4-heading');
    let textCellContent = [];
    if (heading) {
      // Convert heading to h2 for semantic consistency
      const h2 = document.createElement('h2');
      h2.textContent = heading.textContent;
      textCellContent.push(h2);
    }
    // If there is other text content (description, etc), add it below heading
    // In this HTML, only heading is present, but support future variations
    Array.from(cardBody.childNodes).forEach((node) => {
      if (node.nodeType === Node.ELEMENT_NODE && node !== img && node !== heading) {
        // If it's not the image or heading, add as is
        textCellContent.push(node);
      } else if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
        // If it's a text node and not empty, wrap in <p>
        const p = document.createElement('p');
        p.textContent = node.textContent.trim();
        textCellContent.push(p);
      }
    });
    // If no text content, leave cell empty
    if (textCellContent.length === 0) textCellContent = [''];

    // Build row: [image, text content]
    rows.push([img, textCellContent]);
  });

  // Create table and replace element
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
