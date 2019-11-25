import AppControl from './AppControl';

describe('new AppLandingControl', () => {
  const obj = new AppControl();
  it('Should be an instance of Object', () => {
    expect(obj).toBeInstanceOf(Object);
  });
  it('Should be contain right parameters', () => {
    expect(obj.frequency).toBe(12);
  });
});

const cont = {
  frequency: 0,
  style: {
    opacity: 0,
  },
  classList: {
    class: 'content',
    remove(name) {
      this.class = name;
    },
    add(name) {
      this.class = `${name}1`;
    },
  },
};
const event = {
  target: {
    value: 15,
    previousElementSibling: document.body,
  },
};

describe('AppControl.prototype.updateFPS', () => {
  it('Should be an instance of Function', () => {
    expect(AppControl.prototype.updateFPS).toBeInstanceOf(Function);
  });
  AppControl.prototype.updateFPS.bind(cont, event)();
  it('Should return right value', () => {
    expect(cont.frequency).toBe(15);
  });
});

describe('AppControl.handleDragEnd', () => {
  it('Should be an instance of Function', () => {
    expect(AppControl.handleDragEnd).toBeInstanceOf(Function);
  });
  AppControl.handleDragEnd.bind(cont)();
  it('Should return right value', () => {
    expect(cont.style.opacity).toBe('1');
  });
});

describe('AppControl.handleDragLeave', () => {
  it('Should be an instance of Function', () => {
    expect(AppControl.handleDragLeave).toBeInstanceOf(Function);
  });
  AppControl.handleDragLeave.bind(cont)();
  it('Should return right value', () => {
    expect(cont.classList.class).toBe('over1');
  });
});

describe('AppControl.handleDragEnter', () => {
  it('Should be an instance of Function', () => {
    expect(AppControl.handleDragEnter).toBeInstanceOf(Function);
  });
  AppControl.handleDragEnter.bind(cont)();
  it('Should return right value', () => {
    expect(cont.classList.class).toBe('over1');
  });
});