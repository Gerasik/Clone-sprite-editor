const piskel = require('./img/main.png');
const img1 = require('./img/img1.gif');
const img2 = require('./img/img2.jpeg');
const img3 = require('./img/img3.gif');

export default class AppLanding {
  constructor(blockName) {
    this.blockName = blockName;
  }

  render() {
    const block = document.createElement('section');
    block.classList.add(this.blockName);
    block.innerHTML = `<header class="${this.blockName}__header"><h1>${this.blockName}</h1></header>
                      <section class="${this.blockName}__about-app">
                      <p>
                        <span>This is a free online editor for animated sprites & pixel art</span>
                        <button id="startApp">Create sprite</button>
                      </p>
                      <img class="${this.blockName}__main-img" src="${piskel}"></section>
                      <section class="${this.blockName}__examples">
                        <span>EXAMPLE SPRITES</span>
                        <img class="${this.blockName}__example-img" src="${img1}"/>
                        <img class="${this.blockName}__example-img" src="${img2}"/>
                        <img class="${this.blockName}__example-img" src="${img3}"/>
                      </section>
                      <section class="${this.blockName}__functionality">
                        <span>functionality</span>
                        <ul>
                          <li>
                            <span>
                              Live preview
                            </span>
                            <p>
                              Check a preview of your animation in real time as you draw.
                            </p>
                          </li>
                          <li>
                            <span>
                              Export to GIF
                            </span>
                            <p>
                              Export your animated sprite to file system in .gif format
                            </p>
                          </li>
                          <li>
                            <span>
                              Export to JPEG
                            </span>
                            <p>
                              Export your animated sprite to file system in .jpeg format
                            </p>
                          </li>
                          <li>
                            <span>
                              A lot of diffrent tools
                            </span>
                            <p>
                              The editor has some diffrent tools
                            </p>
                          </li>
                        </ul>
                      </section>
                      <section class="${this.blockName}__about-me">
                        <h4>CONTACTS</h4>
                        <span>App developed by Yauheni Herasimenka</span>
                        <ul>
                          <li><a href="https://t.me/gerasiks">&#xf2c6</a></li>
                          <li><a href="https://github.com/Gerasik">&#xf092</a></li>
                          <li><a href="mailto:gerasik1992@gmail.com">&#xf0e0</a></li>
                        </ul>
                      </section>`;
    document.body.appendChild(block);
    return block;
  }
}
