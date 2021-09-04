import {
    getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut,
} from 'firebase/auth';
import app from './initApp';
import { addUser, handleDisconnection, setStatus } from './db';

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
        const { user } = result;
        await addUser(user);
    } catch (error) {
        console.error(error);
    }
};

const signOutHandler = async () => {
    try {
        await setStatus(auth.currentUser.uid, false);
        await signOut(auth);
        welcome.classList.remove('d-none');
        chat.classList.add('d-none');
        signInBtn.classList.remove('d-none');
    } catch (error) {
        console.log(error);
    }
};

onAuthStateChanged(auth, async (user) => {
    spinner.classList.add('d-none');
    if (user) {
        await setStatus(auth.currentUser.uid, true);
        handleDisconnection(user.uid);
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
