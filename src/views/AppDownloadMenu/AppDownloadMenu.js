export default class AppDownloadMenu {
  constructor(className, parentBlock) {
    this.className = className;
    this.parentBlock = parentBlock;
  }

  render() {
    const downloadMenu = document.createElement('section');
    downloadMenu.classList.add(this.className);
    downloadMenu.innerHTML = `<span>Export:</span>
                              <button class="${this.className}__download-gif" title="download gif">to GIF</button>
                              <button class="${this.className}__download-jpeg" title="download jpeg">to JPEG</button>`;
    this.parentBlock.appendChild(downloadMenu);
    return downloadMenu;
  }
}
