class I18n {
  constructor(message = {}, options = {}) {
    this.options = options;
    this.message = message;
    this.splitter = options.splitter || '::';

    return (...key) => {
      let replacements, count;

      if (key[1] && typeof key[1] === 'object') replacements = key[1];
      else if (key[2] && typeof key[2] === 'object') replacements = key[2];

      if (Number.isInteger(key[1])) count = key[1];
      else if(Number.isInteger(key[2])) count = key[2];

      let translation = this.getTranslation(key[0]);

      if (count && replacements) {
        replacements.n = replacements.n ? replacements.n : count;

        //get appropriate plural translation string
        translation = this.getPlural(translation, count);
      }

      //replace {placeholders}
      if (replacements) translation = this.replacePlaceholders(translation, replacements);

      if (!translation === null) {
        console.warn('Translation for "' + key + '" not found.');
      }

      return translation;
    };
  }

  getTranslation(key) {
    if (!key) return null;
    if (this.message.hasOwnProperty(key)) return this.message[key];
    try {
      let components = key.split(this.splitter);
      let namespace = components[0];
      let _key = components[1];
      if (this.message.hasOwnProperty(namespace) && this.message[namespace][_key]) return this.message[namespace][_key];
      return null;
    } catch(e) {
      return null;
    }
  }

  getPlural(translation, count) {
    let i, _translation, upper;
    if (typeof translation === 'object') {
      let keys = Object.keys(translation);
      if (keys.length === 0) return null;
      for (i = 0; i < keys.length; i++) {
        if (keys[i].indexOf('gt' === 0)) upper = parseInt(keys[i].replace('gt', ''), 10);
      }
      if (translation[count]) _translation = translation[count];
      else if (count > upper) _translation = translation['gt' + upper];
      else if (translation.n) _translation = translation.n;
      else _translation = translation[Object.keys(translation).reverse()[0]];

      return _translation;
    }

  }

  replacePlaceholders(translation, replacements) {
    let t = typeof translation === 'string'
      ? translation.replace(/\{(\w*)\}/g, (match, key) => replacements[key])
      : translation;

    return t;
  }

}

export default I18n;
