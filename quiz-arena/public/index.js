//Rotate the drop down indicator
function rotateArrow() {
    const arrows = document.querySelectorAll('.arrow-container')
    const toggleButtons = document.querySelectorAll('.toggle-btn')

    toggleButtons.forEach((toggleButton, index) => {
        toggleButton.addEventListener('click', () => {
            arrows[index].classList.toggle('active')
        })
    })
}

rotateArrow()

//Update subject input value 
function updateSubject() {
    const subjectInput = document.querySelector('.subject-input')
    const subjectLists = document.querySelectorAll('.subject')
    const optionsContainer = document.querySelector('.answer-ctn')
    const subjectArrow = document.querySelector('.subject-arrow')

    subjectInput.addEventListener('click', () => {
        optionsContainer.classList.toggle('hidden')
        optionsContainer.classList.toggle('slide-in')
    })

    subjectLists.forEach((subjectList, index) => {
        subjectList.addEventListener('click', () => {
            subjectInput.value = subjectLists[index].innerHTML
            optionsContainer.classList.add('hidden')
            subjectArrow.classList.toggle('active')
        })
    })
}

updateSubject()

//Update difficulty input value 
function updateDifficulty() {
    const difficultyLists = document.querySelectorAll('.dif')
    const optionsContainer = document.querySelector('.option-ctn-2')
    const difficultyInput = document.querySelector('.diff-input')
    const difficultyArrow = document.querySelector('.diff-arrow')

    difficultyInput.addEventListener('click', () => {
        optionsContainer.classList.toggle('hidden')
        optionsContainer.classList.toggle('slide-in')
    })
    
    difficultyLists.forEach((difficultyList, index) => {
        difficultyList.addEventListener('click', () => {
            difficultyInput.value = difficultyLists[index].innerHTML
            optionsContainer.classList.add('hidden')
            difficultyArrow.classList.toggle('active')
        })
    })
}

updateDifficulty()

//Hide entry status
function hideBlock() {
    const body = document.querySelector('.message-ctn')
    const hideButtons = document.querySelectorAll('.cancel-btn') 
    const inputs = document.querySelectorAll('.input')
    const options = document.querySelectorAll('.correct-ctn')
    const checkBoxes = document.querySelectorAll('.checkbox')
    
    hideButtons.forEach((hideButton) => {
        hideButton.addEventListener('click', () => {
            body.classList.add('hidden')
            body.classList.remove('flex')
            
            //Resets input feilds
            inputs.forEach((input) => {
                input.value = ''
    
                input.classList.remove('success')
                input.classList.remove('error')
            })

            //Resets options-selector feilds
            options.forEach((option) => {
                option.classList.remove('success')
                option.classList.remove('error')
            })

            //Resets checkBoxes
            checkBoxes.forEach((checkBox) => {
                checkBox.classList.remove('active')
            })
        })
    })
}

hideBlock()

//toggle checkbox
function checkBox() {
    const checkContainers = document.querySelectorAll('.correct-ctn')
    const checks = document.querySelectorAll('.checkbox')
    const options = document.querySelectorAll('.option')

    checkContainers.forEach((checkContainer, index) => {
        checkContainer.addEventListener('click', () => {
            //Remove 'active' class from all checkboxes
            checks.forEach((otherCheck) => {
                otherCheck.classList.remove('active')
            })

            //Set is_correct value to false for all checkboxes
            options.forEach((otherOption) => {
                otherOption.dataset.is_correct = 'false'
            })

            //Add 'active' class to the clicked checkbox
            checks[index].classList.toggle('active')

            //Set is_correct value to false for all checkboxes
            options[index].dataset.is_correct = 'true'
        })
    })

    checks.forEach((check, index) => {
        check.addEventListener('click', () => {
            checks[index].classList.toggle('active')
        })
    })
}

checkBox()

