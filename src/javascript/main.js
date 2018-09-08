class FrontEnd {

    constructor() {
        // this.initModal()
        // this.initModalForm()
        this.initMusic()
        this.initHero()

        document.addEventListener("touchstart", function () { }, false)
    }

    initModal() {
        const overlay = document.querySelector('.overlay')
        const modal = document.querySelector('.modal')
        const close_btn = document.querySelector('.modal .close')
        const buttons = document.querySelectorAll('.join-now')
        let open_modal = null

        this.modal = {
            open: function (modal_class) {
                overlay.classList.add('show')
                if (modal_class) {
                    document.querySelector(modal_class).style.display = 'block'
                    open_modal = modal_class
                } else {
                    modal.style.display = 'block'
                }
            },
            close: function (modal_class) {
                overlay.classList.remove('show')
                if (modal_class) {
                    document.querySelector(modal_class).style.display = 'none'
                    open_modal = null
                } else {
                    modal.style.display = 'none'
                }
            }
        }

        /* Modal events */
        close_btn.addEventListener('click', e => {
            this.modal.close(open_modal)
            e.preventDefault()
        })
        overlay.addEventListener('click', e => {
            this.modal.close(open_modal)
        })
        document.addEventListener('keydown', e => {
            const kc = e.keyCode ? e.keyCode : e.which
            if (kc == 27) {
                this.modal.close(open_modal)
            }
        })
        if (buttons.length) {
            buttons.forEach(button => {
                button.addEventListener('click', e => {
                    this.modal.open()
                    e.preventDefault()
                })
            })
        }
    }

    initModalForm() {
        const csrf_token = document.querySelector('meta[name=csrf-token]')
        const form = document.querySelector('.modal form')
        const loader = form.querySelector('.loader')
        const button = form.querySelector('.btn')
        const results = form.querySelector('.results')
        if (form.length) {
            form.addEventListener('submit', e => {
                e.preventDefault()
                button.classList.add('disabled')
                loader.classList.add('show')
                results.innerHTML = ''
                let data = new FormData
                for (let i = 0; i < form.length; i++) {
                    const input = form[i]
                    if (input.name) {
                        data.set(input.name, input.value)
                    }
                }
                axios({
                    method: 'post',
                    url: form.action,
                    data: data,
                    headers: {
                        'x-requested-with': 'XMLHttpRequest',
                        'x-csrf-token': csrf_token.content,
                        'Content-Type': 'multipart/form-data',
                    }
                })
                    .then(res => {
                        loader.classList.remove('show')
                        button.classList.remove('disabled')
                        results.innerHTML = '<p>' + res.data + '</p>'
                    })
                    .catch(err => console.error(err))
            })
        }
    }

    initMusic() {
        const cheeky = document.getElementById('cheeky-tune')
        const play_btn = document.querySelector('.audio-controls .play')
        play_btn.addEventListener('click', () => {
            if (cheeky.paused) {
                cheeky.play()
            } else {
                cheeky.pause()
            }
        })
        cheeky.addEventListener('play', () => {
            play_btn.innerHTML = '| |'
        })
        cheeky.addEventListener('pause', () => {
            play_btn.innerHTML = '&#9658;'
        })
    }

    initMap() {
        if (!document.getElementById('map')) {
            return
        }
        const marker_bg = {
            url: '/img/home/map-marker.png',
            labelOrigin: { x: 60, y: 80 },
            scaledSize: new google.maps.Size(60, 60)
        }
        const map_style = [{ "elementType": "geometry", "stylers": [{ "color": "#2a0a2e" }] }, { "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "elementType": "labels.text.fill", "stylers": [{ "color": "#616161" }, { "visibility": "simplified" }] }, { "elementType": "labels.text.stroke", "stylers": [{ "color": "#b885c5" }] }, { "featureType": "administrative.land_parcel", "elementType": "labels.text.fill", "stylers": [{ "color": "#bdbdbd" }] }, { "featureType": "poi", "elementType": "geometry", "stylers": [{ "color": "#2a0a2e" }, { "visibility": "simplified" }] }, { "featureType": "poi", "elementType": "labels.text.fill", "stylers": [{ "color": "#757575" }] }, { "featureType": "poi.park", "elementType": "geometry", "stylers": [{ "color": "#2a0a2e" }] }, { "featureType": "poi.park", "elementType": "labels.text.fill", "stylers": [{ "color": "#9e9e9e" }] }, { "featureType": "road", "elementType": "geometry", "stylers": [{ "color": "#501458" }, { "visibility": "simplified" }] }, { "featureType": "road.arterial", "elementType": "labels.text.fill", "stylers": [{ "color": "#757575" }, { "visibility": "simplified" }] }, { "featureType": "road.highway", "elementType": "geometry", "stylers": [{ "color": "#6c1a78" }] }, { "featureType": "road.highway", "elementType": "labels.text.fill", "stylers": [{ "color": "#616161" }] }, { "featureType": "road.local", "elementType": "labels.text.fill", "stylers": [{ "color": "#9e9e9e" }] }, { "featureType": "transit.line", "elementType": "geometry", "stylers": [{ "color": "#e5e5e5" }] }, { "featureType": "transit.station", "elementType": "geometry", "stylers": [{ "color": "#eeeeee" }] }, { "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#501458" }] }, { "featureType": "water", "elementType": "labels.text.fill", "stylers": [{ "color": "#9e9e9e" }] }]
        const infowindow = new google.maps.InfoWindow()
        this.map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: -33.182211, lng: 150.474110 },
            zoom: 7.2,
            styles: map_style,
            disableDefaultUI: true
        })
        this.markers = [
            {
                title: 'Ulladulla',
                position: { lat: -35.357570, lng: 150.473500 }
            },
            {
                title: 'Bankstown',
                position: { lat: -33.913160, lng: 151.034670 }
            },
            {
                title: 'Lidcombe',
                position: { lat: -33.864690, lng: 151.043630 }
            },
            {
                title: 'Jervis Bay',
                position: { lat: -35.140020, lng: 150.728240 }
            },
            {
                title: 'Mt Prichard',
                position: { lat: -33.902250, lng: 150.896850 }
            },
            {
                title: 'Port Maquarie',
                position: { lat: -31.430700, lng: 152.906330 }
            }
        ].map(location => {
            let marker = new google.maps.Marker({
                map: this.map,
                title: location.title,
                position: location.position,
                icon: marker_bg
            })
            marker.addListener('mouseover', () => {
                infowindow.setContent('<span class="title">' + location.title + '</span>')
                infowindow.open(this.map, marker)
            })
            return marker
        })
    }

    initHero() {
        this.hero_items = Array.from(document.querySelectorAll('.hero [data-item]')).map((i, x) => {
            return {
                label: i,
                item: document.querySelector('.hero .' + i.getAttribute('data-item'))
            }
        })
        this.hero_items.map((i, x) => {
            i.label.addEventListener('mouseenter', () => {
                this.stopHeroTimer()
                this.showHeroSlide(x)
                this.slide_counter = x + 1
            })
            i.label.addEventListener('touchstart', () => {
                this.stopHeroTimer()
                this.showHeroSlide(x)
                this.slide_counter = x + 1
                setTimeout(this.startHeroTimer.bind(this), 2000)
            })
            i.label.addEventListener('mouseleave', this.startHeroTimer.bind(this))
        })
        this.startHeroTimer()
    }

    startHeroTimer() {
        this.stopHeroTimer()
        this.slide_counter = 0
        this.timer = setInterval(() => {
            this.showHeroSlide(this.slide_counter % this.hero_items.length)
            this.slide_counter++
        }, 4000)
    }

    stopHeroTimer() {
        clearTimeout(this.timer)
    }

    showHeroSlide(index) {
        this.hero_items.forEach(item => {
            const active = item.item == this.hero_items[index].item
            item.item.style.display = active ? 'block' : 'none'
            if (active) {
                item.label.classList.add('active')
                if (item.item.classList.contains('laser-gun')) {
                    setTimeout(this.shootLaser, 360)
                } else {
                    this.killLaser()
                }
            } else {
                item.label.classList.remove('active')
            }
        })
    }

    shootLaser() {
        const nob = document.getElementById('nob')
        const nob_offset = nob.getBoundingClientRect()
        let laser = document.querySelector('.laser-glow')
        if (!laser) {
            laser = document.createElement('span')
            laser.classList.add('laser-glow')
            document.body.appendChild(laser)
        }
        laser.style.top = nob_offset.top + window.scrollY + 15 + 'px'
        laser.style.left = nob_offset.left + window.scrollX + 15 + 'px'
    }

    killLaser() {
        let laser = document.querySelector('.laser-glow')
        if (laser) {
            laser.parentNode.removeChild(laser)
        }
    }
}

window.front_end = new FrontEnd
