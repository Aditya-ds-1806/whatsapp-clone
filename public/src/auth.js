import {
    getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut,
} from 'firebase/auth';
import app from './initApp';

const auth = getAuth(app);
const welcome = document.querySelector('#welcome');
const chat = document.querySelector('#chat');
const spinner = document.querySelector('.spinner-border');
const signInBtn = document.querySelector('#signIn');
const signOutBtn = document.querySelector('#signOut');

const signInHandler = async () => {
    const provider = new GoogleAuthProvider();
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

const signOutHandler = async () => {
    try {
        await signOut(auth);
        welcome.classList.remove('d-none');
        chat.classList.add('d-none');
        signInBtn.classList.remove('d-none');
    } catch (error) {
        console.log(error);
    }
};

onAuthStateChanged(auth, (user) => {
    spinner.classList.add('d-none');
    if (user) {
        welcome.classList.add('d-none');
        chat.classList.remove('d-none');
    } else {
        welcome.classList.remove('d-none');
        chat.classList.add('d-none');
        signInBtn.classList.remove('d-none');
    }
});

signInBtn.addEventListener('click', signInHandler);
signOutBtn.addEventListener('click', signOutHandler);
