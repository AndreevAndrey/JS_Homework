function deepClone(item) {
    if (Array.isArray(item)) {
        var newArr = [];
        for (var i = 0; i < item.length; i++) {
            newArr[i] = deepClone(item[i]);
        }
        return newArr;
    }
    if (typeof item === 'function') {

        deepClone.apply(this.arguments);
        var parentDeepClone = this.deepClone;
        this.deepClone = function () {
            parentDeepClone();
        }
    }
    if (item && typeof item === 'object') {
        var obj = {};
        for (var key in item) {
            obj[key] = deepClone(item[key]);
        }
        return obj;
    }
    return item;
}

var initialObj = {
    string: 'Vasya',
    number: 30,
    boolean: true,
    undefined: undefined,
    null: null,
    array: [1, 2, 3],
    object: {
        string2: 'Petrov',
        object2: {
            array2: [{}, {}]
        },
        object3: {}
    },
    method: function () {
        alert('Hello');
    }
};

var clonedObj = deepClone(initialObj);

clonedObj.object.object2.array2[1].name = 'Vasya';
clonedObj.array.push(2);

console.log(initialObj);
console.log(clonedObj);

//Задание №3

function deepEqual(a, b) {
    if (a === b) return true;

    if (a == null || typeof a != "object" ||
        b == null || typeof b != "object")
        return false;

    var propsInA = 0, propsInB = 0;

    for (var prop in a)
        propsInA += 1;

    for (var prop in b) {
        propsInB += 1;
        if (!(prop in a) || !deepEqual(a[prop], b[prop]))
            return false;
    }

    return propsInA == propsInB;
}

console.log(deepEqual(initialObj, clonedObj)); // false. Если закомментить push и добавление name
//(строка 54,55) -  true.
