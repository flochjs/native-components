const CLASS_NAME = {
  accordion: 'accordion',
  accordionExpanded: 'accordion--expanded',
  accordionHeader: 'accordion__header',
  accordionHeaderExpanded: 'accordion__header--expanded',
  accordionArrowIcon: 'accordion__arrow-icon',
  accordionArrowIconRotate: 'accordion__arrow-icon--rotate',
  accordionPanel: 'accordion__panel',
}

function expandPanel(masterEl, panelEl) {
  const TRANSITION_DURATION = 300;
  const GUTTER_HEIGHT = 16;

  const isExpanded = masterEl.ariaExpanded === 'true';

  if (isExpanded) {
    masterEl.ariaExpanded = 'false';
    panelEl.style['padding-bottom'] = null;
    panelEl.style.height = `${panelEl.scrollHeight + GUTTER_HEIGHT}px`;
    setTimeout(() => (panelEl.style.height = null))
    return
  }

  masterEl.ariaExpanded = 'true';
  panelEl.style.height = `${panelEl.scrollHeight + GUTTER_HEIGHT}px`;
  setTimeout(() => {
    const isExpanded = masterEl.ariaExpanded === 'true';
    if (!isExpanded) return;
    panelEl.style.height = 'auto';
    panelEl.style['padding-bottom'] = `${GUTTER_HEIGHT}px`;
  }, TRANSITION_DURATION);
}

function getParentNodeFromClassName(node, className) {
  let tmp

  for (tmp = node.parentNode ; tmp && !tmp.classList.contains(className) ; tmp = tmp.parentNode);

  return tmp;
}

for (const header of document.getElementsByClassName(CLASS_NAME.accordionHeader))
  header.addEventListener('click', () => {
    const accordion = getParentNodeFromClassName(header, CLASS_NAME.accordion);
    const panel = accordion.getElementsByClassName(CLASS_NAME.accordionPanel)[0];
    const arrowIcon = accordion.getElementsByClassName(CLASS_NAME.accordionArrowIcon)[0];

    accordion.classList.toggle(CLASS_NAME.accordionExpanded);
    header.classList.toggle(CLASS_NAME.accordionHeaderExpanded);
    arrowIcon.classList.toggle(CLASS_NAME.accordionArrowIconRotate);
    expandPanel(header, panel);
  })
