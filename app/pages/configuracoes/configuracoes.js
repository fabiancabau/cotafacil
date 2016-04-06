import {Page} from 'ionic-angular';


@Page({
  templateUrl: 'build/pages/configuracoes/configuracoes.html'
})
export class Configuracoes {

	constructor() {
		this.frequency = null;
	}

	setFrequency(freq) {
		this.frequency = freq;
	}

	save() {
		console.log(this.frequency);
		window.plugins.OneSignal.sendTag("frequency", this.frequency);
	}

}

