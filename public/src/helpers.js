export const createNewMessage = ({ chatId, message, status }, alignLeft = true) => {
    const div = document.createElement('div');
    const p = document.createElement('p');
    const checks = document.createElement('p');
    const check = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check">
                        <polyline points="20 6 9 17 4 12"/>
                    </svg>`;
    if (alignLeft) {
        div.classList.add('bg-dark', 'my-3', 'py-2', 'px-3', 'w-75', 'rounded');
    } else {
        div.classList.add('bg-green', 'text-dark', 'my-3', 'py-2', 'px-3', 'w-75', 'rounded', 'ms-auto');
        checks.classList.add('mb-0', 'text-end');
        checks.innerHTML = check + check;
    }
    p.classList.add('mb-0');
    p.textContent = message;
    div.dataset.status = status;
    div.id = chatId;
    div.append(p);
    if (!alignLeft) div.append(checks);
    return div;
};

export const appendMessage = (messageDiv) => {
    const messages = document.querySelector('#messages');
    messages.append(messageDiv);
    document.querySelector('input').value = '';
    messages.scrollTop = messages.scrollHeight;
};

export const updateActiveChat = (currentUid) => {
    const messages = document.querySelector('#messages');
    const activeChatUid = messages.dataset.uid;
    if (!activeChatUid) return;
    const activeConvId = [currentUid, activeChatUid].sort().join(':');
    if (localStorage.getItem(activeConvId) === 'null') {
        messages.innerHTML = '';
        return;
    }
    const activeUidMessages = JSON.parse(localStorage.getItem(activeConvId));
    Object.entries(activeUidMessages).forEach(([chatId, { message, sender, status }]) => {
        if (!document.querySelector(`#messages #${chatId}`)) {
            appendMessage(createNewMessage({ chatId, message, status }, sender !== currentUid));
        }
    });
};

export const createContact = (uid, currentUid, { name, img, online }) => {
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
    div.addEventListener('click', () => {
        document.querySelector('#messages').dataset.uid = uid;
        updateActiveChat(currentUid);
    });
    return div;
};

export const listUsers = (users, currentUid) => {
    const usersDiv = document.querySelector('#users');
    usersDiv.innerHTML = '';
    Object.entries(users).forEach(([uid, user]) => {
        if (uid !== currentUid) usersDiv.append(createContact(uid, currentUid, user));
    });
};

export const showWelcome = () => {
    const welcome = document.querySelector('#welcome');
    const chat = document.querySelector('#chat');
    const signInBtn = document.querySelector('#signIn');
    welcome.classList.remove('d-none');
    chat.classList.add('d-none');
    signInBtn.classList.remove('d-none');
};

export const showChat = () => {
    const welcome = document.querySelector('#welcome');
    const chat = document.querySelector('#chat');
    welcome.classList.add('d-none');
    chat.classList.remove('d-none');
};

export const hideSpinner = () => {
    const spinner = document.querySelector('.spinner-border');
    spinner.classList.add('d-none');
};
