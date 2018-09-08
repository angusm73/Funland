'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FrontEnd = function () {
    function FrontEnd() {
        _classCallCheck(this, FrontEnd);

        // this.initModal()
        // this.initModalForm()
        this.initMusic();
        this.initHero();

        document.addEventListener("touchstart", function () {}, false);
    }

    _createClass(FrontEnd, [{
        key: 'initModal',
        value: function initModal() {
            var _this = this;

            var overlay = document.querySelector('.overlay');
            var modal = document.querySelector('.modal');
            var close_btn = document.querySelector('.modal .close');
            var buttons = document.querySelectorAll('.join-now');
            var open_modal = null;

            this.modal = {
                open: function open(modal_class) {
                    overlay.classList.add('show');
                    if (modal_class) {
                        document.querySelector(modal_class).style.display = 'block';
                        open_modal = modal_class;
                    } else {
                        modal.style.display = 'block';
                    }
                },
                close: function close(modal_class) {
                    overlay.classList.remove('show');
                    if (modal_class) {
                        document.querySelector(modal_class).style.display = 'none';
                        open_modal = null;
                    } else {
                        modal.style.display = 'none';
                    }
                }

                /* Modal events */
            };close_btn.addEventListener('click', function (e) {
                _this.modal.close(open_modal);
                e.preventDefault();
            });
            overlay.addEventListener('click', function (e) {
                _this.modal.close(open_modal);
            });
            document.addEventListener('keydown', function (e) {
                var kc = e.keyCode ? e.keyCode : e.which;
                if (kc == 27) {
                    _this.modal.close(open_modal);
                }
            });
            if (buttons.length) {
                buttons.forEach(function (button) {
                    button.addEventListener('click', function (e) {
                        _this.modal.open();
                        e.preventDefault();
                    });
                });
            }
        }
    }, {
        key: 'initModalForm',
        value: function initModalForm() {
            var csrf_token = document.querySelector('meta[name=csrf-token]');
            var form = document.querySelector('.modal form');
            var loader = form.querySelector('.loader');
            var button = form.querySelector('.btn');
            var results = form.querySelector('.results');
            if (form.length) {
                form.addEventListener('submit', function (e) {
                    e.preventDefault();
                    button.classList.add('disabled');
                    loader.classList.add('show');
                    results.innerHTML = '';
                    var data = new FormData();
                    for (var i = 0; i < form.length; i++) {
                        var input = form[i];
                        if (input.name) {
                            data.set(input.name, input.value);
                        }
                    }
                    axios({
                        method: 'post',
                        url: form.action,
                        data: data,
                        headers: {
                            'x-requested-with': 'XMLHttpRequest',
                            'x-csrf-token': csrf_token.content,
                            'Content-Type': 'multipart/form-data'
                        }
                    }).then(function (res) {
                        loader.classList.remove('show');
                        button.classList.remove('disabled');
                        results.innerHTML = '<p>' + res.data + '</p>';
                    }).catch(function (err) {
                        return console.error(err);
                    });
                });
            }
        }
    }, {
        key: 'initMusic',
        value: function initMusic() {
            var cheeky = document.getElementById('cheeky-tune');
            var play_btn = document.querySelector('.audio-controls .play');
            play_btn.addEventListener('click', function () {
                if (cheeky.paused) {
                    cheeky.play();
                } else {
                    cheeky.pause();
                }
            });
            cheeky.addEventListener('play', function () {
                play_btn.innerHTML = '| |';
            });
            cheeky.addEventListener('pause', function () {
                play_btn.innerHTML = '&#9658;';
            });
        }
    }, {
        key: 'initMap',
        value: function initMap() {
            var _this2 = this;

            if (!document.getElementById('map')) {
                return;
            }
            var marker_bg = {
                url: '/img/home/map-marker.png',
                labelOrigin: { x: 60, y: 80 },
                scaledSize: new google.maps.Size(60, 60)
            };
            var map_style = [{ "elementType": "geometry", "stylers": [{ "color": "#2a0a2e" }] }, { "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "elementType": "labels.text.fill", "stylers": [{ "color": "#616161" }, { "visibility": "simplified" }] }, { "elementType": "labels.text.stroke", "stylers": [{ "color": "#b885c5" }] }, { "featureType": "administrative.land_parcel", "elementType": "labels.text.fill", "stylers": [{ "color": "#bdbdbd" }] }, { "featureType": "poi", "elementType": "geometry", "stylers": [{ "color": "#2a0a2e" }, { "visibility": "simplified" }] }, { "featureType": "poi", "elementType": "labels.text.fill", "stylers": [{ "color": "#757575" }] }, { "featureType": "poi.park", "elementType": "geometry", "stylers": [{ "color": "#2a0a2e" }] }, { "featureType": "poi.park", "elementType": "labels.text.fill", "stylers": [{ "color": "#9e9e9e" }] }, { "featureType": "road", "elementType": "geometry", "stylers": [{ "color": "#501458" }, { "visibility": "simplified" }] }, { "featureType": "road.arterial", "elementType": "labels.text.fill", "stylers": [{ "color": "#757575" }, { "visibility": "simplified" }] }, { "featureType": "road.highway", "elementType": "geometry", "stylers": [{ "color": "#6c1a78" }] }, { "featureType": "road.highway", "elementType": "labels.text.fill", "stylers": [{ "color": "#616161" }] }, { "featureType": "road.local", "elementType": "labels.text.fill", "stylers": [{ "color": "#9e9e9e" }] }, { "featureType": "transit.line", "elementType": "geometry", "stylers": [{ "color": "#e5e5e5" }] }, { "featureType": "transit.station", "elementType": "geometry", "stylers": [{ "color": "#eeeeee" }] }, { "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#501458" }] }, { "featureType": "water", "elementType": "labels.text.fill", "stylers": [{ "color": "#9e9e9e" }] }];
            var infowindow = new google.maps.InfoWindow();
            this.map = new google.maps.Map(document.getElementById('map'), {
                center: { lat: -33.182211, lng: 150.474110 },
                zoom: 7.2,
                styles: map_style,
                disableDefaultUI: true
            });
            this.markers = [{
                title: 'Ulladulla',
                position: { lat: -35.357570, lng: 150.473500 }
            }, {
                title: 'Bankstown',
                position: { lat: -33.913160, lng: 151.034670 }
            }, {
                title: 'Lidcombe',
                position: { lat: -33.864690, lng: 151.043630 }
            }, {
                title: 'Jervis Bay',
                position: { lat: -35.140020, lng: 150.728240 }
            }, {
                title: 'Mt Prichard',
                position: { lat: -33.902250, lng: 150.896850 }
            }, {
                title: 'Port Maquarie',
                position: { lat: -31.430700, lng: 152.906330 }
            }].map(function (location) {
                var marker = new google.maps.Marker({
                    map: _this2.map,
                    title: location.title,
                    position: location.position,
                    icon: marker_bg
                });
                marker.addListener('mouseover', function () {
                    infowindow.setContent('<span class="title">' + location.title + '</span>');
                    infowindow.open(_this2.map, marker);
                });
                return marker;
            });
        }
    }, {
        key: 'initHero',
        value: function initHero() {
            var _this3 = this;

            this.hero_items = Array.from(document.querySelectorAll('.hero [data-item]')).map(function (i, x) {
                return {
                    label: i,
                    item: document.querySelector('.hero .' + i.getAttribute('data-item'))
                };
            });
            this.hero_items.map(function (i, x) {
                i.label.addEventListener('mouseenter', function () {
                    _this3.stopHeroTimer();
                    _this3.showHeroSlide(x);
                    _this3.slide_counter = x + 1;
                });
                i.label.addEventListener('touchstart', function () {
                    _this3.stopHeroTimer();
                    _this3.showHeroSlide(x);
                    _this3.slide_counter = x + 1;
                    setTimeout(_this3.startHeroTimer.bind(_this3), 2000);
                });
                i.label.addEventListener('mouseleave', _this3.startHeroTimer.bind(_this3));
            });
            this.startHeroTimer();
        }
    }, {
        key: 'startHeroTimer',
        value: function startHeroTimer() {
            var _this4 = this;

            this.stopHeroTimer();
            this.slide_counter = 0;
            this.timer = setInterval(function () {
                _this4.showHeroSlide(_this4.slide_counter % _this4.hero_items.length);
                _this4.slide_counter++;
            }, 4000);
        }
    }, {
        key: 'stopHeroTimer',
        value: function stopHeroTimer() {
            clearTimeout(this.timer);
        }
    }, {
        key: 'showHeroSlide',
        value: function showHeroSlide(index) {
            var _this5 = this;

            this.hero_items.forEach(function (item) {
                var active = item.item == _this5.hero_items[index].item;
                item.item.style.display = active ? 'block' : 'none';
                if (active) {
                    item.label.classList.add('active');
                    if (item.item.classList.contains('laser-gun')) {
                        setTimeout(_this5.shootLaser, 360);
                    } else {
                        _this5.killLaser();
                    }
                } else {
                    item.label.classList.remove('active');
                }
            });
        }
    }, {
        key: 'shootLaser',
        value: function shootLaser() {
            var nob = document.getElementById('nob');
            var nob_offset = nob.getBoundingClientRect();
            var laser = document.querySelector('.laser-glow');
            if (!laser) {
                laser = document.createElement('span');
                laser.classList.add('laser-glow');
                document.body.appendChild(laser);
            }
            laser.style.top = nob_offset.top + window.scrollY + 15 + 'px';
            laser.style.left = nob_offset.left + window.scrollX + 15 + 'px';
        }
    }, {
        key: 'killLaser',
        value: function killLaser() {
            var laser = document.querySelector('.laser-glow');
            if (laser) {
                laser.parentNode.removeChild(laser);
            }
        }
    }]);

    return FrontEnd;
}();

window.front_end = new FrontEnd();
//# sourceMappingURL=main.js.map
