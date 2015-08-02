(function (window, $) {
	'use strict';

	function RangeSlider($input, options) {
		this.$input = $input;
		this.options = options;

		this.render();
		this.bindEvents();

		this.value = 0;

		if (this.options.defaultValue) {
			this.setValue(this.options.defaultValue);
		}
	}

	RangeSlider.prototype = {

		cssClasses: {
			main: 'b-range-slider',
			filled: 'b-range-slider__filled',
			control: 'b-range-slider__control',
			moveNow: 'b-range-slider_move-now'
		},

		render: function () {
			this.$el = $('<div></div>').addClass(this.cssClasses.main);

			this.$filled = $('<div></div>')
				.addClass(this.cssClasses.filled)
				.appendTo(this.$el);

			this.$control = $('<div></div>')
				.addClass(this.cssClasses.control)
				.appendTo(this.$el);

			this.$el.insertAfter(this.$input);
		},

		setValue: function (value) {
			var width = this.$el.width(),
				left = (value - this.options.start) * (width / (this.options.end - this.options.start));

			if (value > this.options.start && value < this.options.end) {
				this.$filled.width(left);
				this.$control.css({
					left: left
				});

				this.value = value;
			}
		},

		bindEvents: function () {
			this.$control.on('mousedown', this.onControlMouseDown.bind(this));
			$(document.body).on('mousemove', this.onBodyMouseMove.bind(this));
			$(document.body).on('mouseup', this.onBodyMouseUp.bind(this));
		},

		onControlMouseDown: function (event) {
			this.isMove = true;
			this.x = event.pageX;

			$(document.body).addClass(this.cssClasses.moveNow);
		},

		onBodyMouseMove: function (event) {
			var width,
				value;

			if (this.isMove) {
				width = this.$el.width();
				value = (event.pageX - this.x) / (width / (this.options.end - this.options.start));
				this.setValue(this.value + value);
			}

			this.x = event.pageX;
		},

		onBodyMouseUp: function (event) {
			this.isMove = false;
			$(document.body).removeClass(this.cssClasses.moveNow);
		}

	};

	$.fn.rangeSlider = function (options) {
		return this.each(function() {
			$(this).data('rangeSelect', new RangeSlider($(this), options));
		});
	};

}(window, jQuery));