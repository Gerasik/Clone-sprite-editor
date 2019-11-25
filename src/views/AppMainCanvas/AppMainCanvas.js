export default class AppMainCanvas {
  constructor(className, parentBlock, size) {
    this.className = className;
    this.parentBlock = parentBlock;
    this.block = null;
    this.size = size;
  }

  render() {
    const mainCanvas = document.createElement('section');
    const canvasImage = document.createElement('canvas');
    const canvasPrev = document.createElement('canvas');
    canvasImage.setAttribute('width', this.size.width);
    canvasImage.setAttribute('height', this.size.width);
    canvasImage.classList.add(`${this.className}__canvas-image`);
    canvasImage.classList.add('canvas-image');
    canvasPrev.setAttribute('width', this.size.width);
    canvasPrev.setAttribute('height', this.size.width);
    canvasPrev.classList.add(`${this.className}__canvas-prev`);
    canvasPrev.classList.add('canvas-prev');
    mainCanvas.classList.add(this.className);
    mainCanvas.appendChild(canvasImage);
    mainCanvas.appendChild(canvasPrev);
    this.parentBlock.appendChild(mainCanvas);
    this.block = mainCanvas;
  }
}
