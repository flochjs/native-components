const CLASS_NAME = {
  scrim: 'scrim',
  scrimVisible: 'scrim--visible',
};

const openDialog = (id) => {
  const dialog = document.getElementById(id);
  dialog.classList.add(CLASS_NAME.scrimVisible);
}


const closeDialog = (id) => {
  const dialog = document.getElementById(id);
  dialog.classList.remove(CLASS_NAME.scrimVisible);
}

const dialogs = document.getElementsByClassName(CLASS_NAME.scrim);

for (const dialog of dialogs)
  dialog.addEventListener('click', ({ target }) =>
    target.contains(dialog) && dialog.classList.remove(CLASS_NAME.scrimVisible));
