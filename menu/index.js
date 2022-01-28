const CLASS_NAME = {
  menu: 'menu',
  toggle: 'menu__toggle',
  list: 'menu__list',
  listShow: 'menu__list--show',
};

const menus = document.getElementsByClassName(CLASS_NAME.menu);

const show = (toggle, list) => {
  toggle.setAttribute('aria-expanded', true);
  list.setAttribute('aria-hidden', false);
  list.classList.add(CLASS_NAME.listShow);
}

const hide = (toggle, list) => {
  toggle.setAttribute('aria-expanded', false);
  list.setAttribute('aria-hidden', true);
  list.classList.remove(CLASS_NAME.listShow);
}

const hideOpened = () => {
  const openedToggle = document.querySelector(`.${CLASS_NAME.toggle}[aria-expanded="true"]`);
  const openedList = document.querySelector(`.${CLASS_NAME.list}[aria-hidden="false"]`);

  if (openedToggle)
    hide(openedToggle, openedList);
};

for (const menu of menus) {
  const toggle = menu.getElementsByClassName(CLASS_NAME.toggle)[0];
  const list = menu.getElementsByClassName(CLASS_NAME.list)[0];

   toggle.addEventListener('click', (event) => {
     event.stopPropagation();
     if (JSON.parse(toggle.getAttribute('aria-expanded')))
       hide(toggle, list);
     else {
       hideOpened();
       show(toggle, list);
     }
   })
}

window.addEventListener('click', hideOpened);
window.addEventListener('focusin', hideOpened);
