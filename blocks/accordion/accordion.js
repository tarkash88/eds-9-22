function createAccordionItem(titleRow, contentRow) {
  const details = document.createElement('details');
  details.className = 'accordion-item';

  const summary = document.createElement('summary');
  const title = titleRow.firstElementChild;
  if (title) summary.append(...title.childNodes);
  details.append(summary);

  const panel = document.createElement('div');
  panel.className = 'accordion-panel';

  if (contentRow) {
    [...contentRow.children].forEach((cell, cellIndex) => {
      cell.className = cellIndex === 0 ? 'accordion-image' : 'accordion-body';
      panel.append(cell);
    });
  }

  const imageLink = panel.querySelector('.accordion-image a[href]');
  if (imageLink) {
    const image = document.createElement('img');
    image.src = imageLink.href;
    image.alt = summary.textContent.trim();
    image.loading = 'lazy';
    imageLink.replaceWith(image);
  }

  details.append(panel);
  return details;
}

export default function decorate(block) {
  const rows = [...block.children];
  const items = [];

  for (let index = 0; index < rows.length; index += 2) {
    items.push(createAccordionItem(rows[index], rows[index + 1]));
  }

  block.replaceChildren(...items);

  block.addEventListener('toggle', (event) => {
    if (!event.target.open) return;
    block.querySelectorAll('details[open]').forEach((item) => {
      if (item !== event.target) item.open = false;
    });
  }, true);
}
