import './initApp';
import './auth';

const form = document.querySelector('form');
const messages = document.querySelector('#messages');

function createNewMessage(text, alignLeft = true) {
    const div = document.createElement('div');
    const p = document.createElement('p');
    if (alignLeft) {
        div.classList.add('bg-dark', 'my-3', 'py-2', 'px-3', 'w-75', 'rounded');
    } else {
        div.classList.add('bg-green', 'text-dark', 'my-3', 'py-2', 'px-3', 'w-75', 'rounded', 'ms-auto');
    }
    p.classList.add('mb-0');
    p.textContent = text;
    div.append(p);
    return div;
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const message = document.querySelector('input').value;
    if (message.trim() === '') return;
    const messageDiv = createNewMessage(message, false);
    document.querySelector('input').value = '';
    messages.append(messageDiv);
    messages.scrollTop = messages.scrollHeight;
});
