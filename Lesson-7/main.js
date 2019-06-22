jQuery(document).ready(function ($) {
		$('.hamburger').on('click', function () {
				$('#menu').css('transform', 'translateX(0)');
				$(this).fadeOut();
				$('.close').fadeIn();

		});
		$('.close').on('click', function () {
				$('#menu').css('transform', 'translateX(-200px)');
				$(this).fadeOut();
				$('.hamburger').fadeIn();

		});
});