export default class AppContainer {
  constructor(className) {
    this.className = className;
    this.block = null;
  }

  render() {
    const container = document.createElement('section');
    container.classList.add(this.className);
    document.body.appendChild(container);
    this.block = container;
  }
}
