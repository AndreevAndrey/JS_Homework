//Задание 1;
var table = document.getElementsByTagName('table')[0];
var tbody = table.children;
var tr = document.getElementsByTagName('tr');
document.getElementById('button').onclick = function () {
    var cloneTr = tr[0].cloneNode(true);
    tbody[0].insertAdjacentElement('afterbegin', cloneTr);
};
table.onclick = function f(ev) {
    var target = ev.target;
    if (target.tagName === 'TD') {
        if (target.attributes[0] === undefined) {
            target.innerHTML = '<input type="text">';
            target.firstChild.focus();
            var input = document.getElementsByTagName('input')[0];
            input.addEventListener('blur', function () {
                target.innerHTML = input.value;
            });
        }
    }
};
// ------  вариант,в котором текст сохраняется,но не делегированием---------------

// var tds = document.querySelectorAll('td');
// for (var i = 0; i < tds.length; i++) {
//     if (tds[i].tagName === 'TD') {
//         if (tds[i].attributes[0] === undefined) {
//             tds[i].addEventListener('click', function func() {
//                 var input = document.createElement('input');
//                 input.value = this.innerHTML;
//                 this.innerHTML = '';
//                 this.appendChild(input);
//                 input.focus();
//                 var td = this;
//                 input.addEventListener('blur', function () {
//                     td.innerHTML = this.value;
//                     td.addEventListener('click', func);
//                 });
//                 this.removeEventListener('click', func);
//             });
//         }
//     }
// }

