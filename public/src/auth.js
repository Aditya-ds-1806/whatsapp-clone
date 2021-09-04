import {
    getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut,
} from 'firebase/auth';
import app from './initApp';
import {
    addUser, handleDisconnection, setStatus, observeUsers, observeMessages,
} from './db';
import { hideSpinner, showChat, showWelcome } from './helpers';

const auth = getAuth(app);
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
        showWelcome();
    } catch (error) {
        console.log(error);
    }
};

const getCurrentUser = () => auth.currentUser;

onAuthStateChanged(auth, async (user) => {
    if (user) {
        await setStatus(user.uid, true);
        await observeMessages(user.uid);
        observeUsers(user.uid);
        handleDisconnection(user.uid);
        showChat();
    } else {
        showWelcome();
    }
    hideSpinner();
});

signInBtn.addEventListener('click', signInHandler);
signOutBtn.addEventListener('click', signOutHandler);

export default getCurrentUser;
