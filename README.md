# i18n

This is a simple es2015 utility for i18n translations. It supports placeholders and various plurals. 

# Installation

Use npm, pnpm or yarn to install it. The main file is dist/I18n.es.js, which is referenced in package.json under module (for es6 modules). You may also try dist/I18n.cjs.js which is common js format, although it has not been used/tested/

# Use

```JavaScript
// langs.json
[
  {
    "key": "en",
    "translations": {
      "cancel": "Cancel",
      "checkout": "Checkout",
      "modal_body": "This is the modal body",
      "open": "Open",
      "title": "Find"
    }
  }
]
```

```JavaScript
import I18n from 'i18n';
import langs from './locales.json';

class MyComponent extends HTMLElement {
  constructor() {
    super();
    this.t = Function; // avoid errors when this.t is not defined.
  }

  attributeChangedCallback(name, oVal, nVal) {
    if (name === 'locale' && nVal !== oVal) {
      let lang = langs.find((_lang) => _lang.key === nVal);
      let translations = lang ? lang.translations : null;
      if (translations) this.t = new I18n(translations);
      this.updateView();
    } else if (name && nVal && nVal !== oVal) {
      this[name] = nVal;
      this.updateView();
    }
  }

  connectedCallback() {
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = `<style>${css}</style><div id="component-wrapper"></div>`;
    this.element = this.shadowRoot.querySelector('#component-wrapper');
    this.updateView();
  }

  disconnectedCallback() {

  }

  updateView() {
    // wrap in if. otherwise ff and safari fail
    if (this.element) patch(this.element, render, this);
  }

  static get observedAttributes() {
    return ['locale', 'show'];
  }
}

customElements.define('my-component', MyComponent);

export { MyComponent };
```

```html
<div class="overlay">
  <div class="modal">
    <div class="modal__header">
      <h4>{ctrl.t('title')}</h4>
      <button class="dialog__close"></button>
    </div>
    <div class="modal__body">
      <p>{ctrl.t('modal_body')}</p>
    </div>
    <div class="modal__buttons">
      <button class="button button--recommended">{ctrl.t('done')}</button>
      <button class="button button--minor">{ctrl.t('cancel')}</button>
    </div>
  </div>
</div>
```

# Notes

As of v.2, assets are not transpiled
As of v.3, if a translation is not found for a key, they key is returned.
