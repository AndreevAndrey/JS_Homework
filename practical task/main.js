window.onload = function () {
    localStorage.removeItem('Link 1');
};

var div = document.getElementById('first');
var newParagraph = document.createElement('p');
var newParagraph1 = document.createElement('p');

div.appendChild(newParagraph);
div.appendChild(newParagraph1);

newParagraph.innerHTML = 'Привет <a href="https://www.google.ru/">Hi</a> <a href="https://www.google.ru/">Hello</a>';
newParagraph1.innerHTML = 'Привет <a href="https://www.google.ru/">Hi</a> <a href="https://www.google.ru/">Hello</a>';

var a = newParagraph.children;
var a1 = newParagraph1.children;

document.getElementsByTagName('button')[0].onclick = function () {
    for (var i = 0; i < a.length; i++) {
        a[i].className = 'style';
    }
};
div.onclick = function (ev) {
    var target = ev.target;
    for (var j = 0; j < a1.length; j++) {
        if (target === a1[j]) {
            if (localStorage.getItem('Link 1') !== null) {
                alert(localStorage.getItem('Link 1'));
            } else {
                localStorage.setItem('Link 1', '{ path: \'https://google.com\' }');
                alert('Ссылка сохранена');
                alert(localStorage.getItem('Link 1'));
            }
        }
    }
    ev.preventDefault();
};
