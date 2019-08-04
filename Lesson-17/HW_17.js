var startButton = document.getElementById('start');
var reset = document.getElementById('reset');
var result = document.getElementById('result');
reset.className = 'hide';
result.className = 'hide';
var x;
startButton.dataset.state = 'Stop';

startButton.onclick = function () {
    reset.className = 'active';
    result.className = 'active';
    if (startButton.dataset.state === 'Stop') {
        start();
        startButton.innerHTML = 'Stop';
        startButton.style.backgroundColor = 'red';
        startButton.dataset.state = 'Start';
    } else if (startButton.dataset.state === 'Start') {
        startButton.innerHTML = 'Start';
        startButton.style = '#start';
        startButton.dataset.state = 'Stop';
        stop();
    }
};

function start() {
    x = setInterval(timer, 10);
}

function stop() {
    clearInterval(x);
}

var millisec = 0;
var sec = 0;
var min = 0;
var milliSecOut = 0;
var secOut = 0;
var minOut = 0;
var counter = 0;

function timer() {
    milliSecOut = checkTime(millisec);
    secOut = checkTime(sec);
    minOut = checkTime(min);
    millisec++;
    if (millisec === 100) {
        millisec = 0;
        sec++;
    }
    if (sec === 60) {
        min++;
        sec = 0;
    }
    if (min === 60) {
        stop();
    }
    document.getElementById('millisec').innerHTML = milliSecOut;
    document.getElementById('sec').innerHTML = secOut;
    document.getElementById('min').innerHTML = minOut;
    var time = minOut + ':' + secOut + ':' + milliSecOut;

    result.onclick = function () {
        counter++;
        document.getElementById('val').innerHTML += counter + ') ' + time + '<br>';
    };

    localStorage.setItem('time', time);
    // localStorage.getItem('time');Дальше как при загрузке страницы применить эти данные - не понимаю...Window.onload
    // внутри этой же функции не сработает,если поставить условие,что есть данные в localStorage - запускать и
    // плюсовать их к запуску с 0. Если,как положено,в глобальной области прописывать window.onload- не видит данные
    // ,которые нужны.В общем что-то упускаю
}

function checkTime(i) {
    if (i < 10) {
        i = '0' + i;
    }
    return i;
}

reset.onclick = function () {
    stop();
    startButton.dataset.state = 'Stop';
    startButton.innerHTML = 'Start';
    startButton.style = '#start';
    reset.className = 'hide';
    result.className = 'hide';
    counter = 0;
    millisec = 0;
    sec = 0;
    min = 0;
    document.getElementById('val').innerHTML = '';
    document.getElementById('millisec').innerHTML = '00';
    document.getElementById('sec').innerHTML = '00';
    document.getElementById('min').innerHTML = '00';
};
