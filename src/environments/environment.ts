export const environment = {
  production: true,
  firebaseConfig: {
    projectId: process.env['NG_APP_FIREBASE_PROJECT_ID'],
    appId: process.env['NG_APP_FIREBASE_APP_ID'],
    storageBucket: process.env['NG_APP_FIREBASE_STORAGE_BUCKET'],
    apiKey: process.env['NG_APP_FIREBASE_API_KEY'],
    authDomain: process.env['NG_APP_FIREBASE_AUTH_DOMAIN'],
    messagingSenderId: process.env['NG_APP_FIREBASE_MESSAGING_SENDER_ID'],
  },
  apiQuiz: {
    apiKey: process.env['NG_APP_API_QUIZ_KEY'],
  },
};
