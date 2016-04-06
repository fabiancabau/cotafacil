import {Page} from 'ionic-angular';
import {Http} from 'angular2/http';
import 'rxjs/Rx';
import {LocalNotifications} from 'ionic-native';
import {User} from '../../providers/user/user';

@Page({
  templateUrl: 'build/pages/cotacao/cotacao.html',
  providers: [User]
})
export class Cotacao {

	static get parameters(){
    return [Http, User];
  }

	constructor(http, user) {
    	this.rate = null;
    	this.http = http;

      this.user = user;


      this.fav = {
        "dolar": true,
        "euro": false,
        "pound": false
      };

      // this.http.get('http://localhost:3000').map(res => res.json()).subscribe(data => {
      //   console.log(data['USD_BRL'].val);
      //   this.data = data['USD_BRL'].val;       
      // });
    	
      this.data = 3.1823;
  	}

  activateNotifications(currency) {
    console.log(currency);

    if (this.fav[currency]) {
      this.fav[currency] = false;
    }
    else {
      this.fav[currency] = true;
    }


    LocalNotifications.schedule({
      id: 2,
      title: "Cotação: Dólar",
      text: "R$ 3,80",
      data: { meetingId:"123#fawdawg8" }
    });
  }

}
