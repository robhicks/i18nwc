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
  it('should return the key name if a translation cannot be found', () => {
    let t = new I18n({name: "Name", sex: "Male"});
    expect(t('firstName')).to.be.equal('firstName');
    expect(t('sex')).to.be.equal('Male');
  });
  it('should return a translation with a splitter', () => {
    let t = new I18n({foo: {name: 'bar'}});
    expect(t('foo::name')).to.be.equal('bar');
  });
  it('should return a translation with a custom splitter', () => {
    let t = new I18n({foo: {name: 'bar'}}, {splitter: '.'});
    expect(t('foo.name')).to.be.equal('bar');
  });

  it(`should replace placeholders`, () => {
    let translations = {
      results: "Show {viewCount} of {totalCount} Results"
    }
    let t = new I18n(translations);
    expect(t('results')).to.be.equal("Show {viewCount} of {totalCount} Results");
    expect(t('results', {viewCount: 20, totalCount: 100})).to.be.equal("Show 20 of 100 Results");
  });

});
