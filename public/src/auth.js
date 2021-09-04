import {
    getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged,
} from 'firebase/auth';
import app from './initApp';

const singInBtn = document.querySelector('#signIn');
const provider = new GoogleAuthProvider();
const auth = getAuth(app);
const welcome = document.querySelector('#welcome');
const chat = document.querySelector('#chat');
const spinner = document.querySelector('.spinner-border');

const signInHandler = async () => {
    try {
        const result = await signInWithPopup(auth, provider);
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const { user } = result;
        console.log(user, token);
    } catch (error) {
        console.error(error);
    }
};

onAuthStateChanged(auth, (user) => {
    if (user) {
        welcome.classList.add('d-none');
        chat.classList.remove('d-none');
    } else {
        welcome.classList.remove('d-none');
        chat.classList.add('d-none');
        spinner.classList.add('d-none');
        singInBtn.classList.remove('d-none');
        singInBtn.addEventListener('click', signInHandler);
    }
});
