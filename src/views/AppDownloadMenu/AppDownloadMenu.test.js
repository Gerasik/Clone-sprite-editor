import AppDownloadMenu from './AppDownloadMenu';

const content = {
  className: 'menu',
  parentBlock: document.body,
};

describe('new AppDownloadMenu', () => {
  const obj = new AppDownloadMenu('menu', document.body);
  it('Should be an instance of Object', () => {
    expect(obj).toBeInstanceOf(Object);
  });
  it('Should be contain right parameters', () => {
    expect(obj.className).toBe(content.className);
  });
});

describe('AppDownloadMenu.prototype.render', () => {
  it('Should be an instance of Function', () => {
    expect(AppDownloadMenu.prototype.render.bind(content)).toBeInstanceOf(Function);
  });

  it('Should be render slide', () => {
    expect(AppDownloadMenu.prototype.render.bind(content)).toMatchSnapshot();
  });
  const ans = AppDownloadMenu.prototype.render.bind(content)();
  it('Should be create 3 child', () => {
    expect(ans.children.length).toBe(3);
  });
});
