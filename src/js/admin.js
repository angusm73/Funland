class Admin {
  constructor() {
    this.focused = null;
    this.elements = [];
    this.initElements();
    this.initHeader();
  }

  initHeader() {
    const header = document.querySelector('.admin-header');
    const toggle_button = header.querySelector('.toggle-page-content');
    const content = header.querySelector('.page-content');
    const page_select = document.getElementById('page');
    toggle_button.addEventListener('click', e => {
      content.classList.toggle('collapse');
      e.preventDefault();
    });
    page_select.addEventListener('change', e => {
      const new_url = page_select.options[page_select.selectedIndex].getAttribute('data-url');

      if (new_url != location.pathname) {
        location.href = new_url;
      }
    });
  }

  initElements() {
    const self = this;
    const editable_items = ['.main-nav a', '.header .cta-wrapper > *', '.hero .info > *', '.cta .swf > *', '.cfj .about > *', '.cfj .link', '.zuu .about > *', '.zuu .link', '.about .inner > *', '.map .inner > *', '.footer-nav a', '.services .swf > *', '.services .swf > div p'];
    editable_items.forEach(selector => {
      let items = document.querySelectorAll(selector);

      if (items.length) {
        items.forEach(element => {
          if (!element.id) {
            return;
          }

          let item = {
            key: element.id,
            value: element.textContent.trim(),
            el: element
          };
          element.style.cursor = 'cell';
          element.addEventListener('click', e => {
            self.focusElement(item);
            e.preventDefault();
            e.stopImmediatePropagation();
            e.stopPropagation();
            return false;
          });
          element.addEventListener('keydown', e => {
            let kc = e.keyCode ? e.keyCode : e.which;

            if (e.metaKey && kc == 13) {
              element.blur();
            }
          });
          element.addEventListener('blur', e => {
            self.saveElement(item);
          });
          self.elements.push(item);
        });
      }
    });
    this.showMsg('Editing tools ready! ヽ(´▽`)/');
  }

  updateElement(name, value) {
    const csrf_token = document.querySelector('meta[name=csrf-token]');
    const page_id = document.getElementById('page').value;
    let data = new FormData();
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
    }).then(res => res.data).catch(err => console.error(err));
  }

  focusElement(cur_item) {
    this.focused = cur_item;
    this.elements.forEach(item => {
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

  saveElement(item) {
    this.updateElement(item.key, item.el.innerText.trim()).then(result => {
      if (result == 'success') {
        item.el.style.backgroundColor = '';
        item.el.style.color = '';
        item.el.contentEditable = false;
      } else {
        console.log(result);
      }
    });
  }

  showMsg(msg) {
    const notification = document.createElement('div');
    notification.classList.add('notify');
    notification.innerHTML = msg;
    document.body.appendChild(notification);
    setTimeout(() => {
      notification.classList.add('hide');
    }, 6000);
  }

}

window.admin = new Admin();
//# sourceMappingURL=admin.js.map
