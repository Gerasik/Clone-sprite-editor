import AppAnimationPlayer from './AppAnimationPlayer';

const context = {
  className: 'player',
  parentBlock: document.body,
  sizeCanvas: { width: 20, height: 20 },
};

const newObj = new AppAnimationPlayer(context.className, context.parentBlock, context.sizeCanvas);
describe('new AppAnimationPlayer', () => {
  it('Should be an instance of Object', () => {
    expect(newObj).toBeInstanceOf(Object);
  });
  it('Should be contain right parameters', () => {
    expect(newObj.className).toBe('player');
  });
});

describe('AppAnimationPlayer.prototype.render', () => {
  it('Should be an instance of Function', () => {
    expect(AppAnimationPlayer.prototype.render).toBeInstanceOf(Function);
  });

  const ans = newObj.render();
  it('Should be render container', () => {
    expect(document.body.innerHTML).toMatchSnapshot();
  });
  it('Should be render 4 child', () => {
    expect(ans.children.length).toBe(4);
  });
});

describe('AppAnimationPlayer.prototype.updateFPS', () => {
  it('Should be an instance of Function', () => {
    expect(AppAnimationPlayer.prototype.updateFPS).toBeInstanceOf(Function);
  });
  const cont = {
    frequency: null,
  };
  const event = {
    target: { value: 5, previousElementSibling: document.body },
  };
  AppAnimationPlayer.prototype.updateFPS.bind(cont, event)();
  it('Should be equival event.value', () => {
    expect(cont.frequency).toBe(event.target.value);
  });
});
