import AppContainer from './AppContainer';

const context = {
  className: 'container',
  block: null,
};

describe('new AppContainer', () => {
  const newObj = new AppContainer(context.className, context.parentBlock, context.size);
  it('Should be an instance of Object', () => {
    expect(newObj).toBeInstanceOf(Object);
  });
  it('Should be contain right parameters', () => {
    expect(newObj.className).toBe('container');
    expect(newObj.block).toBeNull();
  });
});

describe('AppContainer.prototype.render', () => {
  it('Should be an instance of Function', () => {
    expect(AppContainer.prototype.render).toBeInstanceOf(Function);
  });

  AppContainer.prototype.render.call(context);
  it('Should be render container', () => {
    expect(document.body.innerHTML).toMatchSnapshot();
  });
  it('Block should be not null', () => {
    expect(context.block).not.toBeNull();
  });
});
