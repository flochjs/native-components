const stepperInputIncrementBtn = document.querySelector('.stepper-input__increment-btn')
const stepperInputDecrementBtn = document.querySelector('.stepper-input__decrement-btn')
const stepperInputInput = document.querySelector('.stepper-input__input')

stepperInputIncrementBtn.addEventListener('click', (e) => void (stepperInputInput.value = parseInt(stepperInputInput.value) + 1))
stepperInputDecrementBtn.addEventListener('click', (e) => void (stepperInputInput.value = parseInt(stepperInputInput.value) - 1))
