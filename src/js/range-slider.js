(function (window, $) {
	'use strict';

	function RangeSlider($input, options) {
		this.$input = $input;
		this.options = $.extend(true, {
			bubble: true,
			isFormatText: true
		}, options);

		this.render();
		this.bindEvents();

		this.value = Number(this.$input.val()) || 0;

		if (this.$input.val()) {
			this.setValue(this.value);
		}
	}

	RangeSlider.prototype = {

		cssClasses: {
			main: 'b-range-slider',
			filled: 'b-range-slider__filled',
			control: 'b-range-slider__control',
			bubble: 'b-range-slider__control__bubble',
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

			if (this.options.bubble) {
				this.$bubble = $('<div></div>')
					.addClass(this.cssClasses.bubble)
					.appendTo(this.$control);
			}

			this.$el.insertAfter(this.$input);
		},

		setValue: function (value) {
			var width = this.$el.width(),
				left = (value - this.options.start) * (width / (this.options.end - this.options.start)),
				round = this.options.round ? Math.floor(value / this.options.round) * this.options.round : value,
				text;

			if (this.options.round && this.options.end - value < this.options.round) {
				round = this.options.end;
			}

			if (value >= this.options.start && value <= this.options.end) {
				this.$filled.width(left);
				this.$control.css({
					left: left
				});

				this.value = value;
				this.$input.val(round);

				if (this.options.bubble) {
					text = this.options.isFormatText ? Math.round(round).toString().replace(/(\s)+/g, "").replace(/(\d{1,3})(?=(?:\d{3})+$)/g, "$1 ") : round;

					this.$bubble
						.text(text)
						.css('margin-left', (this.$control.width() / 2) - (this.$bubble.outerWidth() / 2));
				}
			}
		},

		bindEvents: function () {
			this.$el.on('mousedown', this.onMouseDown.bind(this));
			this.$control.on('mousedown', this.onControlMouseDown.bind(this));
			$(document.body).on('mousemove', this.onBodyMouseMove.bind(this));
			$(document.body).on('mouseup', this.onBodyMouseUp.bind(this));
		},

		onMouseDown: function (event) {
			var width,
				value;

			width = this.$el.width();
			value = (event.pageX - this.$el.offset().left) * ((this.options.end - this.options.start) / width);
			this.setValue(this.options.start + value);
		},

		onControlMouseDown: function (event) {
			event.stopPropagation();

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
		return this.each(function () {
			$(this).data('rangeSelect', new RangeSlider($(this), options));
		});
	};

}(window, jQuery));