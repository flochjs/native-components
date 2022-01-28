const TAB_IS_SELECTED_CLASSNAME = 'tab--is-selected'

const getControled = (el) => document.getElementById(el.getAttribute('aria-controls'));

const removePreviousSelectedTab = () => {
  const selectedTab = document.getElementsByClassName(TAB_IS_SELECTED_CLASSNAME)[0]
  selectedTab.setAttribute('aria-selected', false);
  const selectedPanel = getControled(selectedTab);
  selectedTab.classList.remove(TAB_IS_SELECTED_CLASSNAME)
  selectedPanel.hidden = true;
}

const tabs = document.querySelectorAll('.tab')

for (const tab of tabs)
  tab.addEventListener('click', ({ target: newSelectedTab }) => {
    removePreviousSelectedTab()
    newSelectedTab.classList.add(TAB_IS_SELECTED_CLASSNAME)
    newSelectedTab.setAttribute('aria-selected', true);
    const newPanel = getControled(newSelectedTab);
    newPanel.hidden = false;
  })
