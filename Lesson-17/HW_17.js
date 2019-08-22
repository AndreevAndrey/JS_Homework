var startButton = document.getElementById('start'),
    reset = document.getElementById('reset'),
    result = document.getElementById('result'),
    x;
reset.className = 'hide';
result.className = 'hide';
startButton.dataset.state = 'Stop';

startButton.onclick = function () {
    reset.className = 'active';
    result.className = 'active';
    switch (startButton.dataset.state) {
        case 'Stop':
            start();
            startButton.innerHTML = 'Stop';
            startButton.style.backgroundColor = 'red';
            startButton.dataset.state = 'Start';
            break;
        case 'Start':
            startButton.innerHTML = 'Start';
            startButton.style = '#start';
            startButton.dataset.state = 'Stop';
            stop();
            break;
    }
};

function start() {
    x = setInterval(timer, 10);
}

function stop() {
    clearInterval(x);
}

var millisec = 0,
    sec = 0,
    min = 0,
    milliSecOut = 0,
    secOut = 0,
    minOut = 0,
    counter = 0;

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
        result.className = 'hide';
        startButton.className = 'hide';
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
}

function checkTime(i) {
    if (i < 10) {
        i = '0' + i;
    }
    return i;
}

reset.onclick = function () {
    stop();
    startButton.className = 'active';
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
