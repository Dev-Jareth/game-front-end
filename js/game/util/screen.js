class Screen {

	constructor() {
		this.WIDTH = 0;
		this.HEIGHT = 0;
		this.updateResolution();
	}

	updateResolution() {
  	this.WIDTH = window.innerWidth;
  	this.HEIGHT = window.innerHeight;
	}

}

export default new Screen();
