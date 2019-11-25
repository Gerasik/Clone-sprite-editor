import AppHeader from './AppHeader';

describe('new AppHeader', () => {
  it('Should be an instance of Object', () => {
    expect(new AppHeader('header')).toBeInstanceOf(Object);
  });
  it('Should be contain right parameters', () => {
    const newObj = new AppHeader('tools');
    expect(newObj.className).toBe('tools');
    expect(newObj.block).toBe(null);
  });
});

describe('AppHeader.prototype.render', () => {
  it('Should be an instance of Function', () => {
    expect(AppHeader.prototype.render).toBeInstanceOf(Function);
  });

  it('Should be render slide', () => {
    AppHeader.prototype.render();
    expect(document.body.innerHTML).toMatchSnapshot();
  });
});
