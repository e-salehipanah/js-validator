const TEL_REGEX = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm
class Validator {
    required(value) {
        return value !== '';
    }

    tel(value) {
        return value.match(TEL_REGEX);
    }

    email(value) {
        return value.match(EMAIL_REGEX);
    }

    password(value) {
        console.log(value);
        return value.match(PASSWORD_REGEX)
    }

    validate() {
        let form = document.getElementById('form'),
            inputsArr = form.querySelectorAll('input'),
            errorMessage = document.querySelector(".ui.error.message"),
            successMessage = document.querySelector(".ui.success.message");

        form.addEventListener('submit', (e) => {
            let i = 0;
            e.preventDefault()
            while (i < inputsArr.length) {
                let rules = !['text', 'submit'].includes(inputsArr[i].type) ? [inputsArr[i].type] : [],
                    parent = inputsArr[i].closest(".field"),
                    j = 0;
                if (inputsArr[i].required) {
                    rules.push('required')
                }
                while (j < rules.length) {
                    if (!this[rules[j]](inputsArr[i].value)) {
                        e.preventDefault();

                        errorMessage.className = "ui error message";
                        errorMessage.innerHTML = "Invalid rule '" + rules[j] + "' for input '" + inputsArr[i].name + "'";
                        parent.className = "field error";
                        return false;
                    }
                    errorMessage.className = "ui error message hidden";
                    parent.className = "field";
                    j++;
                }
                i++;
            }
            e.preventDefault();
            successMessage.className = "ui success message";
            form.outerHTML = "";
            form.remove();
        }, false)
    }
}


const validator = new Validator()
validator.validate()