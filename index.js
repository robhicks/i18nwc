'use strict';

var I18n = function I18n(message, options) {
  var this$1 = this;
  if ( message === void 0 ) message = {};
  if ( options === void 0 ) options = {};

  this.options = options;
  this.message = message;
  this.splitter = options.splitter || '::';
  return function () {
    var key = [], len = arguments.length;
    while ( len-- ) key[ len ] = arguments[ len ];

    var replacements, count;
    if (key[1] && typeof key[1] === 'object') { replacements = key[1]; }
    else if (key[2] && typeof key[2] === 'object') { replacements = key[2]; }
    if (Number.isInteger(key[1])) { count = key[1]; }
    else if(Number.isInteger(key[2])) { count = key[2]; }

    var translation = this$1.getTranslation(key[0]);

    if (count !== null && replacements) {
      replacements.n = replacements.n ? replacements.n : count;

      //get appropriate plural translation string
      translation = this$1.getPlural(translation, count);
    }

    //replace {placeholders}
    translation = this$1.replacePlaceholders(translation, replacements);

    if (translation === null) {
      console.warn('Translation for "' + key + '" not found.');
    }

    return translation;
  };
};

I18n.prototype.getTranslation = function getTranslation (key) {
  if (!key) { return null; }
  if (this.message.hasOwnProperty(key)) { return this.message[key]; }
  try {
    var components = key.split(this.splitter);
    var namespace = components[0];
    var _key = components[1];
    if (this.message.hasOwnProperty(namespace) && this.message[namespace][_key]) { return this.message[namespace][_key]; }
    return null;
  } catch(e) {
    return null;
  }
};

I18n.prototype.getPlural = function getPlural (translation, count) {
  var i, _translation, upper;
  if (typeof translation === 'object') {
    var keys = Object.keys(translation);
    if (keys.length === 0) { return null; }
    for (i = 0; i < keys.length; i++) {
      if (keys[i].indexOf('gt' === 0)) { upper = parseInt(keys[i].replace('gt', ''), 10); }
    }
    if (translation[count]) { _translation = translation[count]; }
    else if (count > upper) { _translation = translation['gt' + upper]; }
    else if (translation.n) { _translation = translation.n; }
    else { _translation = translation[Object.keys(translation).reverse()[0]]; }

    return _translation;
  }

};

I18n.prototype.replacePlaceholders = function replacePlaceholders (translation, replacements) {
  if (typeof translation === 'string') {
    return translation.replace(/\{(\w*)\}/g, (function (match, key) {
      if (!replacements.hasOwnProperty(key)) {
        console.log('Could not find replacement for ', key, 'in replacements object:', replacements);
        return '{' + key + '}';
      }
    }));
  }
  return translation;
};

module.exports = I18n;
