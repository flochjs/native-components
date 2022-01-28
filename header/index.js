const HEADER_BTN_IS_SELECTED_CLASSNAME = 'header__btn--is-selected'

function removePreviousSelectedBtn() {
  const selectedBtn = document.getElementsByClassName(HEADER_BTN_IS_SELECTED_CLASSNAME)[0]
  selectedBtn.classList.remove(HEADER_BTN_IS_SELECTED_CLASSNAME)
}

const headerBtns = document.querySelectorAll('.header__btn')

for (const btn of headerBtns)
  btn.addEventListener('click', ({ target: newSelectedBtn }) => {
    removePreviousSelectedBtn()
    newSelectedBtn.classList.add(HEADER_BTN_IS_SELECTED_CLASSNAME)
  })
