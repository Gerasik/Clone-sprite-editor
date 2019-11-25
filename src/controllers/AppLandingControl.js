import AppControl from './AppControl';
import AppLanding from '../views/AppLanding/AppLanding';

export default class AppLandingControl {
  constructor() {
    this.name = 'piskel-clone';
  }

  start() {
    const landing = new AppLanding(this.name);
    const landingBlock = landing.render();
    const startButton = document.getElementById('startApp');
    startButton.addEventListener('click', () => {
      landingBlock.remove(landingBlock);
      const controller = new AppControl('Piskel');
      controller.start();
    });
  }
}
