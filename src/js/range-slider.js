(function (window, $) {
	'use strict';

	function RangeSlider($input, options) {
		this.$input = $input;
		this.options = options;

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
				text;

			if (value >= this.options.start && value <= this.options.end) {
				this.$filled.width(left);
				this.$control.css({
					left: left
				});

				this.value = value;
				this.$input.val(Math.round(this.value));

				if (this.options.bubble) {
					text = this.options.isFormatText ? Math.round(this.value).toString().replace(/(\s)+/g,"").replace(/(\d{1,3})(?=(?:\d{3})+$)/g,"$1 ") : Math.round(this.value);

					this.$bubble
						.text(text)
						.css('margin-left', (this.$control.width() / 2) -(this.$bubble.outerWidth() / 2));
				}
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