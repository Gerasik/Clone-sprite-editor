export default class AppFrameList {
  constructor(className, parentBlock, size) {
    this.frames = [];
    this.className = className;
    this.parentBlock = parentBlock;
    this.block = null;
    this.current = null;
    this.size = size;
  }

  render() {
    const frameList = document.createElement('section');
    frameList.classList.add(this.className);
    frameList.innerHTML = `<div class="${this.className}__add-frame">
                              <span>&#xf067</span>
                              <span>Add new frame</span>
                           <div>`;
    this.parentBlock.appendChild(frameList);
    this.block = frameList;
    if (this.frames.length === 0) {
      this.createFrame();
    }
  }

  createFrame(prewFrame) {
    const newFrame = document.createElement('div');
    const canvas = document.createElement('canvas');
    const number = document.createElement('span');
    const remove = document.createElement('span');
    const copy = document.createElement('span');
    const move = document.createElement('span');
    canvas.setAttribute('width', this.size.width);
    canvas.setAttribute('height', this.size.width);
    number.classList.add(`${this.className}__number`);
    remove.classList.add(`${this.className}__remove`);
    copy.classList.add(`${this.className}__copy`);
    move.classList.add(`${this.className}__move`);
    number.innerHTML = this.block.childElementCount;
    remove.innerHTML = '&#xf2ed';
    copy.innerHTML = '&#xf0c5';
    move.innerHTML = '&#xf0b2';
    newFrame.classList.add(`${this.className}__frame`);
    newFrame.appendChild(number);
    newFrame.appendChild(remove);
    newFrame.appendChild(copy);
    newFrame.appendChild(move);
    newFrame.appendChild(canvas);
    newFrame.setAttribute('draggable', true);
    if (prewFrame) {
      prewFrame.parentElement.insertBefore(newFrame, prewFrame.nextSibling);
    } else {
      this.block.insertBefore(newFrame, this.block.lastChild);
    }
    this.toggleCurrFrame(newFrame);
    return newFrame;
  }

  toggleCurrFrame(frame) {
    if (this.current) this.current.classList.remove('frame-list__curr-frame');
    frame.classList.add(`${this.className}__curr-frame`);
    this.current = frame;
  }

  createCopyFrame(prevFrame) {
    const newFrame = this.createFrame(prevFrame);
    const newCanvas = newFrame.getElementsByTagName('canvas')[0];
    const oldCanvas = prevFrame.getElementsByTagName('canvas')[0];
    const data = oldCanvas.getContext('2d').getImageData(0, 0, oldCanvas.width, oldCanvas.height);
    newCanvas.getContext('2d').putImageData(data, 0, 0);
    this.toggleCurrFrame(newFrame);
    return newFrame;
  }

  updateCount() {
    const elements = this.block.children;
    for (let i = 1; i < elements.length; i += 1) {
      const number = elements[i - 1].querySelector('.frame-list__number');
      number.innerHTML = i;
    }
  }
}
