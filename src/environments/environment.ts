// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyBDZk9WUBO7JkyG0Tu1aMTGh3W9mt_ItsQ",
    authDomain: "fiambre-a-domicilio.firebaseapp.com",
    databaseURL: "https://fiambre-a-domicilio.firebaseio.com",
    projectId: "fiambre-a-domicilio",
    storageBucket: "fiambre-a-domicilio.appspot.com",
    messagingSenderId: "633839038447"
    // appID: "app-id",
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
