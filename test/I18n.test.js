const I18n = require('../index.js');

describe('I18n', () => {
  it('should, when instantiated, return a function', () => {
    let i18n = new I18n();
    expect(i18n).to.exist;
    expect(i18n).to.be.a('function');
  });
  it('should get certain translations', () => {
    let t = new I18n({name: "Name", sex: "Male"});
    expect(t('name')).to.be.equal('Name');
    expect(t('sex')).to.be.equal('Male');
  });
  it('should return null if a translation cannot be found', () => {
    let t = new I18n({name: "Name", sex: "Male"});
    expect(t('firstName')).to.be.equal(null);
    expect(t('sex')).to.be.equal('Male');
  });
});
