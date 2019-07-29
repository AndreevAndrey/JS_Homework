var button = document.getElementById('button');
var tabs = document.getElementById('tabs');
tabs.className = 'hide';
button.onclick = function () {
    tabs.innerHTML = '';
    (function () {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://reqres.in/api/users?page=2', true);
        xhr.onload = function () {
            if (this.status === 200) {
                var obj = JSON.parse(this.response).data;
                tabs.className = 'active';
                for (var j = 0; j < obj.length; j++) {
                    tabs.innerHTML += '<div class="tab">' + 'User ' + (j + 1) + '</div>';
                    if (xhr.responseURL !== 'https://reqres.in/api/users?page=2') {
                        tabs.innerHTML = '<span>' + 'Connection error, not found page 2' + '</span>';
                    }
                }
                tab[0].className = 'tab one';
                for (var q = 0; q < obj.length; q++) {
                    tabs.innerHTML += '<div class="tabContent hide">';
                    tabContent[q].innerHTML = '<img src =' + obj[q].avatar + '>' +
                        '<p>' + 'First Name:' + obj[q].first_name + '</p>' +
                        '<p>' + 'Last Name:' + obj[q].last_name + '</p>';
                    localStorage.setItem('User' + (q + 1), obj[q].first_name +
                        ' ' + obj[q].last_name +
                        ' ' + obj[q].avatar);
                    //Убить запрос,вроде, не получилось,пробовал прописывать и через window.onload(как в задании при
                    // загрузке страницы),но тоже такой же результат.
                    if (localStorage.getItem('User' + (q + 1))) {
                        xhr.onabort = function () {
                            xhr.abort();
                        };
                    }
                }
                tabContent[0].className = 'tabContent active';
            } else {
                tabs.className = 'active';
                tabs.innerHTML = '<span>' + 'Error connecting to server: ' + '</span>' + this.status;
                console.log(this.statusText);
            }
        };
        xhr.onerror = function () {
            console.log(this.status + ' - ' + this.statusText);
            tabs.className = 'active';
            tabs.innerHTML = '<span>' + 'Error connecting to server: ' + '</span>' + this.status;
        };
        xhr.send();
    })();
};
var tabContent = document.getElementsByClassName('tabContent');
var tab = document.getElementsByClassName('tab');
hideTabsContent(1);

function hideTabsContent(a) {
    for (var i = a; i < tabContent.length; i++) {
        tabContent[i].classList.remove('active');
        tabContent[i].classList.add('hide');
        tab[i].classList.remove('one');
    }
}

tabs.onclick = function (event) {
    var target = event.target;
    if (target.className === 'tab') {
        for (var i = 0; i < tab.length; i++) {
            if (target === tab[i]) {
                showTabsContent(i);
            }
        }
    }
};

function showTabsContent(b) {
    if (tabContent[b].classList.contains('hide')) {
        hideTabsContent(0);
        tab[b].classList.add('one');
        tabContent[b].classList.remove('hide');
        tabContent[b].classList.add('active');
    }
}
