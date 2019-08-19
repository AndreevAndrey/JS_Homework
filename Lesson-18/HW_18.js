function validate(phone) {
    var regex = /^[\\+]?(375[-]?|^8[-]?0)(29|25|44|33|17)[-]?(\d{3})[-]?(\d{2})[-]?(\d{2})$/;
    return regex.test(phone);
}

console.log(validate('+375-25-777-77-77'));
console.log(validate('375299999999'));
console.log(validate('8-044-444-44-44'));
console.log(validate('8033-6666666'));

//Подсчет гласных

function getVowels(str) {
    var vovels = str.match(/[аоиеёэыуюя]/gim);
    return vovels === null ? 0 : vovels.length;
}

console.log(getVowels('сколько гласных'));