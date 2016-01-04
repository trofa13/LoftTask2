var sliderWidget = (function() {
	
	var _insertValues = function($this) {
		var
			container = $this.closest('.filter__slider'),
			from=container.find('.filter__slider-input-from'),
			to = container.find('.filter__slider-input-to');
		var values = $this.slider('option', 'values');

		from.val(values[0]);
		to.val(values[1]);
	}

	return {
		init: function(){

				$( ".filter__slider-element").each(function() {
				var
					$this=$(this),
					min=parseInt($this.data('min')),
					max=parseInt($this.data('max'));

				$this.slider({
				range: true,
				min: min,
				max: max,
				values: [ min, max],
				slide: function() {
        	_insertValues($this);
      },
      	create: function() {
      		_insertValues($this);
      	}
    })
    })
		}
	}
}());

var ratingWidget = (function() {

	var _letTheStarsShine = function(ratingAmount) {
		var starsArray=[];

		for (var i=0; i<5; i++) {
			var
				starClassName = (i<ratingAmount) ? 'products__rating-stars-item products__rating-stars-item--filled' : 'products__rating-stars-item';

			var
				star = $('<li>',{
					class: starClassName
				});

				starsArray.push(star);
		}

		return starsArray;
	}

	var _generateMarkup = function(ratingAmount, elementToAppend) {
		var
			ul=$('<ul>', {
				class: 'products__rating-stars',
				html: _letTheStarsShine(ratingAmount)
			});

			var
				ratingDisplay = $('<div>', {
					class: 'products__rating-amount',
					text: ratingAmount
				});
			elementToAppend.append([ul, ratingDisplay]);
	};

	return {
		init: function() {
			$('.products__rating').each(function() {
				var
					$this = $(this),
					ratingAmount = parseInt($this.data('rating'));

					_generateMarkup(ratingAmount, $this);

			})
		}
	}

}());




var viewStateChange = (function() {
	var _previousClass = '';

	var _changeState = function($this) {
		var
			item = $this.closest('.sort__view-item'),
			view = item.data('view'),
			listOfItems = $('#products-list'),
			modificationPrefix = 'products__list--',
			classOfViewState = modificationPrefix + view;

		if (_previousClass == '') {
			_previousClass = listOfItems.attr('class');
		}

		listOfItems.attr('class', _previousClass + ' ' + classOfViewState);

	};

	return {
		init: function() {
		$('.sort__view-link').on('click', function(e) {
				e.preventDefault();
				_changeState($(this));
			});
		}

	}
}())



$(document).ready(function(){

	viewStateChange.init();

	if ($('.products__rating').length){
		ratingWidget.init();
		console.log('Инициализируется')
	}


	if ($(".filter__slider-element").length) {
		sliderWidget.init();
	}

	if($('.sort__select-elem').length) {
		$('.sort__select-elem').select2({
			minimumResultsForSearch: Infinity

		});

	}
});