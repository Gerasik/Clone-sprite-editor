export default class AppToolsControl {
  constructor(toolList, canvas, getFrames, params) {
    this.toolList = toolList;
    this.canvas = canvas;
    this.getFrames = getFrames;
    this.currFunction = null;
    this.moveFunction = null;
    this.moveFunctionFalse = null;
    this.params = params;
    this.startPosition = { x: 0, y: 0 };
    this.funtionList = { pen: this.draw };
  }

  addEvents() { // events tool list
    document.addEventListener('keypress', (e) => {
      this.unsetMainCanvasEvent();
      switch (e.key) {
        case 'p': // pen
          AppToolsControl.setClass(this.toolList, 'pen');
          this.setMainCanvasEvent(this.draw);
          break;
        case 'e': // erase
          AppToolsControl.setClass(this.toolList, 'eraser');
          this.setMainCanvasEvent(this.erase);
          break;
        case 'l': // line
          AppToolsControl.setClass(this.toolList, 'line');
          this.setMainCanvasEvent(this.line, false);
          break;
        case 's': // square
          AppToolsControl.setClass(this.toolList, 'square');
          this.setMainCanvasEvent(this.square, false);
          break;
        case 'd':// squareFill
          AppToolsControl.setClass(this.toolList, 'square-fill');
          this.setMainCanvasEvent(this.squareFill, false);
          break;
        case 'v': // circle-fill
          AppToolsControl.setClass(this.toolList, 'circle-fill');
          this.setMainCanvasEvent(this.circleFill, false);
          break;
        case 'c': // circle
          AppToolsControl.setClass(this.toolList, 'circle');
          this.setMainCanvasEvent(this.circle, false);
          break;
        case 'a': // color-pick
          AppToolsControl.setClass(this.toolList, 'color-pick');
          this.setMainCanvasEvent(this.colorPick, false);
          break;
        case 'n': // dark
          AppToolsControl.setClass(this.toolList, 'dark');
          this.setMainCanvasEvent(this.minus, false);
          break;
        case 'm': // light
          AppToolsControl.setClass(this.toolList, 'light');
          this.setMainCanvasEvent(this.plus, false);
          break;
        case 'f': // fill
          AppToolsControl.setClass(this.toolList, 'fill');
          this.setMainCanvasEvent(this.fill, false);
          break;
        case 'r': // rotate
          AppToolsControl.setClass(this.toolList, 'rotate');
          this.setMainCanvasEvent(this.rotate, false, false);
          break;
        case 't': // move
          AppToolsControl.setClass(this.toolList, 'move');
          this.setMainCanvasEvent(this.move, false);
          break;
        case 'z': // mirror
          AppToolsControl.setClass(this.toolList, 'mirror');
          this.setMainCanvasEvent(this.mirror, false, false);
          break;
        default:
          this.unsetMainCanvasEvent();
      }
    });
    this.toolList.addEventListener('click', (e) => {
      if (e.target.className !== 'tools__bar') {
        let elem = e.target;
        while (elem.tagName !== 'BUTTON') {
          elem = elem.parentElement;
        }
        if (elem.parentElement.querySelector('.tools__active')) {
          elem.parentElement.querySelector('.tools__active').classList.remove('tools__active');
        }
        elem.classList.add('tools__active');
        this.unsetMainCanvasEvent();
        const toolName = elem.classList[1].split('__')[1];
        switch (toolName) {
          case 'pen':
            this.setMainCanvasEvent(this.draw);
            break;
          case 'eraser':
            this.setMainCanvasEvent(this.erase);
            break;
          case 'line':
            this.setMainCanvasEvent(this.line, false);
            break;
          case 'square':
            this.setMainCanvasEvent(this.square, false);
            break;
          case 'square-fill':
            this.setMainCanvasEvent(this.squareFill, false);
            break;
          case 'circle-fill':
            this.setMainCanvasEvent(this.circleFill, false);
            break;
          case 'circle':
            this.setMainCanvasEvent(this.circle, false);
            break;
          case 'color-pick':
            this.setMainCanvasEvent(this.colorPick, false);
            break;
          case 'dark':
            this.setMainCanvasEvent(this.minus, false);
            break;
          case 'light':
            this.setMainCanvasEvent(this.plus, false);
            break;
          case 'fill':
            this.setMainCanvasEvent(this.fill, false, false);
            break;
          case 'rotate':
            this.setMainCanvasEvent(this.rotate, false, false);
            break;
          case 'move':
            this.setMainCanvasEvent(this.move, false);
            break;
          case 'mirror':
            this.setMainCanvasEvent(this.mirror, false, false);
            break;
          default:
            this.unsetMainCanvasEvent();
        }
      }
    });
  }

  static setClass(tools, name) {
    if (tools.parentElement.querySelector('.tools__active')) {
      tools.parentElement.querySelector('.tools__active').classList.remove('tools__active');
    }
    if (tools.parentElement.querySelector(`.tools__${name}`)) tools.parentElement.querySelector(`.tools__${name}`).classList.add('tools__active');
  }

  move(e) {
    const { x, y } = AppToolsControl.getMousePos(e);
    const { canvas, context } = this.copyToCurrFrame();
    const newX = x - this.startPosition.x;
    const newY = y - this.startPosition.y;
    const imageData = context.getImageData(0, 0, canvas.width, canvas.width);
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.putImageData(imageData, newX, newY);
    this.copyToCurrFrame();
  }

  mirror() {
    const { canvas, context } = this.copyToCurrFrame();
    const imgDataContext = context.getImageData(0, 0, canvas.width, canvas.height);
    const { data } = imgDataContext;
    const newData = [];
    for (let j = 0; j < canvas.width; j += 1) {
      for (let i = canvas.width - 1; i > -1; i -= 1) {
        const pos = i * 4 + j * 4 * canvas.width;
        newData.push(data[pos]);
        newData.push(data[pos + 1]);
        newData.push(data[pos + 2]);
        newData.push(data[pos + 3]);
      }
    }
    newData.forEach((elem, i) => {
      data[i] = elem;
    });
    context.putImageData(imgDataContext, 0, 0);
    this.copyToCurrFrame();
  }

  rotate() {
    const { canvas, context } = this.copyToCurrFrame();
    const imgDataContext = context.getImageData(0, 0, canvas.width, canvas.height);
    const { data } = imgDataContext;
    const newData = [];
    for (let i = canvas.width - 1; i > -1; i -= 1) {
      for (let j = 0; j < canvas.width; j += 1) {
        const pos = i * 4 + j * 4 * canvas.width;
        newData.push(data[pos]);
        newData.push(data[pos + 1]);
        newData.push(data[pos + 2]);
        newData.push(data[pos + 3]);
      }
    }
    newData.forEach((elem, i) => {
      data[i] = elem;
    });
    context.putImageData(imgDataContext, 0, 0);
    this.copyToCurrFrame();
  }

  fill(e) {
    const { x, y } = AppToolsControl.getMousePos(e);
    const { canvas, context } = this.copyToCurrFrame();
    const imgDataContext = context.getImageData(0, 0, canvas.width, canvas.height);
    const imgData = imgDataContext.data;
    let startPos = x + canvas.width * y;
    const currColor = {
      r: imgData[startPos * 4],
      g: imgData[startPos * 4 + 1],
      b: imgData[startPos * 4 + 2],
    };
    const pikselStack = [];
    const leftPos = [];
    const rightPos = [];
    startPos = AppToolsControl.toTopPixel(currColor, startPos, imgData, canvas.width);
    while (startPos <= imgData.length / 4
      && AppToolsControl.matchColor(currColor, startPos, imgData)) {
      if (AppToolsControl.matchColor(currColor, startPos - 1, imgData)) {
        const pixLeft = AppToolsControl.toTopPixel(currColor, startPos - 1, imgData, canvas.width);
        if (leftPos.indexOf(pixLeft) === -1) leftPos.push(pixLeft);
      }
      if (AppToolsControl.matchColor(currColor, startPos + 1, imgData)) {
        const pixRight = AppToolsControl.toTopPixel(currColor, startPos + 1, imgData, canvas.width);
        if (rightPos.indexOf(pixRight) === -1) rightPos.push(pixRight);
      }
      pikselStack.push(startPos);
      startPos += canvas.width;
    }
    while (leftPos.length) {
      let left = leftPos.pop();
      const lineStart = Math.floor(left / canvas.width) * canvas.width - 1;
      const lineEnd = (Math.floor(left / canvas.width) + 1) * canvas.width - 1;
      while (left <= imgData.length / 4
        && AppToolsControl.matchColor(currColor, left, imgData)) {
        if (AppToolsControl.matchColor(currColor, left - 1, imgData)
          && lineStart <= left - 1 && left - 1 < lineEnd) {
          const pixLeft = AppToolsControl.toTopPixel(currColor, left - 1,
            imgData, canvas.width);
          // if (leftPos.indexOf(pixLeft) === -1)
          leftPos.push(pixLeft);
        }
        pikselStack.push(left);
        left += canvas.width;
      }
    }
    while (rightPos.length) {
      let right = rightPos.pop();
      const lineStart = Math.floor(right / canvas.width) * canvas.width - 1;
      const lineEnd = (Math.floor(right / canvas.width) + 1) * canvas.width - 1;
      while (right <= imgData.length / 4
        && AppToolsControl.matchColor(currColor, right, imgData)) {
        if (AppToolsControl.matchColor(currColor, right + 1, imgData)
          && lineStart <= right + 1 && right + 1 <= lineEnd) {
          const pixLeft = AppToolsControl.toTopPixel(currColor, right + 1,
            imgData, canvas.width);
          if (rightPos.indexOf(pixLeft) === -1) rightPos.push(pixLeft);
        }
        pikselStack.push(right);
        right += canvas.width;
      }
    }
    AppToolsControl.fillNewColor(context, imgDataContext, pikselStack, this.params.mainColor.color);
  }

  static fillNewColor(context, imgDataContext, pikselStack, newColor) {
    const imgData = imgDataContext.data;
    for (let i = 0; i < pikselStack.length; i += 1) {
      imgData[pikselStack[i] * 4] = parseInt(newColor.slice(1, 3), 16);
      imgData[pikselStack[i] * 4 + 1] = parseInt(newColor.slice(3, 5), 16);
      imgData[pikselStack[i] * 4 + 2] = parseInt(newColor.slice(5, 7), 16);
      imgData[pikselStack[i] * 4 + 3] = 255;
    }
    context.putImageData(imgDataContext, 0, 0);
  }

  static toTopPixel(currColor, startPos, imgData, width) {
    let newPos = startPos - width;
    while (newPos >= 0 && AppToolsControl.matchColor(currColor, newPos, imgData)) {
      newPos -= width;
    }
    return newPos + width;
  }

  static matchColor(currColor, pixlePos, imgData) {
    const r = imgData[pixlePos * 4];
    const g = imgData[pixlePos * 4 + 1];
    const b = imgData[pixlePos * 4 + 2];
    if (currColor.r === r && currColor.g === g && currColor.b === b) return true;
    return false;
  }

  plus(e) {
    const { x, y } = AppToolsControl.getMousePos(e);
    const { context } = this.copyToCurrFrame();
    const pixel = context.getImageData(x, y, 1, 1);
    for (let i = 0; i < pixel.data.length - 1; i += 1) {
      if (pixel.data[i] + 16 < 256) pixel.data[i] += 16;
    }
    context.putImageData(pixel, x, y);
  }

  minus(e) {
    const { x, y } = AppToolsControl.getMousePos(e);
    const { context } = this.copyToCurrFrame();
    const pixel = context.getImageData(x, y, 1, 1);
    for (let i = 0; i < pixel.data.length - 1; i += 1) {
      if (pixel.data[i] - 16 >= 0) pixel.data[i] -= 16;
    }
    context.putImageData(pixel, x, y);
  }

  colorPick(e) {
    const { x, y } = AppToolsControl.getMousePos(e);
    const { context } = this.copyToCurrFrame();
    const pixelColor = context.getImageData(x, y, 1, 1).data;
    let newColor = '';
    if (pixelColor[3] === 0) {
      newColor = 'ffffffff';
    } else {
      pixelColor.forEach((element) => {
        const color = Number(element).toString(16);
        if (color.length === 1) newColor += '0';
        newColor += color;
      });
    }
    this.params.mainColor.color = `#${newColor.slice(0, 6)}`;
    document.getElementById('main-color').value = `#${newColor.slice(0, 6)}`;
  }

  circle(e) {
    const { x, y } = AppToolsControl.getMousePos(e);
    const { context } = this.copyToCurrFrame();
    const width = x - this.startPosition.x;
    const heigth = y - this.startPosition.y;
    const radius = Math.floor(Math.sqrt((width ** 2) + (heigth ** 2)));
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 0;
    context.shadowBlur = 0;
    context.shadowColor = 'black';
    context.beginPath();
    context.strokeStyle = this.params.mainColor.color;
    context.arc(this.startPosition.x, this.startPosition.y, radius, 0, 2 * Math.PI, false);
    context.stroke();
    this.copyToCurrFrame();
  }

  circleFill(e) {
    const { x, y } = AppToolsControl.getMousePos(e);
    const { context } = this.copyToCurrFrame();
    const width = x - this.startPosition.x;
    const heigth = y - this.startPosition.y;
    const radius = Math.floor(Math.sqrt((width ** 2) + (heigth ** 2)));
    context.beginPath();
    context.strokeStyle = this.params.mainColor.color;
    context.fillStyle = this.params.mainColor.color;
    context.arc(this.startPosition.x, this.startPosition.y, radius, 0, 2 * Math.PI, false);
    context.fill();
    context.stroke();
    this.copyToCurrFrame();
  }

  square(e) {
    const { x, y } = AppToolsControl.getMousePos(e);
    const { context } = this.copyToCurrFrame();
    context.lineWidth = 1;
    context.strokeStyle = this.params.mainColor.color;
    const width = x - this.startPosition.x;
    const heigth = y - this.startPosition.y;
    context.strokeRect(this.startPosition.x, this.startPosition.y, width + 1, heigth + 1);
    this.copyToCurrFrame();
  }

  squareFill(e) {
    const { x, y } = AppToolsControl.getMousePos(e);
    const { context } = this.copyToCurrFrame();
    const width = x - this.startPosition.x;
    const heigth = y - this.startPosition.y;
    context.lineWidth = 1;
    context.fillStyle = this.params.mainColor.color;
    context.fillRect(this.startPosition.x, this.startPosition.y, width + 1, heigth + 1);
    this.copyToCurrFrame();
  }

  line(e) {
    const { x, y } = AppToolsControl.getMousePos(e);
    const { context } = this.copyToCurrFrame();
    context.beginPath();
    context.lineWidth = 1;
    context.fillStyle = this.params.mainColor.color;
    context.strokeStyle = this.params.mainColor.color;
    context.moveTo(this.startPosition.x + 0.5, this.startPosition.y + 0.5);
    context.lineTo(x + 0.5, y + 0.5);
    context.stroke();
    this.copyToCurrFrame();
  }

  erase(e) { // eraser
    const { x, y } = AppToolsControl.getMousePos(e);
    const { context } = this.copyToCurrFrame();
    context.clearRect(x, y, 1, 1);
  }

  draw(e) { // pen
    const { x, y } = AppToolsControl.getMousePos(e);
    const { context } = this.copyToCurrFrame();
    context.fillStyle = '#fefefe';
    context.fillStyle = this.params.mainColor.color;
    context.fillRect(x, y, 1, 1);
  }

  init() {
    this.setMainCanvasEvent(this.draw); // set default draw

    this.canvas.block.querySelector('.canvas-prev').addEventListener('mousemove', (e) => { // Preview canvas
      const context = e.target.getContext('2d');
      context.clearRect(0, 0, e.target.width, e.target.height);
      const { x, y } = AppToolsControl.getMousePos(e);
      context.fillStyle = '#8885';
      context.fillRect(x, y, 1, 1);
      document.getElementById('x').innerHTML = x;
      document.getElementById('y').innerHTML = y;
      this.canvas.block.querySelector('.canvas-prev').addEventListener('mouseleave', () => context.clearRect(0, 0, e.target.width, e.target.height));
    });
  }

  setMainCanvasEvent(func, moveActive = true, click = true) {
    const newFunc = func.bind(this);
    const cont = this;
    const canvas = this.canvas.block.querySelector('.canvas-prev');
    this.currFunction = newFunc;
    this.moveFunction = this.mouseDown.bind(cont, func, canvas);
    if (moveActive) {
      canvas.addEventListener('mousedown', this.moveFunction);
    } else if (click) {
      this.moveFunctionFalse = this.updateStartPos.bind(this);
      canvas.addEventListener('mousedown', this.moveFunctionFalse);
      canvas.addEventListener('mouseup', newFunc);
    }
    canvas.addEventListener('click', newFunc);
  }

  updateStartPos(e) {
    const { x, y } = AppToolsControl.getMousePos(e);
    this.startPosition.x = x;
    this.startPosition.y = y;
  }

  mouseDown(func, canvas, e) {
    const { x, y } = AppToolsControl.getMousePos(e);
    this.startPosition.x = x;
    this.startPosition.y = y;
    const newFunc = func.bind(this);
    this.moveFunctionFalse = func.bind(this);
    canvas.addEventListener('mousemove', newFunc);
    canvas.addEventListener('mouseup', () => {
      this.params.dataImage = this.getFrames();
      canvas.removeEventListener('mousemove', newFunc);
    });
    canvas.addEventListener('mouseleave', () => {
      this.params.dataImage = this.getFrames();
      canvas.removeEventListener('mousemove', newFunc);
    });
  }

  unsetMainCanvasEvent() {
    const canvas = this.canvas.block.querySelector('.canvas-prev');
    canvas.removeEventListener('mouseup', this.currFunction);
    canvas.removeEventListener('mousedown', this.moveFunctionFalse);
    canvas.removeEventListener('mousedown', this.moveFunction);
    canvas.removeEventListener('click', this.currFunction);
  }

  static getMousePos(event) {
    const xPosition = Math.floor(event.offsetX / (event.target.clientWidth / event.target.width));
    const yPosition = Math.floor(event.offsetY / (event.target.clientHeight / event.target.height));
    return { x: xPosition, y: yPosition };
  }

  copyToCurrFrame() {
    const canv = this.canvas.block.querySelector('.canvas-image');
    const cont = canv.getContext('2d');
    const imageData = cont.getImageData(0, 0, canv.width, canv.height);
    const currFrame = document.querySelector('.frame-list__curr-frame').getElementsByTagName('canvas')[0].getContext('2d');
    currFrame.putImageData(imageData, 0, 0);
    return { canvas: canv, context: cont };
  }
}
