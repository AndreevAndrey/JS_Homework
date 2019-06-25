function Animal(name) {

		var self = this;

		self._name = name;
		self._foodAmount = 50;

		self.stroke = function () {
				console.log('Гладим кота');
				return self;
		};

		function formatFoodAmount() {
				return self._foodAmount + 'гр.';
		}

		self.dailyNorm = function (amount) {
				if (!arguments.length) return formatFoodAmount();

				if (amount < self._foodAmount) {
						throw new Error('Маловато будет');
				}
				if (amount > 500) {
						throw new Error('Кот лопнет');
				}
				self._foodAmount = amount;
		};

		self.feed = function () {
				console.log('Насыпаем в миску ' + self.dailyNorm() + ' корма.');
				return self;
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
}

var catty = new Cat('Catty');

console.log(catty._name);
catty.dailyNorm(88);
// catty.dailyNorm(88);
// catty.dailyNorm(888);
console.log(catty.dailyNorm());
catty.feed().stroke().stroke().stroke().feed()

// var miaf = new Animal('Miaf');
// miaf.feed().stroke();
