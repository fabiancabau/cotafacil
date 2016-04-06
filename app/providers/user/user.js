import {Injectable, Inject} from 'angular2/core';
import {Http, Headers} from 'angular2/http';

/*
  Generated class for the User provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class User {

  static get parameters(){
    return [Http];
  }

  constructor(http) {
    this.http = http;
    this.data = null;
  }

  createUser(oneSignalInfo) {
    // if (this.data) {
    //   // already loaded data
    //   return Promise.resolve(this.data);
    // }

    var userId = oneSignalInfo.userId;
    var pushToken = oneSignalInfo.pushToken;

    var creds = "userId=" + userId + "&pushToken=" + pushToken;

    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    // don't have the data yet
    return new Promise(resolve => {
      // We're using Angular Http provider to request the data,
      // then on the response it'll map the JSON data to a parsed JS object.
      // Next we process the data and resolve the promise with the new data.
      this.http.post('https://yafrbuptez.localtunnel.me/api/users', creds, {
          headers: headers
        })
        .map(res => res.json())
        .subscribe(data => {
          console.log(data);
          // we've got back the raw data, now generate the core schedule data
          // and save the data for later reference
          this.data = data;
          resolve(this.data);
        });
    });
  }

}

