//HW_4;

//Задание 1

function pow(x, n) {
		var result = x;
		for (var i = 1; i < n; i++) {
				result *= x;
		}
		return result;
}

var x = +prompt('X');
var n = +prompt('n');
if (n <= 1 || isNaN(x) || isNaN(n)) {
		alert('Введите целое число n ,которое больше 1');
} else {
		alert(pow(x, n));
}

//Задание 2 (Домашнее задание №5)

var value = [5, 7, [4, [2], 8, [1, 3], 2], [9, []], 1, 8];

function treeSum(array, i = 0) {
		if (isFinite(array))
				return Number(array);
		else if (typeof array == "object" && i < array.length)
				return treeSum(array[i]) + treeSum(array, i + 1);
		return 0;
}

console.log(treeSum(value));


//Задание 3;

//Формула            Самый быстрый вариант(меньше всего операций,нет никаких циклов);
function sumTo(n) {
		return n * (n + 1) / 2;
}

console.log(sumTo(10));

//Цикл   медленнее(есть цикл,но нет дополнительных вычислительных затрат на организацию вложенных вызовов.

function sumTo(n) {
		var sum = 0;
		for (var i = 1; i <= n; i++) {
				sum += i;
		}
		return sum;
}

console.log(sumTo(20));

//Рекурсия   самый медленный способ. Существует ограничение глубины вложенных вызовов, поэтому рекурсивный вызов sumTo(100000) выдаст ошибку.

function sumTo(n) {
		if (n == 1)
				return 1;
		return n + sumTo(n - 1);
}

console.log(sumTo(30));
