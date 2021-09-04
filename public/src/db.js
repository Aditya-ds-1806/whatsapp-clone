import {
    getDatabase,
    ref,
    set,
    onDisconnect,
} from 'firebase/database';
import app from './initApp';

const db = getDatabase(app);

export const addUser = ({ uid, displayName: name, photoURL: img }) => {
    const userRef = ref(db, `/users/${uid}`);
    return set(userRef, {
        name,
        img,
        online: true,
    });
};

export const handleDisconnection = (uid) => {
    const statusRef = ref(db, `/users/${uid}/online`);
    return onDisconnect(statusRef).set(false);
};

export const setStatus = (uid, status = true) => {
    const statusRef = ref(db, `/users/${uid}/online`);
    return set(statusRef, status);
};
