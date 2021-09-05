import {
    getDatabase,
    ref,
    set,
    onDisconnect,
    get,
    onValue,
    push,
} from 'firebase/database';
import app from './initApp';
import markMessagesStatus from './chat';
import { listUsers, updateActiveChat } from './helpers';

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

export const getUsers = async () => {
    const usersRef = ref(db, '/users');
    const result = await get(usersRef);
    return result.val();
};

export const observeUsers = (uid) => {
    onValue(ref(db, '/users'), (result) => {
        const users = result.val();
        listUsers(users, uid);
    });
};

export const observeMessages = async (currentUid) => {
    const users = await getUsers();
    Object.keys(users).forEach((uid) => {
        if (currentUid === uid) return;
        const convId = [currentUid, uid].sort().join(':');
        onValue(ref(db, `/chats/${convId}`), async (result) => {
            const messages = result.val();
            localStorage.setItem(convId, JSON.stringify(messages));
            markMessagesStatus(messages, convId, currentUid, '1');
            updateActiveChat(currentUid, markMessagesStatus);
        });
    });
};

export const addMessage = (data) => {
    const { sender, receiver } = data;
    const convId = [sender, receiver].sort().join(':');
    const messageRef = ref(db, `/chats/${convId}`);
    return push(messageRef, data);
};
