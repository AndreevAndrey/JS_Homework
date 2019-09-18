import Component from '../../views/component.js';
import Tasks from '../../models/tasks.js';

class Game extends Component {
    constructor() {
        super();
        this.model = new Tasks();
    }

    getData() {
        return new Promise(resolve => this.model.getUsersList().then(users => resolve(users)));
    }

    render() {
        return new Promise(resolve => {
            resolve(`     
               <div class="canvas">
                  <p>Добро пожаловать в игру! Облетай грозовые тучи,набирай за каждый пролет мимо туч баллы!</p>
                  <p>При попадании в тучу постарайся быстрее вылететь,пока cчетчик попаданий не достиг числа 300! </p>
                  <button class="about__btn-start button">Полетели!</button>
                  <p class="info"></p>
                    <div class="review">
                      <textarea class="description" placeholder="Оставьте отзыв!" maxlength="100"></textarea>
				              <button class="user-add button" disabled>Добавить</button>
				                <div class="reviewInner"></div>
				            </div>
                    <canvas id="canvas" width="600" height="375"></canvas>
               </div>
            `);
        });
    }

    afterRender() {
        this.setActions();
        this.setUsers();
    }

    setUsers() {
        const addComments = document.getElementsByClassName('description')[0],
            addUserBtn = document.getElementsByClassName('user-add')[0],
            reviewInner = document.getElementsByClassName('reviewInner')[0];

        addComments.addEventListener('keyup', () => addUserBtn.disabled = !addComments.value.trim());
        addUserBtn.onclick = () => this.addUser(addComments);
        this.getData().then(user => {
            const dataReview = user;

            let createDiv = document.createElement('div'),
                counterUser = 0;
            dataReview.map(i => {
                counterUser++;
                i['Пользователь'] = i['User'];
                delete i['User'];
                i['Комментарий'] = i['Comment'];
                delete i['Comment'];
                for (let j in i) {
                    let p = document.createElement('p');
                    p.value = j;
                    p.innerHTML = `${j} : ${i[j]}`;
                    createDiv.appendChild(p);
                }
            });
            reviewInner.appendChild(createDiv);
            reviewInner.insertAdjacentHTML("afterbegin", `<p>Всего комментариев: ${counterUser}</p>`);
        });
    }

    addUser(addComments) {
        const newUser = {
            User: localStorage.getItem('name'),
            Comment: addComments.value.trim()
        };
        this.model.addUser(newUser).then(() => {
            this.clearAddTask(addComments);
        });
    }

    clearAddTask(addComments) {
        addComments.value = '';
        location.reload();
    }

    setActions() {
        let cvs = document.getElementById('canvas'),
            button = document.getElementsByClassName('about__btn-start button')[0],
            info = document.getElementsByClassName('info')[0],
            review = document.getElementsByClassName('review')[0],
            ctx = cvs.getContext('2d'),
            aircraft = new Image(),
            bg = new Image(),
            cloudUp = new Image(),
            cloudBottom = new Image(),
            space = 100,
            xPos = 100,
            yPos = 100,
            grav = 1;

        cvs.classList.add('hide');
        aircraft.src = './.././.././.././styles/Img/kisspng-airplane-wide-body-aircraft-flight-aircraft-5a911953467258.7168305315194586432886' +
            ' (2) (1).png';
        bg.src = './.././.././.././styles/Img/1375258213_oblaka.jpg';
        cloudUp.src = './.././.././.././styles/Img/cloud-309469_960_720 (1).png';
        cloudBottom.src = './.././.././.././styles/Img/cloud-309469_960_720 (1).png';

        document.addEventListener('keydown', e => {
            switch (e.keyCode) {
                case 37:         //left
                    xPos -= 10;
                    break;
                case 38:          //up
                    yPos -= 10;
                    break;
                case 39:           //right
                    xPos += 10;
                    break;
                case 40:            //down
                    yPos += 10;
                    break;
            }
        });
        let recordOfCoordinates = [],
            score = 0,
            error = 0;

        recordOfCoordinates[0] = {
            x: cvs.width,
            y: 0
        };
        let localScore = localStorage.getItem('score'),
            localName = localStorage.getItem('name');

        function infoLocalStrg() {
            if (localScore) {
                info.innerHTML = `${localName},результат пролетов прошлой игры мимо туч : ${localScore}`;
            }
        }

        function draw() {
            review.classList = 'hide';
            ctx.drawImage(bg, 0, 0);
            button.innerHTML = 'Ускорься!';
            for (let i = 0; i < recordOfCoordinates.length; i++) {
                ctx.drawImage(cloudUp, recordOfCoordinates[i].x, recordOfCoordinates[i].y);
                ctx.drawImage(cloudBottom, recordOfCoordinates[i].x, recordOfCoordinates[i].y + cloudUp.height + space);
                recordOfCoordinates[i].x--;

                if (recordOfCoordinates[i].x === 200) {
                    recordOfCoordinates.push({
                        x: cvs.width,
                        y: Math.floor(Math.random() * cloudUp.height) - cloudUp.height
                    })
                }

                if (xPos + aircraft.width >= recordOfCoordinates[i].x
                    && xPos <= recordOfCoordinates[i].x + cloudUp.width
                    && (yPos <= recordOfCoordinates[i].y + cloudUp.height || yPos + aircraft.height >= recordOfCoordinates[i].y + cloudUp.height + space)) {
                    error++;
                    ctx.fillStyle = '#e80e1a';
                    ctx.font = '24px Livvic';
                    ctx.fillText(`Попадание в облако!: ${error} из 300`, 150, cvs.height - 20);
                }

                if (recordOfCoordinates[i].x === 5) {
                    score++;
                    localStorage.setItem('score', score);
                }

                if (error >= 300) {
                    ctx.fillStyle = '#e80e1a';
                    ctx.font = '54px Livvic';
                    ctx.fillText(`GAME OVER`, 150, cvs.height - 150);
                    setTimeout(reload, 3000);
                    break;
                }
            }

            function reload() {
                location.reload();
            }

            yPos <= 300 ? yPos += grav : grav;
            ctx.drawImage(aircraft, xPos, yPos);
            ctx.fillStyle = '#000';
            ctx.font = '24px Livvic';
            ctx.fillText(`Счет: ${score}`, 10, cvs.height - 20);
            ctx.fillStyle = '#4d4d4d';
            ctx.font = '24px Livvic';
            ctx.fillText(`Попадание в облако : ${error} из 300`, 150, cvs.height - 20);
            requestAnimationFrame(draw);
        }

        infoLocalStrg();
        button.addEventListener('click', () => {
            draw();
            cvs.classList.remove('hide');
        })
    }
}

export default Game;