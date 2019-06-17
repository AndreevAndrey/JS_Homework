//Lesson-6

//Практическое задание №2;

function Cat(name) {

		this.name = name;

		var FoodAmount = 50;

		function formatFoodAmount() {
				return FoodAmount + 'гр.';
		}

		this.feed = function () {
				return 'Насыпаем в миску ' + formatFoodAmount() + ' корма.'
		};
}

var cat = new Cat('Catty');

console.log(cat.name);
console.log(cat.feed());

//Практическое задание №3;


function Cat(name) {
		this.name = name;
		var FoodAmount = 50;

		this.DailyNorm = function (amount) {
				if (!arguments.length) return FoodAmount;

				if (amount < FoodAmount) {
						throw new Error('Маловато будет');
				}
				if (amount > 500) {
						throw new Error('Кот лопнет');
				}

				FoodAmount = amount;
		};
		function formatFoodAmount() {
 				return FoodAmount + 'гр.';
 		}

 		this.feed = function () {
 				return 'Насыпаем в миску ' + formatFoodAmount() + ' корма.'
 		};

}

var cat = new Cat('Catty');
console.log(cat.name);
cat.DailyNorm(440);
console.log(cat.DailyNorm());
console.log(cat.feed());