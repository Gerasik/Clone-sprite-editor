import GIF from 'gif.js.optimized';
import AppHeader from '../views/AppHeader/AppHeader';
import AppContainer from '../views/AppContainer/AppContainer';
import AppTools from '../views/AppTools/AppTools';
import AppFrameList from '../views/AppFrameList/AppFrameList';
import AppMainCanvas from '../views/AppMainCanvas/AppMainCanvas';
import AppAnimationPlayer from '../views/AppAnimationPlayer/AppAnimationPlayer';
import AppDownloadMenu from '../views/AppDownloadMenu/AppDownloadMenu';
import AppToolsControl from './AppToolsControl';
import Worker from '../../node_modules/gif.js.optimized/dist/gif.worker';

export default class AppControl {
  constructor(className) {
    this.className = className;
    this.count = 0;
    this.frequency = 12;
    this.size = { width: 32 };
    this.params = {
      dataImage: null,
      currentTool: 'pen',
      mainColor: { name: 'main-color', color: '#00ffff' },
      secondColor: { name: 'second-color', color: '#ffff00' },
    };
  }

  start() {
    const header = new AppHeader('page-header');
    header.render();
    const container = new AppContainer('container');
    container.render();
    const appTools = new AppTools('tools', container.block);
    const { tools, toolsBar } = appTools.render();
    const colorArr = [{ name: this.params.mainColor.name, color: this.params.mainColor.color },
      { name: this.params.secondColor.name, color: this.params.secondColor.color }];
    const colorList = AppTools.addcolorList(tools, colorArr);
    colorList.addEventListener('change', (e) => {
      if (e.target.name === this.params.mainColor.name) {
        this.params.mainColor.color = e.target.value;
      } else if (e.target.name === this.params.secondColor.name) {
        this.params.secondColor.color = e.target.value;
      }
    }, false);
    colorList.getElementsByTagName('span')[0].addEventListener('click', (e) => {
      const main = e.target.parentNode.firstChild;
      const second = e.target.parentNode.lastChild;
      const old = this.params.mainColor.color;
      this.params.mainColor.color = this.params.secondColor.color;
      main.value = this.params.secondColor.color;
      second.value = old;
      this.params.secondColor.color = old;
    });
    const canvasSizeList = AppTools.canvasSizeList(tools);
    canvasSizeList.addEventListener('change', (e) => {
      const canvasList = document.getElementsByTagName('canvas');
      for (let i = 0; i < canvasList.length; i += 1) {
        const context = canvasList[i].getContext('2d');
        const newSize = e.target.value.split('x')[0];
        const dataImage = context.getImageData(0, 0, canvasList[i].width, canvasList[i].height);
        canvasList[i].setAttribute('width', newSize);
        canvasList[i].setAttribute('height', newSize);
        context.putImageData(dataImage, 0, 0);
        this.size.width = newSize;
      }
    });
    AppTools.cursorPosition();
    const frameList = new AppFrameList('frame-list', container.block, this.size);
    frameList.render();
    const mainCanvas = new AppMainCanvas('main-canvas', container.block, this.size);
    mainCanvas.render();
    const toolsControl = new AppToolsControl(
      toolsBar, mainCanvas, AppControl.getFramesData, this.params,
    );
    toolsControl.init();
    toolsControl.addEvents();
    frameList.block.addEventListener('click', AppControl.eventFrameList.bind(frameList, this));
    AppControl.addDragEvent(frameList.block.firstChild, this);

    const animationPlayer = new AppAnimationPlayer('animation-player', container.block, { width: this.size.width, height: this.size.width });
    const animationPlayerBlock = animationPlayer.render();

    animationPlayerBlock.addEventListener('input', animationPlayer.updateFPS.bind(this));
    animationPlayerBlock.addEventListener('click', (e) => { if (e.target.className.split('__')[1] === 'full-size') animationPlayerBlock.requestFullscreen(); });

    this.params.dataImage = AppControl.getFramesData();

    const playAnimation = () => {
      const framesData = this.params.dataImage;
      const imageData = framesData[this.count % framesData.length];
      animationPlayerBlock.getElementsByTagName('canvas')[0].getContext('2d').putImageData(imageData, 0, 0);
      this.count += 1;
      setTimeout(playAnimation, 1000 / this.frequency);
      this.params.dataImage = AppControl.getFramesData();
    };
    setTimeout(playAnimation, 1000 / this.frequency);

    const downloadMenu = new AppDownloadMenu('download-menu', animationPlayerBlock);
    const downloadMenuBlock = downloadMenu.render();
    const dowloadGif = downloadMenuBlock.querySelector('.download-menu__download-gif');
    dowloadGif.addEventListener('click', () => {
      const worker = new Worker();
      if (worker) {
        const gif = new GIF({
          workerScript: 'gif.worker.js',
          workers: 7,
          quality: 10,
          width: this.size.width,
          height: this.size.width,
        });
        const del = this.frequency;
        this.params.dataImage.forEach((element) => {
          const newElem = element;
          for (let i = 3; i < newElem.data.length; i += 4) {
            if (element.data[i] === 0) {
              newElem.data[i - 1] = 255;
              newElem.data[i - 2] = 255;
              newElem.data[i - 3] = 255;
              newElem.data[i] = 255;
            }
          }
          gif.addFrame(newElem, { delay: 1000 / del });
        });
        gif.on('finished', (e) => {
          const downloadLink = document.createElement('a');
          const n = URL.createObjectURL(e);
          downloadLink.setAttribute('href', n);
          downloadLink.setAttribute('download', 'download');
          document.body.appendChild(downloadLink);
          downloadLink.click();
        });
        gif.render();
      }
    });
    const dowloadJpeg = downloadMenuBlock.querySelector('.download-menu__download-jpeg');
    dowloadJpeg.addEventListener('click', () => {
      const canvas = document.querySelector('.main-canvas__canvas-image');
      const context = canvas.getContext('2d');
      const dataImage = context.getImageData(0, 0, canvas.width, canvas.width);
      for (let i = 3; i < dataImage.data.length; i += 4) {
        if (dataImage.data[i] === 0) {
          dataImage.data[i - 1] = 255;
          dataImage.data[i - 2] = 255;
          dataImage.data[i - 3] = 255;
          dataImage.data[i] = 255;
        }
      }
      context.putImageData(dataImage, 0, 0);
      const url = canvas.toDataURL('image/jpeg');
      const t = document.createElement('a');
      t.setAttribute('href', url);
      t.setAttribute('download', 'download');
      t.click();
    });
  }

