global.chai = require('chai');
global.sinon = require('sinon');
global.expect = chai.expect;
global.assert = chai.assert;

global.deepcopy = function(originalObject, newObject) {
  let stringifiedNewObject = JSON.stringify(newObject);
  let parsedNewObject = JSON.parse(stringifiedNewObject);
  return Object.assign(originalObject, parsedNewObject);
};

require('./I18n.test.js');
