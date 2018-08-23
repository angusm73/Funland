'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Admin = function () {
    function Admin() {
        _classCallCheck(this, Admin);

        this.focused = null;
        this.elements = [];
        this.initElements();
        this.initHeader();
    }

    _createClass(Admin, [{
        key: 'initHeader',
        value: function initHeader() {
            var header = document.querySelector('.admin-header');
            var toggle_button = header.querySelector('.toggle-page-content');
            var content = header.querySelector('.page-content');
            var page_select = document.getElementById('page');
            toggle_button.addEventListener('click', function (e) {
                content.classList.toggle('collapse');
                e.preventDefault();
            });
            page_select.addEventListener('change', function (e) {
                var new_url = page_select.options[page_select.selectedIndex].getAttribute('data-url');
                if (new_url != location.pathname) {
                    location.href = new_url;
                }
            });
        }
    }, {
        key: 'initElements',
        value: function initElements() {
            var self = this;
            var editable_items = ['.main-nav a', '.header .cta-wrapper > *', '.hero .info > *', '.cta .swf > *', '.cfj .about > *', '.cfj .link', '.zuu .about > *', '.zuu .link', '.about .inner > *', '.map .inner > *', '.footer-nav a', '.services .swf > *', '.services .swf > div p'];
            editable_items.forEach(function (selector) {
                var items = document.querySelectorAll(selector);
                if (items.length) {
                    items.forEach(function (element) {
                        if (!element.id) {
                            return;
                        }
                        var item = {
                            key: element.id,
                            value: element.textContent.trim(),
                            el: element
                        };
                        element.style.cursor = 'cell';
                        element.addEventListener('click', function (e) {
                            self.focusElement(item);
                            e.preventDefault();
                            e.stopImmediatePropagation();
                            e.stopPropagation();
                            return false;
                        });
                        element.addEventListener('keydown', function (e) {
                            var kc = e.keyCode ? e.keyCode : e.which;
                            if (e.metaKey && kc == 13) {
                                element.blur();
                            }
                        });
                        element.addEventListener('blur', function (e) {
                            self.saveElement(item);
                        });
                        self.elements.push(item);
                    });
                }
            });
            this.showMsg('Editing tools ready! ヽ(´▽`)/');
        }
    }, {
        key: 'updateElement',
        value: function updateElement(name, value) {
            var csrf_token = document.querySelector('meta[name=csrf-token]');
            var page_id = document.getElementById('page').value;
            var data = new FormData();
            data.set(name, value);
            data.set('page', page_id);
            return axios({
                method: 'post',
                url: '/update.php',
                data: data,
                headers: {
                    'x-requested-with': 'XMLHttpRequest',
                    'x-csrf-token': csrf_token.content,
                    'Content-Type': 'multipart/form-data'
                }
            }).then(function (res) {
                return res.data;
            }).catch(function (err) {
                return console.error(err);
            });
        }
    }, {
        key: 'focusElement',
        value: function focusElement(cur_item) {
            this.focused = cur_item;
            this.elements.forEach(function (item) {
                if (item != cur_item) {
                    item.el.style.backgroundColor = '';
                    item.el.style.color = '';
                    item.el.contentEditable = false;
                }
            });
            cur_item.el.style.backgroundColor = '#138771';
            cur_item.el.style.color = '#2C3539';
            cur_item.el.contentEditable = true;
            cur_item.el.focus();
        }
    }, {
        key: 'saveElement',
        value: function saveElement(item) {
            this.updateElement(item.key, item.el.innerText.trim()).then(function (result) {
                if (result == 'success') {
                    item.el.style.backgroundColor = '';
                    item.el.style.color = '';
                    item.el.contentEditable = false;
                } else {
                    console.log(result);
                }
            });
        }
    }, {
        key: 'showMsg',
        value: function showMsg(msg) {
            var notification = document.createElement('div');
            notification.classList.add('notify');
            notification.innerHTML = msg;
            document.body.appendChild(notification);
            setTimeout(function () {
                notification.classList.add('hide');
            }, 6000);
        }
    }]);

    return Admin;
}();

window.admin = new Admin();
//# sourceMappingURL=admin.js.map