  static eventFrameList(controller, e) {
    if (e.target.tagName !== 'SECTION') {
      let elem = e.target;
      while (elem.tagName !== 'DIV') {
        elem = elem.parentElement;
      }
      if (elem.className.split('__')[1] === 'add-frame') {
        const newFrame = this.createFrame();
        AppControl.addDragEvent(newFrame, controller);
        const canvas = document.querySelector('.frame-list__curr-frame').getElementsByTagName('canvas')[0];
        const imageData = canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height);
        AppControl.updateMainCanvas(imageData);
      } else if (elem.classList[0].split('__')[1] === 'frame') {
        if (e.target.className.split('__')[1] === 'copy') {
          const newFrame = this.createCopyFrame(elem);
          AppControl.addDragEvent(newFrame, controller);
          const canvas = elem.getElementsByTagName('canvas')[0];
          const data = canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height);
          AppControl.updateMainCanvas(data);
          this.updateCount();
        } else if (e.target.className.split('__')[1] === 'remove') {
          let newCurrentFrame;
          if (elem.previousSibling) {
            newCurrentFrame = elem.previousSibling;
          } else if (elem.nextSibling && elem.nextSibling.className !== 'frame-list__add-frame') {
            newCurrentFrame = elem.nextSibling;
          } else if (elem.nextSibling.className === 'frame-list__add-frame') {
            newCurrentFrame = this.createFrame();
          }
          this.toggleCurrFrame(newCurrentFrame);
          const canvas = newCurrentFrame.getElementsByTagName('canvas')[0];
          const imageData = canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height);
          AppControl.updateMainCanvas(imageData);
          elem.remove();
          this.updateCount();
        } else {
          this.toggleCurrFrame(elem);
          const canvas = elem.getElementsByTagName('canvas')[0];
          const imageData = canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height);
          AppControl.updateMainCanvas(imageData);
        }
      }
    }
  }

  static updateMainCanvas(imageData) {
    const canvas = document.querySelector('.canvas-image');
    const context = canvas.getContext('2d');
    context.putImageData(imageData, 0, 0);
  }

  static getFramesData(frameList) {
    const list = frameList || document.querySelector('.frame-list');
    const data = [];
    for (let i = 0; i < list.children.length - 1; i += 1) {
      const canvas = list.children[i].getElementsByTagName('canvas')[0];
      const context = canvas.getContext('2d');
      data.push(context.getImageData(0, 0, canvas.width, canvas.height));
    }
    return data;
  }

  updateFPS(e) { // animation player FPS counter input
    const frequency = e.target.value;
    const prevElem = e.target.previousElementSibling;
    prevElem.innerText = `FPS: ${frequency}`;
    this.frequency = frequency;
  }

  static addDragEvent(elem, controller) {
    elem.addEventListener('dragstart', AppControl.handleDragStart, false);
    elem.addEventListener('dragenter', AppControl.handleDragEnter, false);
    elem.addEventListener('dragover', AppControl.handleDragOver, false);
    elem.addEventListener('dragleave', AppControl.handleDragLeave, false);
    elem.addEventListener('drop', AppControl.handleDrop.bind(elem, controller), false);
    elem.addEventListener('dragend', AppControl.handleDragEnd, false);
  }

  static handleDragStart(e) {
    this.style.opacity = '0.4';
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('number', this.firstChild.innerHTML);
  }

  static handleDragEnter() {
    this.classList.add('over');
  }

  static handleDragLeave() {
    this.classList.remove('over');
  }

  static handleDragOver(e) {
    if (e.preventDefault) {
      e.preventDefault();
    }
  }

  static handleDrop(controller, e) {
    const control = controller;
    if (e.stopPropagation) {
      e.stopPropagation(); // Stops some browsers from redirecting.
    }
    const number = e.dataTransfer.getData('number');
    const parent = this.parentNode;
    const list = parent.children;
    let currentNode;
    for (let i = 0; i < list.length - 1; i += 1) {
      if (list[i].firstChild.innerHTML === number) currentNode = list[i];
    }
    if (currentNode) {
      const node = parent.removeChild(currentNode);
      parent.insertBefore(node, this);
    }
    control.dataImage = AppControl.getFramesData();
    AppFrameList.prototype.updateCount.call({ block: parent });
    this.classList.remove('over');
    return false;
  }

  static handleDragEnd() {
    this.style.opacity = '1';
  }
}