//Form validation 
const isValidInput = function validateInput() {
    const inputs = document.querySelectorAll('.input')
    const options = document.querySelectorAll('.option')
    const checks = document.querySelectorAll('.checkbox')
    const checkContainers = document.querySelectorAll('.correct-ctn')
    const errorMessage = document.querySelector('.error-msg')

    let valid = true;
    let fauxCheck = false;

    //Checks if the input fields are valid
    inputs.forEach((input) => {
        if (input.value.trim() === '') {
            valid = false;

            input.classList.add('error')
            input.classList.remove('success')

            errorMessage.classList.remove('hidden')
            errorMessage.classList.add('slide-in')
            errorMessage.innerHTML = 'Input feild(s) cannot be empty'

            setTimeout(() => {
                errorMessage.classList.add('hidden')
            }, 3000)
        } else {
            input.classList.add('success')
            input.classList.remove('error')
        }
    })

    checks.forEach((check) => {
        if(check.classList.contains('active')) {
            valid = true;
        } else {
            fauxCheck = false;
        }
    })

    if(fauxCheck) {
        checkContainers.forEach((checkContainer) => {
            checkContainer.classList.add('error')
        })
    }

    //Checks if the user has selected a correct answer
    /*if (valid) {
        for (const checkbox of checks) {
            if (checkbox.classList.contains('active')) {
                valid = true; //At least one checkbox has 'active' class
    
                checkContainers.forEach((checkContainer) => {
                    checkContainer.classList.remove('error')
                    checkContainer.classList.add('success')
                })
            } else {
                valid = false;
            }
        }
    
        if (!valid) {
            checkContainers.forEach((checkContainer) => {
                checkContainer.classList.add('error')
                checkContainer.classList.remove('success')
            })
    
            errorMessage.classList.remove('hidden')
            errorMessage.innerHTML = 'Please select a correct option'
    
            setTimeout(() => {
                errorMessage.classList.add('hidden')
            }, 3000)
        } else {
            valid = true;
        }
    }*/

    if (valid) {
        let atLeastOneActive = false; // Track if at least one checkbox is active
        
        for (const checkbox of checks) {
            if (checkbox.classList.contains('active')) {
                atLeastOneActive = true; // At least one checkbox has 'active' class
                break; // No need to continue loop, we found one active checkbox
            }
        }
        
        // If no checkbox is active, mark them as error
        if (!atLeastOneActive) {
            checkContainers.forEach((checkContainer) => {
                checkContainer.classList.add('error');
                checkContainer.classList.remove('success');
            });
        
            errorMessage.classList.remove('hidden');
            errorMessage.innerHTML = 'Please select a correct option';
        
            setTimeout(() => {
                errorMessage.classList.add('hidden');
            }, 3000);
        
            return false; // Return false because no checkbox is active
        }
    }
    
    

    //Checks if the options fields are valid by checking if any of the fields have the same value
    if(valid) {
        for (let i = 0; i < options.length - 1; i++) {
            for (let j = i + 1; j < options.length; j++) {
                if (options[i].value === options[j].value) {
                    valid = false
        
                    options[i].classList.add('error')
                    options[j].classList.add('error')
        
                    //console.log(`Input${i + 1} and Input${j + 1} have the same value: ${options[i].value}`);
        
                    errorMessage.classList.remove('hidden')
                    errorMessage.innerHTML = 'Two options cannot be of the same value'
        
                    setTimeout(() => {
                        errorMessage.classList.add('hidden')
                    }, 3000)
        
        
                    return; // Stop checking once a pair is found
                }
            }
        }
    }

    return valid;
}

//Submit form if it's valid
function formValidation() {
    const submitButton = document.querySelector('.submit')

    submitButton.addEventListener('click', (e) => {
        e.preventDefault()
        //isValidInput(e)
        
        if(isValidInput(e)) {
            //console.log('heck yea')
            
            showBlock()
        } /* else {
            console.log('oh no')
        }*/
    })
}

formValidation()

//Show entry status
function showBlock() {
    const body = document.querySelector('.message-ctn')
    const messageBlock = document.querySelector('.msg-block')

    body.classList.add('flex')
    body.classList.remove('hidden')

    messageBlock.classList.add('slide-in')
}