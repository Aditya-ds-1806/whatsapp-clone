import { update, ref, getDatabase } from 'firebase/database';
import app from './initApp';

const db = getDatabase(app);

const markMessagesStatus = (messages, convId, currentUid, state) => {
    const updates = {};
    Object.entries(messages).forEach(async ([chatId, { receiver, status }]) => {
        if (receiver === currentUid && status === `${Number(state) - 1}`) {
            updates[`${chatId}/status`] = state;
        }
    });
    return update(ref(db, `chats/${convId}`), updates);
};

export default markMessagesStatus;
