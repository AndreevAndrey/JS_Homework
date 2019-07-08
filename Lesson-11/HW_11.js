//Задание №1

function filterArr(arr) {

    var filter = arr.filter(function (number) {
        return number > 0;
    });
    return filter;
}

console.log(filterArr([-1, 0, 2, 34, -2]));


//Задание №2

var numb = [-1, -5, -3, 8, 5];

var foundNumb = numb.find(function (numb) {
    return numb > 0;
});

console.log(foundNumb);

//Задание №3

function isPalindrome(word) {

    var spl = word.split('').reverse();
    var result = spl.join('');

    if (word.toLowerCase() === result.toLowerCase()) {
        console.log(true);
    }
    console.log(false);
}

isPalindrome('Шалаш');
isPalindrome('qалаш');

// Задание №4

function areAnagrams(a, b) {

    var sort1 = a.toLowerCase().split('').sort().join('');
    var sort2 = b.toLowerCase().split('').sort().join('');

    if (sort1 === sort2) {
        console.log(true);
    }
    console.log(false);


}

areAnagrams('кот', 'отк'); // true
areAnagrams('кот', 'атк'); // false
areAnagrams('кот', 'отко'); // false

//Задание №5

function divideArr(arr, size) {
    var sub = [];
    for (i = 0; i < Math.ceil(arr.length / size); i++) {
        sub[i] = arr.slice((i * size), (i * size) + size);
    }
    console.log(sub);
}

divideArr([1, 2, 3, 4], 2);
divideArr([1, 2, 3, 4, 5, 6, 7, 8], 3);