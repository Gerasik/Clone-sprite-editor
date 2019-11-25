import AppToolsControl from './AppToolsControl';
import 'jest-canvas-mock';

const block = document.createElement('div');
block.innerHTML = '<p class=".tools__active .tools__name"></p>';
document.body.appendChild(block);
const canvas1 = document.createElement('div');
const gg = document.createElement('div');
canvas1.appendChild(gg);
gg.classList.add('canvas-image');
const content = {
  startPosition: {
    x: 5,
    y: 5,
  },
  name: 'sda',
  content: {
    canvas: {
      block: canvas1,
    },
  },
  params: {
    mainColor: {
      color: 'red',
    },
  },
  data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  copyToCurrFrame() {
    return {
      canvas: canvas1,
      context: {
        data: this.data,
        fillRect(i, j, k, m) {
          this.data[0] = i;
          this.data[1] = j;
          this.data[2] = k;
          this.data[3] = m;
        },
        clearRect(x, y, k, m) {
          this.data[x] = 0;
          this.data[y] = 0;
          this.data[k] = 0;
          this.data[m] = 0;
        }
      },
    };
  },
};
const cont = {
  offsetX: 10,
  offsetY: 10,
  target: {
    clientWidth: 20,
    clientHeight: 20,
    height: 5,
    width: 5,
  },
};

describe('new AppLandingControl', () => {
  const obj = new AppToolsControl();
  it('Should be an instance of Object', () => {
    expect(obj).toBeInstanceOf(Object);
  });
  it('Should be contain right parameters', () => {
    expect(obj.currFunction).toBeNull();
    expect(obj.moveFunction).toBeNull();
    expect(obj.moveFunctionFalse).toBeNull();
  });
});

describe('AppToolsControl.setClass', () => {
  it('Should be an instance of Function', () => {
    expect(AppToolsControl.setClass).toBeInstanceOf(Function);
  });
});

describe('AppToolsControl.copyToCurrFrame', () => {
  it('Should be an instance of Function', () => {
    expect(AppToolsControl.getMousePos).toBeInstanceOf(Function);
  });
  const ans = AppToolsControl.getMousePos(cont);
  const { x, y } = ans;
  it('Should return canvas', () => {
    expect(x).toBe(2);
    expect(y).toBe(2);
  });
});

describe('AppToolsControl.prototype.updateStartPos', () => {
  it('Should be an instance of Function', () => {
    expect(AppToolsControl.prototype.updateStartPos).toBeInstanceOf(Function);
  });
  AppToolsControl.prototype.updateStartPos.bind(content, cont)();
  it('Should return canvas', () => {
    expect(content.startPosition.x).toBe(2);
    expect(content.startPosition.y).toBe(2);
  });
});

describe('AppToolsControl.prototype.draw', () => {
  it('Should be an instance of Function', () => {
    expect(AppToolsControl.prototype.draw).toBeInstanceOf(Function);
  });
  AppToolsControl.prototype.draw.bind(content, cont)();
  it('Should return right number', () => {
    expect(content.data[0]).toBe(2);
    expect(content.data[1]).toBe(0);
    expect(content.data[3]).toBe(1);
  });
});
describe('AppToolsControl.prototype.erase', () => {
  it('Should be an instance of Function', () => {
    expect(AppToolsControl.prototype.erase).toBeInstanceOf(Function);
  });
  AppToolsControl.prototype.erase.bind(content, cont)();
  it('Should return right number', () => {
    expect(content.data[0]).toBe(2);
    expect(content.data[3]).toBe(1);
  });
});
