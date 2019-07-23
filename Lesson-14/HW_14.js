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
        a[i].style.cssText = 'color:red; font-weight:bold';
    }
};
div.onclick = function (ev) {
    var target = ev.target;
    for (var j = 0; j < a1.length; j++) {
        var href = a1[j].href;
        if (target === a1[j]) {
            alert(href);
            ev.preventDefault();
        }
    }
};
var button = document.getElementById('button');
var x = document.getElementById('x');
var y = document.getElementById('y');

function check() {
    button.disabled = x.value && y.value ? false : "disabled";
}

x.onkeyup = check;
y.onkeyup = check;

button.onclick = function () {
    if (x.value < 1 || x.value > 10 ||
        y.value < 1 || y.value > 10 ||
        isNaN(x.value) || isNaN(y.value)) {
        alert('wtf');
    } else {
        chess();
    }
};
var table = document.createElement("table");

function chess() {
    for (var i = 1; i <= x.value; i++) {
        var tr = document.createElement('tr');
        for (var j = 1; j <= y.value; j++) {
            var td = document.createElement('td');
            if (i % 2 === j % 2) {
                td.className = 'white';
            } else {
                td.className = 'black';
            }
            tr.appendChild(td);
        }
        var childTr = table.appendChild(tr);
        var childrenTr = childTr.children;
    }
    var childTable = document.body.appendChild(table);
    var childrenTable = childTable.children;

    table.addEventListener('click', function (e) {
        var target = e.target;
        for (var p = 1; p < childrenTable.length; p++) {
            for (var n = 0; n < childrenTr.length; n++) {
                if ((target.className === 'white') === (childrenTr[n].className === 'white')) {
                    childrenTr[n].className = 'black';
                } else {
                    childrenTr[n].className = 'white';
                }
                if ((target.className === 'black') === (childrenTr[n].className === 'black')) {
                    childrenTr[n].className = 'white';
                } else {
                    childrenTr[n].className = 'black';
                }
            }
        }
    });
}

