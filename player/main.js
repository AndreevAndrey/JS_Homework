let startButton = document.getElementById('start'),
    reset = document.getElementById('reset'),
    vynilizer = document.querySelector('#vynilizer'),
    millisec = 0,
    sec = 0,
    min = 0,
    milliSecOut = 0,
    secOut = 0,
    minOut = 0,
    setRound = 0,
    rotatePlate = 0,
    counter = 0,
    x;

reset.className = 'hide';
startButton.dataset.state = 'Stop';
vynilizer.classList.add('hidden');

let playMusic = document.getElementsByClassName('music')[0];
playMusic.innerHTML = `<p class="nomra">Nomra-By_My_Side_(Extended_Mix).mp3<p>
                       <p class="Michael">michael_jackson_love_never_felt_so_good.mp3</p>`;

let music = new Audio();
playMusic.onclick = function (event) {
    let target = event.target;
    resetTrack();
    vynilizer.classList.remove('hidden');
    target.style.color = 'red';
    startButton.removeAttribute('disabled');

    switch (target.className) {
        case 'nomra':
            music.src = 'Music/Nomra-By_My_Side_(Extended_Mix).mp3';
            break;
        case 'Michael':
            music.src = 'Music/michael_jackson_love_never_felt_so_good_feat_justin_timberlake_(NaitiMP3.ru).mp3';
            break;
    }
};

if (music.src === '') {
    startButton.setAttribute('disabled', 'disabled');
}

music.addEventListener('ended',function () {
    resetTrack();
});

startButton.onclick = startTrack;

function rotateMusicPlate() {
    rotatePlate += 1;
    setRound = setTimeout(rotateMusicPlate, 10);
    document.querySelector('#vynilizer').style.transform = `rotate(${rotatePlate}deg)`;
}

function stopRotateMusicPlate() {
    clearTimeout(setRound);
}

function startTrack() {
    reset.className = 'active';
    switch (startButton.dataset.state) {
        case 'Stop':
            start();
            startButton.innerHTML = 'Pause';
            startButton.style.backgroundColor = 'red';
            startButton.dataset.state = 'Start';
            music.play();
            document.querySelector('#vynil').style.transform = `rotate(30deg)`;
            rotateMusicPlate();
            break;
        case 'Start':
            startButton.innerHTML = 'Play';
            startButton.style = '#start';
            startButton.dataset.state = 'Stop';
            music.pause();
            stopRotateMusicPlate();
            stop();
            break;
    }
}

function start() {
    x = setInterval(timer, 10);
}

function stop() {
    clearInterval(x);
}

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

    document.getElementById('millisec').innerHTML = milliSecOut;
    document.getElementById('sec').innerHTML = secOut;
    document.getElementById('min').innerHTML = minOut;
}

function checkTime(i) {
    if (i < 10) {
        i = '0' + i;
    }
    return i;
}

reset.onclick = resetTrack;

function resetTrack() {
    stop();
    music.src = '';
    document.querySelector('#vynil').style.transform = 'rotate(' + 0 + 'deg)';
    stopRotateMusicPlate();
    document.querySelector('#vynilizer').style.transform = 'rotate(' + 0 + 'deg)';
    startButton.setAttribute('disabled', 'disabled');
    startButton.className = 'active';
    startButton.dataset.state = 'Stop';
    startButton.innerHTML = 'Play';
    startButton.style = '#start';
    reset.className = 'hide';
    counter = 0;
    millisec = 0;
    sec = 0;
    min = 0;
    document.getElementById('val').innerHTML = '';
    document.getElementById('millisec').innerHTML = '00';
    document.getElementById('sec').innerHTML = '00';
    document.getElementById('min').innerHTML = '00';
}
