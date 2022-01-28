const CLASSNAME = {
  topNav: 'nav--top',
  rightNav: 'nav--right',
  bottomNav: 'nav--bottom',
  leftNav: 'nav--left',
  openTop: 'nav--open-top',
  openRight: 'nav--open-right',
  openBottom: 'nav--open-bottom',
  openLeft: 'nav--open-left',
};

const topNav = document.getElementsByClassName(CLASSNAME.topNav)[0];
const rightNav = document.getElementsByClassName(CLASSNAME.rightNav)[0];
const bottomNav = document.getElementsByClassName(CLASSNAME.bottomNav)[0];
const leftNav = document.getElementsByClassName(CLASSNAME.leftNav)[0];

const toggleTopDrawer = () => topNav.classList.toggle(CLASSNAME.openTop)
const toggleRightDrawer = () => rightNav.classList.toggle(CLASSNAME.openRight)
const toggleBottomDrawer = () => bottomNav.classList.toggle(CLASSNAME.openBottom)
const toggleLeftDrawer = () => leftNav.classList.toggle(CLASSNAME.openLeft)
