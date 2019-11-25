export default class AppAnimationPlayer {
  constructor(className, parentBlock, sizeCanvas) {
    this.className = className;
    this.parentBlock = parentBlock;
    this.sizeCanvas = sizeCanvas;
  }

  render() {
    const animationPlayer = document.createElement('section');
    animationPlayer.classList.add(this.className);
    animationPlayer.innerHTML = `<canvas class="${this.className}__player" width="${this.sizeCanvas.width}" height="${this.sizeCanvas.height}"></canvas>
                                <span class="${this.className}__full-size">&#xf066</span>
                                <span class="${this.className}__number">FPS: 12</span>
                                <input class="${this.className}__frequency" type="range" min="1" max="24" value="12" step="1">`;
    this.parentBlock.appendChild(animationPlayer);
    return animationPlayer;
  }

  updateFPS(e) { // animation player FPS counter input
    const frequency = e.target.value;
    const prevElem = e.target.previousElementSibling;
    prevElem.innerText = `FPS: ${frequency}`;
    this.frequency = frequency;
  }
}
