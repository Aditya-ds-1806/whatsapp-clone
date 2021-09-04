import './initApp';
import './auth';
import { createNewMessage } from './helpers';

const form = document.querySelector('form');
const messages = document.querySelector('#messages');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const message = document.querySelector('input').value;
    if (message.trim() === '') return;
    const messageDiv = createNewMessage(message, false);
    document.querySelector('input').value = '';
    messages.append(messageDiv);
    messages.scrollTop = messages.scrollHeight;
});
