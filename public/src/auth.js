import {
    getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut,
} from 'firebase/auth';
import app from './initApp';
import {
    addUser, getUsers, handleDisconnection, setStatus,
} from './db';

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

const createContact = (uid, { name, img, online }) => {
    const div = document.createElement('div');
    const image = document.createElement('img');
    const p = document.createElement('p');
    const span = document.createElement('span');
    p.textContent = name.length <= 10 ? name : `${name.substr(0, 10)}...`;
    div.id = uid;
    image.src = img;
    image.width = 40;
    image.height = 40;
    image.alt = name;
    div.classList.add('d-flex', 'border', 'border-2', 'border-dark', 'p-3', 'align-items-center');
    image.classList.add('rounded-circle');
    p.classList.add('lead', 'mb-0', 'ms-3');
    span.classList.add(online ? 'bg-green' : 'bg-dark', 'circle', 'ms-auto');
    div.append(image, p, span);
    return div;
};

const listUsers = (users, currentUid) => {
    const usersDiv = document.querySelector('#users');
    Object.entries(users).forEach(([uid, user]) => {
        if (uid !== currentUid) usersDiv.append(createContact(uid, user));
    });
};

onAuthStateChanged(auth, async (user) => {
    if (user) {
        await setStatus(auth.currentUser.uid, true);
        const users = await getUsers();
        listUsers(users, user.uid);
        handleDisconnection(user.uid);
        welcome.classList.add('d-none');
        chat.classList.remove('d-none');
    } else {
        welcome.classList.remove('d-none');
        chat.classList.add('d-none');
        signInBtn.classList.remove('d-none');
    }
    spinner.classList.add('d-none');
});

signInBtn.addEventListener('click', signInHandler);
signOutBtn.addEventListener('click', signOutHandler);
