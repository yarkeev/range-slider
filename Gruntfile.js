module.exports = function (grunt) {
	'use strict';

	grunt.loadNpmTasks('grunt-contrib-stylus');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-jslint');

	grunt.initConfig({

		stylus: {
			compile: {
				options: {
					compress: false
				},
				files: {
					'dist/range-slider.css': 'src/css/range-slider.styl'
				}
			}
		},

		copy: {
			main: {
				src: 'src/js/range-slider.js',
				dest: 'dist/range-slider.js'
			}
		},

		jslint: {
			client: {
				src: [
					'src/**/*.js'
				],
				directives: {
					browser: true,
					white: true,
					unparam: true,
					predef: [
						'jQuery'
					]
				}
			}
		},

		watch: {
			css: {
				files: ['src/**/*.styl'],
				tasks: ['stylus'],
				options: {
					spawn: false,
				}
			},
			js: {
				files: ['src/**/*.js'],
				tasks: ['copy'],
				options: {
					spawn: false,
				}
			}
		}
	});
};