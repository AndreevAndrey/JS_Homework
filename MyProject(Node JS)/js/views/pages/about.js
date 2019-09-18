import Component from '../../views/component.js';
import Header from '../partials/header.js';

class About extends Component {
    render() {
        return new Promise(resolve => {
            resolve(`
  <div class="startPage">
    <p>Добро пожаловать на сайт для людей,которые неравнодушны к авиации!<br>Вы можете пройти тест или поиграть в игру!</p>
    <div class="inputName">
      <p>Пожалуйста, введите Ваше имя для входа на сайт</p>
      <input type="text" name="name" placeholder="Имя">
      <button class="about__btn-start button" title="Click here to get started!" disabled>Зарегистрироваться</button>
    </div>
    <p class="user error"></p>
  </div>
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
            user = document.getElementsByClassName('user')[0],
            header = new Header;

        header.getHideLink();

        function showSuccessMessage(name) {
            user.className = 'user';
            user.innerHTML = ` ${name}, полетели!`;
        }

        function redirectTaskInfo() {
            location.hash = '#/test';
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
            let checkVal = validate(nameField.value.trim());
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
                user.innerHTML =
                    'Ошибка регистрации. Попробуйте ввести уникальное имя без цифр.';
                user.classList = 'error';
                nameField.value = '';
                nameField.classList.add('red-bordered');
            }
        });
    }
}

export default About;