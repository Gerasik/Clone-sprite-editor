export default class AppTools {
  constructor(className, parentBlock) {
    this.className = className;
    this.parentBlock = parentBlock;
    this.block = null;
  }

  render() {
    const tools = document.createElement('section');
    const toolsBar = document.createElement('div');
    const toolList = [{
      name: 'pen',
      icon: 'f304;',
    }, {
      name: 'fill',
      icon: 'f576',
    }, {
      name: 'eraser',
      icon: 'f12d',
    }, {
      name: 'line',
      icon: 'f304',
    }, {
      name: 'square-fill',
      icon: 'f45c',
    }, {
      name: 'square',
      icon: 'f0c8',
    }, {
      name: 'circle-fill',
      icon: 'f111',
    }, {
      name: 'circle',
      icon: 'f111',
    }, {
      name: 'light',
      icon: 'f067',
    }, {
      name: 'dark',
      icon: 'f068',
    }, {
      name: 'color-pick',
      icon: 'f1fb',
    }, {
      name: 'rotate',
      icon: 'f0e2',
    }, {
      name: 'move',
      icon: 'f0b2',
    }, {
      name: 'mirror',
      icon: 'f071',
    }];
    tools.classList.add(this.className);
    toolsBar.classList.add(`${this.className}__bar`);
    toolList.forEach(elem => AppTools.addTool(elem, toolsBar, this.className));
    tools.appendChild(toolsBar);
    this.parentBlock.appendChild(tools);
    return { tools, toolsBar };
  }

  static createInputColor(name, color) {
    const inputColor = document.createElement('input');
    inputColor.setAttribute('type', 'color');
    inputColor.setAttribute('id', name);
    inputColor.setAttribute('name', name);
    inputColor.setAttribute('value', color);
    return inputColor;
  }

  static addTool(elem, parent, blockName) {
    const tool = document.createElement('button');
    tool.setAttribute('title', elem.name);
    tool.classList.add(`${blockName}__item`);
    tool.classList.add(`${blockName}__${elem.name}`);
    tool.innerHTML = `<span>&#x${elem.icon}</span>`;
    parent.appendChild(tool);
  }

  static addcolorList(parent, colors) {
    const colorList = document.createElement('div');
    colorList.classList.add('tools__color-list');
    for (let i = 0; i < colors.length; i += 1) {
      if (!(i === 0)) {
        const swap = document.createElement('span');
        swap.innerHTML = '&#xf362';
        colorList.appendChild(swap);
      }
      colorList.appendChild(AppTools.createInputColor(colors[i].name, colors[i].color));
    }
    parent.appendChild(colorList);
    return colorList;
  }

  static canvasSizeList(parent) {
    const block = document.createElement('div');
    const name = document.createElement('span');
    name.innerHTML = 'Canvas size:';
    const select = document.createElement('select');
    const opt1 = document.createElement('option');
    opt1.innerHTML = '32x32';
    opt1.setAttribute('selected', 'selected');
    const opt2 = document.createElement('option');
    opt2.innerHTML = '64x64';
    const opt3 = document.createElement('option');
    opt3.innerHTML = '128x128';
    select.appendChild(opt1);
    select.appendChild(opt2);
    select.appendChild(opt3);
    block.appendChild(name);
    block.appendChild(select);
    parent.appendChild(block);
    return block;
  }

  static cursorPosition() {
    const block = document.createElement('div');
    const x = document.createElement('div');
    const y = document.createElement('div');
    block.classList.add('cursorPositon');
    x.innerHTML = '<span>X position:</span><span id="x">0</span>';
    y.innerHTML = '<span>Y position:</span><span id="y">0</span>';
    block.appendChild(x);
    block.appendChild(y);
    document.body.appendChild(block);
  }
}
