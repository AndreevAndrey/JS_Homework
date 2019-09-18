import Component from '../../views/component.js';

class Game extends Component {
    render() {
        return new Promise(resolve => {
            resolve(`     
               <div class="canvas">
<button class="about__btn-start button">Полетели!</button>
<p class="info"></p>
<canvas id="canvas" width="600" height="375">
</canvas>
</div>
            `);
        });
    }

    afterRender() {
        this.setActions();
    }

    setActions() {
        let cvs = document.getElementById('canvas'),
            button = document.getElementsByTagName('button')[0],
            info = document.getElementsByClassName('info')[0],
            ctx = cvs.getContext('2d'),
            aircraft = new Image(),
            bg = new Image(),
            cloudUp = new Image(),
            cloudBottom = new Image(),
            space = 100,
            xPos = 100,
            yPos = 100,
            grav = 1;

        aircraft.src = './.././.././.././styles/Img/kisspng-airplane-wide-body-aircraft-flight-aircraft-5a911953467258.7168305315194586432886' +
            ' (2) (1).png';
        bg.src = './.././.././.././styles/Img/1375258213_oblaka.jpg';
        cloudUp.src = './.././.././.././styles/Img/cloud-309469_960_720 (1).png';
        cloudBottom.src = './.././.././.././styles/Img/cloud-309469_960_720 (1).png';


        document.addEventListener('keydown', function (e) {
            switch (e.keyCode) {
                case 37:
                    xPos -= 10;
                    break;
                case 38:
                    yPos -= 10;
                    break;
                case 39:
                    xPos += 10;
                    break;
                case 40:
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
                    && (yPos <= recordOfCoordinates[i].y + cloudUp.height
                        || yPos + aircraft.height >= recordOfCoordinates[i].y + cloudUp.height + space)) {

                    error++;
                    ctx.fillStyle = '#e80e1a';
                    ctx.font = '24px Verdana';
                    ctx.fillText(`Попадание в облако!: ${error} из 300`, 150, cvs.height - 20);
                }

                if (recordOfCoordinates[i].x === 5) {
                    score++;
                    localStorage.setItem('score', score);
                }

                if (error >= 300) {
                    ctx.fillStyle = '#e80e1a';
                    ctx.font = '54px Verdana';
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
            ctx.font = '24px Verdana';
            ctx.fillText(`Счет: ${score}`, 10, cvs.height - 20);
            ctx.fillStyle = '#4d4d4d';
            ctx.font = '24px Verdana';
            ctx.fillText(`Попадание в облако : ${error} из 300`, 150, cvs.height - 20);
            requestAnimationFrame(draw);
        }

        infoLocalStrg();
        button.onclick = draw;
    }
}

export default Game;