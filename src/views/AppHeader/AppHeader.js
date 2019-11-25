export default class AppHeader {
  constructor(className) {
    this.className = className;
    this.block = null;
  }

  render() {
    const header = document.createElement('header');
    header.classList.add(this.className);
    header.innerHTML = `<button class="${this.className}__menu-button"><div></div><div></div><div></div></button>
                        <h1 class="${this.className}__title">Piskel Clone</h1>
                        <button class="${this.className}__position"><div></div><div></div><div></div></button>`;
    document.body.appendChild(header);
    this.block = header;
  }
}
