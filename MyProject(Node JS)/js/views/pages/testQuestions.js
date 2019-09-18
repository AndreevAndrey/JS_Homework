import Component from '../../views/component.js';
import Header from '../partials/header.js';
import Tasks from '../../models/tasks.js';

class TestQuestions extends Component {
    constructor() {
        super();
        this.model = new Tasks();
    }

    getData() {
        return new Promise(resolve => this.model.getTasksList().then(tasks => resolve(tasks)));
    }

    render() {
        return new Promise(resolve => {
            resolve(`     
    <div id='test'>
        <div class="clock">
          <img id="min" src="./.././.././.././styles/Img/kisspng-airplane-wide-body-aircraft-flight-aircraft-5a911953467258.71683053151945864328vert.png">
          <img id="sec" src="./.././.././.././styles/Img/kisspng-airplane-wide-body-aircraft-flight-aircraft-5a911953467258.71683053151945864328vert.png">
        </div>
        <p class="time">Затрачено времени: 0 сек</p>
        <p class="result"></p>
        <p class="question"></p>
        <button class="option1"></button>
        <button class="option2"></button>
        <button class="option3"></button>
        <button class="option4"></button>
        <br>
        <button class="start">Приступить к тесту</button>
        <p class="resultAll"></p>
        <button class="end">Начать заново</button>
    </div>
            `);
        });
    }

    afterRender() {
        this.setActions();
    }

    setActions() {
        this.getData().then(value => {
            const dataArray = value;
            for (let i = 0; i < dataArray.length; i++) {
                const j = Math.floor(Math.random() * (i + 1));
                [dataArray[i], dataArray[j]] = [dataArray[j], dataArray[i]];
            }
            let button_1 = document.getElementsByClassName('option1')[0],
                button_2 = document.getElementsByClassName('option2')[0],
                button_3 = document.getElementsByClassName('option3')[0],
                button_4 = document.getElementsByClassName('option4')[0],
                test = document.getElementById('test'),
                button_end = document.getElementsByClassName('end')[0],
                clock = document.getElementsByClassName('clock')[0],
                button_start = document.getElementsByClassName('start')[0],
                valTime = document.getElementsByClassName('time')[0],
                question = document.getElementsByClassName('question')[0],
                result = document.getElementsByClassName('result')[0],
                resultAll = document.getElementsByClassName('resultAll')[0],
                header = new Header;
            button_1.onclick = () => check(1);
            button_2.onclick = () => check(2);
            button_3.onclick = () => check(3);
            button_4.onclick = () => check(4);

            let countAnswers = 0,
                time = 0,
                setTime = 0,
                arrValue = 0,
                sec = 0,
                min = 0,
                minTime = 0,
                arrLength = dataArray.length;

            function timerStart() {
                time++;
                if (time === 60) {
                    time = 0;
                    minTime++;
                }
                sec += 6;
                if (sec + 6 === 366) {
                    sec = 0;
                    min = min + 6;
                }
                setTime = setTimeout(timerStart, 1000);
                document.getElementsByClassName('time')[0].innerHTML = `Затрачено времени: ${minTime} мин ${time} сек`;
                document.querySelector('#sec').style.transform = `rotate(${sec}deg)`;
                document.querySelector('#min').style.transform = `rotate(${min}deg)`;
            }

            function timerStop() {
                clearTimeout(setTime);
            }

            button_start.onclick = () => {
                header.getHideLink();
                button_1.classList.add('displayOn');
                button_2.classList.add('displayOn');
                button_3.classList.add('displayOn');
                button_4.classList.add('displayOn');
                clock.classList.add('displayOn');
                valTime.classList.add('displayOn');
                question.classList.add('displayOn');
                button_start.classList.add('hide');
                button_end.classList.add('displayInline');
                button_1.innerHTML = dataArray[arrValue][1];
                button_2.innerHTML = dataArray[arrValue][2];
                button_3.innerHTML = dataArray[arrValue][3];
                button_4.innerHTML = dataArray[arrValue][4];
                question.innerHTML = dataArray[arrValue][0];
                test.style.background = dataArray[arrValue][6];
                timerStart();
            };

            function check(num) {
                if (num === dataArray[arrValue][5]) {
                    countAnswers++;
                    result.innerHTML = 'Верно!';
                    result.classList = 'green';
                } else {
                    result.innerHTML = `Неверно! Правильный ответ: ${dataArray[arrValue][dataArray[arrValue][5]]}`;
                    result.classList = 'error';
                }
                arrValue++;
                if (arrValue < arrLength) {
                    button_1.innerHTML = dataArray[arrValue][1];
                    button_2.innerHTML = dataArray[arrValue][2];
                    button_3.innerHTML = dataArray[arrValue][3];
                    button_4.innerHTML = dataArray[arrValue][4];
                    question.innerHTML = dataArray[arrValue][0];
                    test.style.background = dataArray[arrValue][6];
                } else {
                    timerStop();
                    button_1.classList.remove('displayOn');
                    button_2.classList.remove('displayOn');
                    button_3.classList.remove('displayOn');
                    button_4.classList.remove('displayOn');
                    question.classList = 'hide';
                    document.getElementsByClassName('end')[0].classList.add('displayInline');
                    let percent = Math.round(countAnswers / arrLength * 100),
                        locStrg = localStorage.getItem('name'),
                        grade;

                    (percent === 100) ? grade = `Отлично, ${locStrg}!` :
                        percent >= 50 ? grade = `Хорошо, ${locStrg}!` :
                            percent < 50 ? grade = `Плохо, ${locStrg}!` : 'Попробуйте читать)';

                    resultAll.innerHTML = `Правильных ответов:  ${countAnswers} из ${arrLength} ( ${percent}%) <br> ${grade}`;
                    header.getShowLink();
                }
            }

            button_end.onclick = () => {
                location.reload();
            };
        });
    }
}

export default TestQuestions;