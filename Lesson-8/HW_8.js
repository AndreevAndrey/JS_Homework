function Animal(name) {

	this.name = name;
	var foodAmount = 50;

	function formatFoodAmount() {
		return foodAmount + 'гр.';
	}

	this.dailyNorm = function (amount) {
		if (!arguments.length) return formatFoodAmount();

		if (amount < foodAmount) {
			throw new Error('Маловато будет');
		}
		if (amount > 500) {
			throw new Error('Лопнет');
		}
		foodAmount = amount;
	};

	var self = this;

	self.feed = function () {
		console.log('Насыпаем в миску ' + self.dailyNorm() + ' корма.');
	};
}

function Cat(name) {
	Animal.apply(this, arguments);
	var parentFeed = this.feed;
	this.feed = function () {
		parentFeed();
		console.log('Кот доволен  ^_^');
		return this;
	};

	this.stroke = function () {
		console.log('Гладим кота');
		return this;
	};
}

var catty = new Cat('Catty');

console.log(catty.name);
catty.dailyNorm(88);
// catty.dailyNorm(8);
// catty.dailyNorm(888);
console.log(catty.dailyNorm());
catty.feed().stroke().stroke().stroke().feed();

// var chester = new Cat('Chester');
// console.log(chester.name);
// chester.dailyNorm(388);
// console.log(chester.dailyNorm());
// chester.stroke().feed().stroke().feed();
