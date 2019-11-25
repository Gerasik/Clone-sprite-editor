import AppMainCanvas from './AppMainCanvas';

const context = {
  className: 'main',
  parentBlock: document.body,
  block: null,
  size: 14,
}

describe('new AppMainCanvas', () => {
  const newObj = new AppMainCanvas(context.className, context.parentBlock, context.size);
  it('Should be an instance of Object', () => {
    expect(newObj).toBeInstanceOf(Object);
  });
  it('Should be contain right parameters', () => {
    expect(newObj.className).toBe('main');
    expect(newObj.parentBlock).toBe(document.body);
    expect(newObj.block).toBe(null);
    expect(newObj.size).toBe(14);
  });
});

describe('AppMainCanvas.prototype.render', () => {
  it('Should be an instance of Function', () => {
    expect(AppMainCanvas.prototype.render).toBeInstanceOf(Function);
  });

  it('Should be render main canvas', () => {
    AppMainCanvas.prototype.render.call(context);
    expect(document.body.innerHTML).toMatchSnapshot();
  });
});
