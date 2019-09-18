import Component from '../../views/component.js';
import Header from '../partials/header.js';
import Tasks from '../../models/tasks.js';

class AddAndList extends Component {
    render() {
        return new Promise(resolve => {
            resolve(`     
                <div id='test'>
                <div id="clock">
    <img id="min" src="./.././.././.././styles/Img/kisspng-airplane-wide-body-aircraft-flight-aircraft-5a911953467258.71683053151945864328vert.png">
    <img id="sec" src="./.././.././.././styles/Img/kisspng-airplane-wide-body-aircraft-flight-aircraft-5a911953467258.71683053151945864328vert.png">
  </div>
  <p id="time">Затрачено времени: 0 сек</p>
  <p id="result"></p>

  <p id="question"></p>

  <button id="option1"></button>

  <button id="option2"></button>

  <button id="option3"></button>

  <button id="option4"></button>
  <br>

  <button id="start">Приступить к тесту</button>
  <button id="end">Начать заново</button>
</div>
            `);
        });
    }

    afterRender() {
        this.setActions();
    }

    setActions() {
        const data_array = new Tasks;
        let button_1 = document.getElementById('option1'),
            button_2 = document.getElementById('option2'),
            button_3 = document.getElementById('option3'),
            button_4 = document.getElementById('option4'),
            test = document.getElementById('test'),
            button_end = document.getElementById('end'),
            clock = document.getElementById('clock'),
            button_start = document.getElementById('start'),
            valTime = document.getElementById('time'),
            question = document.getElementById('question'),
            result = document.getElementById('result'),
            header = new Header;


        button_1.onclick = () => check(1);
        button_2.onclick = () => check(2);
        button_3.onclick = () => check(3);
        button_4.onclick = () => check(4);
        button_start.onclick = () => check(0);

        let countAnswers = 0,
            time = 0,
            setTime = 0,
            arrValue = 0,
            sec = 0,
            min = 0,
            minTime = 0,
            arrLength = data_array.length;

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
            document.getElementById('time').innerHTML = `Затрачено времени: ${minTime} мин ${time} сек`;
            document.querySelector('#sec').style.transform = 'rotate(' + sec + 'deg)';
            document.querySelector('#min').style.transform = 'rotate(' + min + 'deg)';
        }

        function timerStop() {
            clearTimeout(setTime);
        }

        function resetTimer() {
            time = 0,
                setTime = 0,
                sec = 0,
                min = 0,
                minTime = 0,
                arrValue = 0,
            countAnswers = 0;
        }

        if (location.hash !== '#/test') {
            timerStop();
            resetTimer();
        }


        function check(num) {
            if (num === 0) {
                header.getHideLink();
                button_1.style.display = 'block';
                button_2.style.display = 'block';
                button_3.style.display = 'block';
                button_4.style.display = 'block';
                clock.style.display = 'block';
                valTime.style.display = 'block';
                question.style.display = 'block';

                button_1.innerHTML = data_array[arrValue][1];
                button_2.innerHTML = data_array[arrValue][2];
                button_3.innerHTML = data_array[arrValue][3];
                button_4.innerHTML = data_array[arrValue][4];
                question.innerHTML = data_array[arrValue][0];
                test.style.background = data_array[arrValue][6];

                button_start.style.display = 'none';
                button_end.style.display = 'inline';
                timerStart();

            } else {
                if (num === data_array[arrValue][5]) {
                    countAnswers++;
                    result.innerHTML = 'Верно!';
                    result.style.color = '#00FF14'
                } else {
                    result.innerHTML = "Неверно! Правильный ответ: " + data_array[arrValue][data_array[arrValue][5]];
                    result.style.color = 'red';
                }
                arrValue++;
                if (arrValue < arrLength) {
                    button_1.innerHTML = data_array[arrValue][1];
                    button_2.innerHTML = data_array[arrValue][2];
                    button_3.innerHTML = data_array[arrValue][3];
                    button_4.innerHTML = data_array[arrValue][4];
                    question.innerHTML = data_array[arrValue][0];
                    test.style.background = data_array[arrValue][6];
                } else {
                    timerStop();
                    button_1.style.display = 'none';
                    button_2.style.display = 'none';
                    button_3.style.display = 'none';
                    button_4.style.display = 'none';
                    question.style.display = 'none';
                    document.getElementById('end').style.display = 'inline';
                    result.style.color = '#ffff';
                    let percent = Math.round(countAnswers / arrLength * 100),
                        locStrg = localStorage.getItem('name'),
                        res;
                    (percent === 100) ? res = `Отлично, ${locStrg}!` :
                        percent >= 50 ? res = `Хорошо, ${locStrg}!` :
                            percent < 50 ? res = `Плохо, ${locStrg}!` : 'Пора в школу';

                    result.innerHTML = `Правильных ответов:  ${countAnswers} из ${arrLength} ( ${percent}%) <br> ${res}`;
                    header.getShowLink();
                }
            }
        }
        button_end.onclick = () => {
            location.reload();
        };
    }
}

export default AddAndList;