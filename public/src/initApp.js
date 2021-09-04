import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: 'AIzaSyAk0oiLr9LIcF_NXNrdkRZwezGErTEkj3s',
    authDomain: 'whatsappclone-dive.firebaseapp.com',
    projectId: 'whatsappclone-dive',
    storageBucket: 'whatsappclone-dive.appspot.com',
    messagingSenderId: '943212827164',
    databaseURL: 'https://whatsappclone-dive-default-rtdb.asia-southeast1.firebasedatabase.app/',
    appId: '1:943212827164:web:ed88c659700a6793e205d9',
};

const app = initializeApp(firebaseConfig);

export default app;
