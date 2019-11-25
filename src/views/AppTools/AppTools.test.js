import AppTools from './AppTools';

describe('new AppTolls', () => {
  it('Should be an instance of Object', () => {
    expect(new AppTools('tools', document.body)).toBeInstanceOf(Object);
  });
  it('Should be contain right parameters', () => {
    const newObj = new AppTools('tools', document.body);
    expect(newObj.className).toBe('tools');
    expect(newObj.parentBlock).toBe(document.body);
    expect(newObj.block).toBe(null);
  });
});

describe('AppTolls.prototype.render', () => {
  it('Should be an instance of Function', () => {
    expect(AppTools.prototype.render).toBeInstanceOf(Function);
  });

  it('Should be render slide', () => {
    const context = {
      parentBlock: document.body,
    };
    AppTools.prototype.render.call(context);
    expect(document.body.innerHTML).toMatchSnapshot();
  });
});

describe('AppTolls.prototype.addTool', () => {
  it('Should be set right attribute', () => {
    const context = {
      name: 'text',
      color: 'red',
    };
    const ans = AppTools.createInputColor(context.name, context.color);
    expect(ans.getAttribute('id')).toBe(context.name);
    expect(ans.getAttribute('value')).toBe(context.color);
  });
});

describe('AppTolls.prototype.canvasSizeList', () => {
  it('Should be set right attribute', () => {
    const ans = AppTools.canvasSizeList(document.body);
    expect(ans.getElementsByTagName('option')[0].innerHTML).toBe('32x32');
    expect(ans.getElementsByTagName('option')[1].innerHTML).toBe('64x64');
    expect(ans.getElementsByTagName('option')[2].innerHTML).toBe('128x128');
  });
});

describe('AppTolls.prototype.cursorPosition', () => {
  it('Should be an instance of Function', () => {
    expect(AppTools.prototype.render).toBeInstanceOf(Function);
  });

  it('Should be render slide', () => {
    AppTools.cursorPosition();
    expect(document.body.innerHTML).toMatchSnapshot();
  });
});

describe('AppTolls.prototype.addcolorList', () => {
  it('Should be set 3 child', () => {
    const color = [{ name: 'color1', color: '#000000' }, { name: 'color2', color: '#fefefe' }];
    const ans = AppTools.addcolorList(document.body, color);
    expect(ans.children.length).toBe(3);
  });
  it('Should be set 5 child', () => {
    const color = [{ name: 'color1', color: '#000000' }, { name: 'color2', color: '#fefefe' }, { name: 'color3', color: '#fddddd' }];
    const ans = AppTools.addcolorList(document.body, color);
    expect(ans.children.length).toBe(5);
  });
});
