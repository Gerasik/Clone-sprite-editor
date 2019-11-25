import AppFrameList from './AppFrameList';
import 'jest-canvas-mock';

const cont = {
  frames: [],
  className: 'frame-list',
  parentBlock: document.body,
  size: { width: 10 },
  createFrame: AppFrameList.prototype.createFrame,
  toggleCurrFrame: AppFrameList.prototype.toggleCurrFrame,
  block: document.body,
  current: null,
};

describe('new AppFrameList', () => {
  it('Should be an instance of Object', () => {
    expect(new AppFrameList('header', document.body, 25)).toBeInstanceOf(Object);
  });
  it('Should be contain right parameters', () => {
    const newObj = new AppFrameList('header', document.body, 25);
    expect(newObj.className).toBe('header');
    expect(newObj.block).toBe(null);
    expect(newObj.frames).toBeInstanceOf(Array);
    expect(newObj.parentBlock).toBe(document.body);
    expect(newObj.current).toBe(null);
    expect(newObj.size).toBe(25);
  });
});

describe('AppFrameList.prototype.toggleCurrFrame', () => {
  const frame = document.createElement('div');
  const func = AppFrameList.prototype.toggleCurrFrame.bind(cont, frame);
  func();
  it('Should be an instance of Function', () => {
    expect(func).toBeInstanceOf(Object);
  });
  it('Should be create right class', () => {
    expect(cont.current.classList[0]).toBe(`${cont.className}__frame`);
  });
});

describe('AppFrameList.prototype.render', () => {
  it('Should be render slide', () => {
    AppFrameList.prototype.render.bind(cont)();
    expect(document.body.innerHTML).toMatchSnapshot();
  });
  cont.frames = [1];
  it('Should be create only 7 child', () => {
    AppFrameList.prototype.render.bind(cont)();
    expect(cont.parentBlock.children.length).toBe(7);
  });
});


describe('AppFrameList.prototype.createFrame', () => {
  const ans = AppFrameList.prototype.createFrame.bind(cont, false)();
  it('Should be consist canvas', () => {
    expect(ans.getElementsByTagName('canvas')[0].tagName).toBe('CANVAS');
  });
  it('Should be consist 5 items', () => {
    expect(ans.children.length).toBe(5);
  });
});

describe('AppFrameList.prototype.updateCount', () => {
  const bodyBlock = document.body;
  bodyBlock.innerHTML = '<div><span class="frame-list__number">3</span></div><div><span class="frame-list__number">1</span></div><div><span class="frame-list__number">2</span></div>';
  const context = {
    block: bodyBlock,
  };
  AppFrameList.prototype.updateCount.bind(context, false)();
  const list = context.block.querySelectorAll('.frame-list__number');
  it('Should be set correct order', () => {
    expect(list[0].innerHTML).toBe('1');
    expect(list[1].innerHTML).toBe('2');
  });
});

describe('AppFrameList.prototype.createCopyFrame', () => {
  const newFrame = document.createElement('div');
  const canvas = document.createElement('canvas');
  canvas.setAttribute('width', 5);
  canvas.setAttribute('height', 5);
  newFrame.appendChild(canvas);
  cont.parentBlock.appendChild(newFrame);
  const elem = AppFrameList.prototype.createCopyFrame.bind(cont, newFrame)();
  it('Should be set correct order', () => {
    expect(elem.classList[0]).toBe('frame-list__frame');
  });
});
