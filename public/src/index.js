import './initApp';
import getCurrentUser from './auth';
import { addMessage } from './db';

const form = document.querySelector('form');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const message = document.querySelector('input').value.trim();
    const receiver = document.querySelector('#messages').dataset.uid;
    const sender = getCurrentUser().uid;
    if (message === '') return;
    const data = {
        sender, receiver, message, status: '0',
    };
    await addMessage(data);
});
