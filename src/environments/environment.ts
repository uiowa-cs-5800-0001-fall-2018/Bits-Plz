// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyCN7ltBsNVIpK70slDSZX6xzz0uZb_OIqI',
    authDomain: 'business-semantic-analysis.firebaseapp.com',
    databaseURL: 'https://business-semantic-analysis.firebaseio.com',
    projectId: 'business-semantic-analysis',
    storageBucket: 'business-semantic-analysis.appspot.com',
    messagingSenderId: '823639850004'
  }
};
