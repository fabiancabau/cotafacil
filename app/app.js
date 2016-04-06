import {App, Platform} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {TabsPage} from './pages/tabs/tabs';
import {LocalNotifications, Push} from 'ionic-native';
import {User} from './providers/user/user';


@App({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
  providers: [User],
  config: {
    mode: 'ios',
    pageTransition: 'ios'
  } // http://ionicframework.com/docs/v2/api/config/Config/
})
export class MyApp {
  static get parameters() {
    return [[Platform], User];
  }

  constructor(platform, user) {
    this.rootPage = TabsPage;
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();

      // console.log(LocalNotifications);
      var push = Push.init({
        android: {
           senderID: "12345679"
        },
        ios: {
           alert: "true",
           badge: true,
           sound: 'false'
        },
        windows: {}
      });

      // push.hasPermission().then((response) => {

      // });
      if (window.plugins) {
        var notificationOpenedCallback = function(jsonData) {
          console.log('didReceiveRemoteNotificationCallBack: ' + JSON.stringify(jsonData));
        };

        window.plugins.OneSignal.init("08b0ff23-22f2-467d-aab1-99dcad042d76",
                                       {googleProjectNumber: "1085380614163", autoRegister: true},
                                       notificationOpenedCallback);

        window.plugins.OneSignal.getIds(function(ids) {
          console.log('getIds: ' + JSON.stringify(ids));
          user.createUser(ids);
        });

        window.plugins.OneSignal.registerForPushNotifications();
        window.plugins.OneSignal.sendTag("First Time", "true");
        
        // Show an alert box if a notification comes in when the user is in your app.
        window.plugins.OneSignal.enableInAppAlertNotification(true);
        window.plugins.OneSignal.setSubscription(true);
      }

    });
  }
}
