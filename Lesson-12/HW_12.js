//Задание №1
function forNames(names) {
    var result = names.map(function (item) {
        return {name: item};
    });
    return result;
}

var n = ['Вася', 'Василий', 'Василиса'];

console.log(forNames(n));

//Задание №2

function getTime(arr) {
    var total = arr.reduce(function (sum, item) {
        return sum + ':' + item;
    }, 'Tекущее время');
    return total;
}

console.log(getTime(['00', '13', '24']));

//Задание№3

function getVowel(word) {
    var count = 0;
    var vovelSearch = ['а', 'о', 'и', 'е', 'ё', 'э', 'ы', 'у', 'ю', 'я'];
    word.split('').forEach(function (letter) {
        vovelSearch.forEach(function (value) {
            if (letter.toLowerCase() === value) {
                count++;
            }
        });
    });
    return count + ' гласных';

}

console.log(getVowel('сколько гласных'));

// Задание №4

function getWord(text) {
    var count = 0;
    text.split(/[.:;?!~,'"&|()<>{}\[\]\r\n/\\]+/).filter(function (word) {
        var countLetters = word.split('').filter(function (val) {

            if (val === ' ') {
                return 0;
            }
            return count ++;

        });
        console.log(word + ':' + countLetters.length);
    });
}

getWord('Написать функцию, которая будет принимать текст в качестве параметра');

// Задание №5*

function getWords(text) {
    var n = text.split(/[ .:;?!~,'"&|()<>{}\[\]\r\n/\\]+/);
    var result = {};

    n.forEach(function (a) {
        if (result[a] != undefined) {
            result[a]++;
        } else {
            result[a] = 1;
        }
    });
    for (var key in result) {
        console.log ('Максимальное число повторений у слова ' + '"' + key + '"' + ' - ' + result[key] + ' раз(а)');
    }

}

getWords('сколько! будет, будет, будет будет повторов? повторов');


// Задание 5:
// -Не успел разобраться,пробовал через Math.max - ничего не получилось
