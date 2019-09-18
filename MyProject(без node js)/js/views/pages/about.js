import Component from '../../views/component.js';
import Header from '../partials/header.js';

class About extends Component {
    render() {
        return new Promise(resolve => {
            resolve(`
                 <div class="inputName">
        <p>Пожалуйста,введите Ваше имя</p>
      <input type="text" name="name" id="name">
     <button class="about__btn-start button" title="Click here to get started!" disabled>Зарегистрироваться</button>
    </div>
<p class="user error"></p>
            `);
        });
    }

    afterRender() {
        this.setAction();
    }

    setAction() {
        let name = localStorage.getItem('name'),
            nameField = document.querySelector('[name="name"]'),
            button_start = document.getElementsByClassName('about__btn-start button')[0],
            inputName = document.getElementsByClassName('inputName')[0],
            usForm = document.getElementsByClassName('user')[0],
            header = new Header;

        header.getHideLink();

        function showSuccessMessage(name) {
            usForm.className = 'user';
            usForm.innerHTML = `<div>Привет, ${name} !</div>`;
        }

        function redirectTaskInfo() {
            location.hash = `#/test`;
        }


        function validate(name) {
            const regExName = /^[a-z а-я]{3,20}$/i;
            return regExName.test(name);
        }

        nameField.addEventListener('keyup', () => button_start.disabled = !nameField.value.trim());


        if (name) {
            inputName.remove();
            header.getShowLink();
            showSuccessMessage(name);
        }

        button_start.addEventListener('click', () => {
            let checkVal = validate(nameField.value);
            try {
                if (checkVal) {
                    localStorage.setItem('name', nameField.value);
                    inputName.remove();
                    showSuccessMessage(nameField.value);
                    header.getShowLink();
                    setTimeout(redirectTaskInfo, 2000);
                }
                if (!checkVal) {
                    throw new Error();
                }
            } catch (error) {
                usForm.innerHTML =
                    'При создании пользователя возникла ошибка. Попробуйте ввести уникальное имя без цифр.';
                usForm.classList = 'error';
                nameField.value = '';
                nameField.classList.add('red-bordered');
            }
        });
    }
}

export default About;