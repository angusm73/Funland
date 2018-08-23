class FrontEnd {

    constructor() {
        // this.initModal()
        // this.initModalForm()
        this.initBackground()
        this.initMusic()
        this.initHero()
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

    initMap() {
        if (!document.getElementById('map')) {
            return
        }
        let map_style = [{ "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "elementType": "labels.text.fill", "stylers": [{ "color": "#ffffff" }] }, { "elementType": "labels.text.stroke", "stylers": [{ "color": "#2c3539" }] }, { "featureType": "administrative", "elementType": "geometry", "stylers": [{ "color": "#757575" }, { "visibility": "off" }] }, { "featureType": "administrative.country", "elementType": "labels.text.fill", "stylers": [{ "color": "#ffffff" }] }, { "featureType": "administrative.country", "elementType": "labels.text.stroke", "stylers": [{ "color": "#2c3539" }] }, { "featureType": "administrative.locality", "elementType": "labels.text.fill", "stylers": [{ "color": "#ffffff" }] }, { "featureType": "administrative.locality", "elementType": "labels.text.stroke", "stylers": [{ "color": "#2c3539" }, { "weight": 3.5 }] }, { "featureType": "poi", "stylers": [{ "visibility": "off" }] }, { "featureType": "poi", "elementType": "labels.text.fill", "stylers": [{ "color": "#ffffff" }] }, { "featureType": "poi", "elementType": "labels.text.stroke", "stylers": [{ "color": "#2c3539" }] }, { "featureType": "poi.park", "elementType": "geometry", "stylers": [{ "color": "#181818" }] }, { "featureType": "poi.park", "elementType": "labels.text.fill", "stylers": [{ "color": "#ffffff" }] }, { "featureType": "poi.park", "elementType": "labels.text.stroke", "stylers": [{ "color": "#2c3539" }] }, { "featureType": "road", "elementType": "geometry.fill", "stylers": [{ "color": "#138771" }] }, { "featureType": "road", "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "featureType": "road", "elementType": "labels.text.fill", "stylers": [{ "color": "#ffffff" }] }, { "featureType": "road", "elementType": "labels.text.stroke", "stylers": [{ "color": "#2c3539" }] }, { "featureType": "road.arterial", "elementType": "geometry", "stylers": [{ "color": "#138771" }] }, { "featureType": "road.highway", "elementType": "geometry", "stylers": [{ "color": "#138771" }] }, { "featureType": "road.highway", "elementType": "labels.text.fill", "stylers": [{ "color": "#ffffff" }] }, { "featureType": "road.highway", "elementType": "labels.text.stroke", "stylers": [{ "color": "#2c3539" }, { "weight": 1 }] }, { "featureType": "road.highway.controlled_access", "elementType": "geometry", "stylers": [{ "color": "#138771" }] }, { "featureType": "road.local", "elementType": "labels.text.fill", "stylers": [{ "color": "#ffffff" }] }, { "featureType": "road.local", "elementType": "labels.text.stroke", "stylers": [{ "color": "#2c3539" }, { "weight": 1.5 }] }, { "featureType": "transit", "stylers": [{ "visibility": "off" }] }, { "featureType": "transit", "elementType": "labels.text.fill", "stylers": [{ "color": "#757575" }] }, { "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#2c3539" }] }, { "featureType": "water", "elementType": "labels.text.fill", "stylers": [{ "color": "#3d3d3d" }] }]
        this.location = { lat: -35.362211, lng: 150.474110 }
        this.map = new google.maps.Map(document.getElementById('map'), {
            center: this.location,
            zoom: 15,
            styles: map_style
        })
        this.marker = new google.maps.Marker({
            map: this.map,
            position: this.location
        })
    }

    initBackground() {
        let background = document.createElement('div')
        let shapes = []
        let distance = (x1, y1, x2, y2) => {
            return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1))
        }
        let create_shape = () => {
            let x = Math.random() * 100
            let y = Math.random() * 100
            for (let i = 0; i < shapes.length; i++) {
                const shape = shapes[i];
                if (distance(shape.x, shape.y, x, y) < 10) {
                    console.count('fails')
                    return
                }
            }

            let el = document.createElement('span')
            if (shapes.length < 10) {
                el.classList.add('squiggle')
                el.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="362" height="42.125" viewBox="0 0 362 42.125"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="10px" fill-rule="evenodd" d="M25,160c10.473-19.526,21.555-33.2,32-32,14.376,1.653,19.472,32,32,32,12.873,0,19.127-32,32-32s19.127,32,32,32,19.127-32,32-32,19.127,32,32,32,19.127-32,32-32,19.127,32,32,32,19.127-32,32-32c12.527,0,17.624,30.347,32,32,10.445,1.2,21.527-12.474,32-32" transform="translate(-20 -122.938)"/></svg>'
            } else if (shapes.length < 15) {
                el.classList.add('bubbles')
            } else if (shapes.length < 40) {
                el.classList.add('square')
            } else {
                el.classList.add('triangle')
                el.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="226" height="199" viewBox="0 0 226 199"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="12px" fill-rule="evenodd" d="M21,235L128,48,235,235H21Z" transform="translate(-15 -42)"/></svg>'
            }
            el.style.transform = 'rotate(' + (Math.round(Math.random() * 18) * 20) + 'deg)'
            el.classList.add('color-' + Math.min(3, Math.floor(Math.random() * 4 + 1)))
            el.style.left = x + '%'
            el.style.top = y + '%'
            background.appendChild(el)
            shapes.push({ el, x, y })
        }
        background.classList.add('background')
        // Create 100 random shapes
        while (shapes.length < 60) {
            create_shape()
        }
        document.body.insertBefore(background, document.body.childNodes[0])
    }

    initMusic() {
        const music = document.getElementById('bg-music')
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
        music.play()
    }

    initMap() {
        if (!document.getElementById('map')) {
            return
        }
        let map_style = [{ "elementType": "geometry", "stylers": [{ "color": "#2a0a2e" }] }, { "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "elementType": "labels.text.fill", "stylers": [{ "color": "#616161" }, { "visibility": "simplified" }] }, { "elementType": "labels.text.stroke", "stylers": [{ "color": "#b885c5" }] }, { "featureType": "administrative.land_parcel", "elementType": "labels.text.fill", "stylers": [{ "color": "#bdbdbd" }] }, { "featureType": "poi", "elementType": "geometry", "stylers": [{ "color": "#2a0a2e" }, { "visibility": "simplified" }] }, { "featureType": "poi", "elementType": "labels.text.fill", "stylers": [{ "color": "#757575" }] }, { "featureType": "poi.park", "elementType": "geometry", "stylers": [{ "color": "#2a0a2e" }] }, { "featureType": "poi.park", "elementType": "labels.text.fill", "stylers": [{ "color": "#9e9e9e" }] }, { "featureType": "road", "elementType": "geometry", "stylers": [{ "color": "#501458" }, { "visibility": "simplified" }] }, { "featureType": "road.arterial", "elementType": "labels.text.fill", "stylers": [{ "color": "#757575" }, { "visibility": "simplified" }] }, { "featureType": "road.highway", "elementType": "geometry", "stylers": [{ "color": "#6c1a78" }] }, { "featureType": "road.highway", "elementType": "labels.text.fill", "stylers": [{ "color": "#616161" }] }, { "featureType": "road.local", "elementType": "labels.text.fill", "stylers": [{ "color": "#9e9e9e" }] }, { "featureType": "transit.line", "elementType": "geometry", "stylers": [{ "color": "#e5e5e5" }] }, { "featureType": "transit.station", "elementType": "geometry", "stylers": [{ "color": "#eeeeee" }] }, { "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#501458" }] }, { "featureType": "water", "elementType": "labels.text.fill", "stylers": [{ "color": "#9e9e9e" }] }]
        this.map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: -33.182211, lng: 150.474110 },
            zoom: 7.2,
            styles: map_style,
            disableDefaultUI: true
        })
        this.markers = [
            {
                label: 'Ulladulla',
                position: { lat: -35.357570, lng: 150.473500 }
            },
            {
                label: 'Bankstown',
                position: { lat: -33.913160, lng: 151.034670 }
            },
            {
                label: 'Lidcombe',
                position: { lat: -33.864690, lng: 151.043630 }
            },
            {
                label: 'Jervis Bay',
                position: { lat: -35.140020, lng: 150.728240 }
            },
            {
                label: 'Mt Prichard',
                position: { lat: -33.902250, lng: 150.896850 }
            },
            {
                label: 'Port Maquarie',
                position: { lat: -31.430700, lng: 152.906330 }
            }
        ].map(location => {
            console.log(location)
            return new google.maps.Marker({
                map: this.map,
                label: location.label,
                position: location.position
            })
        })
    }

    initHero() {
        const items = Array.from(document.querySelectorAll('.hero [data-item]')).map(i => {
            return {
                label: i,
                item: document.querySelector('.hero .' + i.getAttribute('data-item'))
            }
        })
        // this.shootLaser()
        // Loop through hero items
        let i = 0;
        setInterval(() => {
            items.forEach(item => {
                const active = item.item == items[i % items.length].item
                item.item.style.display = active ? 'block' : 'none'
                if (active) {
                    item.label.classList.add('active')
                } else {
                    item.label.classList.remove('active')
                }
            })
            i++;
        }, 3000)
    }

    shootLaser() {
        const nob = document.getElementById('nob')
        const nob_offset = nob.getBoundingClientRect()
        let laser = document.createElement('span')
        laser.classList.add('laser-glow')
        laser.style.top = nob_offset.top + 15 + 'px'
        laser.style.left = nob_offset.left + 15 + 'px'
        document.body.appendChild(laser)
    }
}

window.front_end = new FrontEnd
