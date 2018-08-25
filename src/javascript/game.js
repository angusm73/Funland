class Game {

	constructor() {
		this.total_squiggle = 8
		this.total_bubbles = 8
		this.total_square = 20
		this.total_triangle = 20
		this.total_objects = this.total_squiggle + this.total_bubbles + this.total_square + this.total_triangle

		this.body_content = document.querySelectorAll('body > .sw')
		this.gameobjects = []

		this.initBackground()
		this.initGame()

		this.player = new Player()
	}

	initGame() {
		this.body_content.forEach((row, i) => {
			setTimeout(() => {
				row.firstElementChild.classList.add('fall')
			}, i * 0)
		})
		// setTimeout(() => {
		let header = document.querySelector('.header header')
		window.scrollTo({
			top: header.clientHeight,
			behavior: "smooth"
		})
		document.body.style.overflow = 'hidden'
		this.sortShapes()
		// }, this.body_content.length * 600)

		let count = 0
		let move_distance = 0.2
		setInterval(() => {
			if (count % 30 == 0) {
				move_distance *= -1
			}
			this.gameobjects.map(i => i.x += move_distance)
			this.gameobjects.map(i => i.render())
			count++
		}, 100)
	}

	stopGame() {
		document.body.style.overflow = ''
		this.body_content.forEach(row => {
			row.firstElementChild.classList.remove('fall')
		})
	}

	initBackground() {
		let background = document.createElement('div')
		let distance = (x1, y1, x2, y2) => {
			return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1))
		}
		background.classList.add('background')
		while (this.gameobjects.length < this.total_objects) {
			let x = Math.random() * 100
			let y = Math.random() * 100
			while (this.gameobjects.filter(shape => distance(shape.x, shape.y, x, y) < 10).length) {
				x = Math.random() * 100
				y = Math.random() * 100
				// console.count('fails')
			}
			let el = document.createElement('span')
			let shape = 'triangle'
			if (this.gameobjects.length < this.total_squiggle) {
				shape = 'squiggle'
				el.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="362" height="42.125" viewBox="0 0 362 42.125"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="10px" fill-rule="evenodd" d="M25,160c10.473-19.526,21.555-33.2,32-32,14.376,1.653,19.472,32,32,32,12.873,0,19.127-32,32-32s19.127,32,32,32,19.127-32,32-32,19.127,32,32,32,19.127-32,32-32,19.127,32,32,32,19.127-32,32-32c12.527,0,17.624,30.347,32,32,10.445,1.2,21.527-12.474,32-32" transform="translate(-20 -122.938)"/></svg>'
			} else if (this.gameobjects.length < this.total_squiggle + this.total_bubbles) {
				shape = 'bubbles'
			} else if (this.gameobjects.length < this.total_squiggle + this.total_bubbles + this.total_square) {
				shape = 'square'
			} else {
				el.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="226" height="199" viewBox="0 0 226 199"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="12px" fill-rule="evenodd" d="M21,235L128,48,235,235H21Z" transform="translate(-15 -42)"/></svg>'
			}
			el.classList.add(shape)
			el.style.transform = 'rotate(' + (Math.round(Math.random() * 18) * 20) + 'deg)'
			el.classList.add('color-' + Math.min(3, Math.floor(Math.random() * 4 + 1)))
			background.appendChild(el)
			this.gameobjects.push(new GameObject(x, y, el, shape))
		}
		document.body.insertBefore(background, document.body.childNodes[0])
	}

	sortShapes() {
		let col_count = 0.5
		let last_shape
		this.gameobjects.map((o, i) => {
			if (last_shape && last_shape != o.shape) {
				col_count = 0.5
			}
			if (o.shape == 'squiggle') {
				o.x = col_count / this.total_squiggle * 100
				o.y = 10
			} else if (o.shape == 'bubbles') {
				o.x = col_count / this.total_bubbles * 100
				o.y = 20
			} else if (o.shape == 'square') {
				o.x = col_count / this.total_square * 100
				o.y = 30
			} else {
				o.x = col_count / this.total_triangle * 100
				o.y = 40
			}
			o.render()
			col_count++
			last_shape = o.shape
		})
	}
}

class GameObject {
	constructor(x, y, element, shape) {
		this.x = x
		this.y = y
		this.el = element
		this.el.style.transition = 'all .5s ease-out'
		this.shape = shape
		this.render()
	}
	render() {
		this.el.style.transform = `translate(${this.x}vw, ${(100 - this.y) * -1}vh)`
		this.el.style.webkitTransform = `translate(${this.x}vw, ${(100 - this.y) * -1}vh)`
	}
}

class Player {
	constructor() {
		this.moving = 0
		this.x = 50
		this.y = 95
		this.el = document.createElement('span')
		this.el.classList.add('player')
		this.el.style.transition = 'all .05s ease-out'
		this.init()
		this.render()

		this.background = document.querySelector('.background')
		this.background.appendChild(this.el)

		this.bullet_template = document.createElement('span')
		this.bullet_template.classList.add('bullet')
	}
	init() {
		document.body.addEventListener('keydown', e => {
			let kc = e.keyCode ? e.keyCode : e.which
			if (kc == 37) {
				this.moving = -1
			} else if (kc == 39) {
				this.moving = 1
			} else if (kc == 32) {
				this.shoot()
			}
		})
		document.body.addEventListener('keyup', e => {
			let kc = e.keyCode ? e.keyCode : e.which
			if (kc == 37) {
				this.moving = 0
			} else if (kc == 39) {
				this.moving = 0
			}
		})
		setInterval(() => {
			this.move().render()
		}, 16)
	}
	render() {
		this.el.style.transform = `translate(${this.x}vw, ${(100 - this.y) * -1}vh)`
		this.el.style.webkitTransform = `translate(${this.x}vw, ${(100 - this.y) * -1}vh)`
	}
	move() {
		if (this.move === 0) {
			return this
		}
		this.x += this.moving * 0.5
		if (this.x < 0) {
			this.x = 0
		} else if (this.x > 100) {
			this.x = 100
		}
		return this
	}
	shoot() {
		let bullet = this.bullet_template.cloneNode()
		bullet.style.left = this.x + '%'
		bullet.style.top = this.y + '%'
		this.background.appendChild(bullet)
		let count = 95
		let timer = setInterval(() => {
			bullet.style.top = count + '%';
			count--
			if (count < 0) {
				bullet.parentNode.removeChild(bullet)
				clearInterval(timer)
			}
		}, 16)
	}
}

window.game = new Game
