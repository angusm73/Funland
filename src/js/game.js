'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = function () {
	function Game() {
		_classCallCheck(this, Game);

		this.total_squiggle = 8;
		this.total_bubbles = 8;
		this.total_square = 20;
		this.total_triangle = 20;
		this.total_objects = this.total_squiggle + this.total_bubbles + this.total_square + this.total_triangle;

		this.body_content = document.querySelectorAll('body > .sw');
		this.gameobjects = [];
		this.initBackground();
		// this.initGame()
	}

	_createClass(Game, [{
		key: 'initGame',
		value: function initGame() {
			var _this = this;

			this.body_content.forEach(function (row, i) {
				setTimeout(function () {
					row.firstElementChild.classList.add('fall');
				}, i * 600);
			});
			setTimeout(function () {
				_this.sortShapes();
			}, this.body_content.length * 600);
		}
	}, {
		key: 'stopGame',
		value: function stopGame() {
			this.body_content.forEach(function (row) {
				row.firstElementChild.classList.remove('fall');
			});
		}
	}, {
		key: 'initBackground',
		value: function initBackground() {
			var _this2 = this;

			var background = document.createElement('div');
			var distance = function distance(x1, y1, x2, y2) {
				return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
			};
			background.classList.add('background');

			var _loop = function _loop() {
				var x = Math.random() * 100;
				var y = Math.random() * 100;
				while (_this2.gameobjects.filter(function (shape) {
					return distance(shape.x, shape.y, x, y) < 10;
				}).length) {
					x = Math.random() * 100;
					y = Math.random() * 100;
					// console.count('fails')
				}
				var el = document.createElement('span');
				var shape = 'triangle';
				if (_this2.gameobjects.length < _this2.total_squiggle) {
					shape = 'squiggle';
					el.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="362" height="42.125" viewBox="0 0 362 42.125"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="10px" fill-rule="evenodd" d="M25,160c10.473-19.526,21.555-33.2,32-32,14.376,1.653,19.472,32,32,32,12.873,0,19.127-32,32-32s19.127,32,32,32,19.127-32,32-32,19.127,32,32,32,19.127-32,32-32,19.127,32,32,32,19.127-32,32-32c12.527,0,17.624,30.347,32,32,10.445,1.2,21.527-12.474,32-32" transform="translate(-20 -122.938)"/></svg>';
				} else if (_this2.gameobjects.length < _this2.total_squiggle + _this2.total_bubbles) {
					shape = 'bubbles';
				} else if (_this2.gameobjects.length < _this2.total_squiggle + _this2.total_bubbles + _this2.total_square) {
					shape = 'square';
				} else {
					el.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="226" height="199" viewBox="0 0 226 199"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="12px" fill-rule="evenodd" d="M21,235L128,48,235,235H21Z" transform="translate(-15 -42)"/></svg>';
				}
				el.classList.add(shape);
				el.style.transform = 'rotate(' + Math.round(Math.random() * 18) * 20 + 'deg)';
				el.classList.add('color-' + Math.min(3, Math.floor(Math.random() * 4 + 1)));
				background.appendChild(el);
				_this2.gameobjects.push(new GameObject(x, y, el, shape));
			};

			while (this.gameobjects.length < this.total_objects) {
				_loop();
			}
			document.body.insertBefore(background, document.body.childNodes[0]);
		}
	}, {
		key: 'sortShapes',
		value: function sortShapes() {
			var _this3 = this;

			var col_count = 0.5;
			var last_shape = void 0;
			this.gameobjects.map(function (o, i) {
				if (last_shape && last_shape != o.shape) {
					col_count = 0.5;
				}
				if (o.shape == 'squiggle') {
					o.x = col_count / _this3.total_squiggle * 100;
					o.y = 30;
				} else if (o.shape == 'bubbles') {
					o.x = col_count / _this3.total_bubbles * 100;
					o.y = 40;
				} else if (o.shape == 'square') {
					o.x = col_count / _this3.total_square * 100;
					o.y = 50;
				} else {
					o.x = col_count / _this3.total_triangle * 100;
					o.y = 60;
				}
				o.render();
				col_count++;
				last_shape = o.shape;
			});
		}
	}]);

	return Game;
}();

var GameObject = function () {
	function GameObject(x, y, element, shape) {
		_classCallCheck(this, GameObject);

		this.x = x;
		this.y = y;
		this.el = element;
		this.shape = shape;
		this.render();
	}

	_createClass(GameObject, [{
		key: 'render',
		value: function render() {
			var _this4 = this;

			this.el.style.transition = 'all .5s ease-out';
			setTimeout(function () {
				_this4.el.style.left = _this4.x + '%';
				_this4.el.style.top = _this4.y + '%';
			}, 10);
		}
	}]);

	return GameObject;
}();

window.game = new Game();
//# sourceMappingURL=game.js.map
