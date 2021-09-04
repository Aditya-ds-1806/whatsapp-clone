export const createNewMessage = (text, alignLeft = true) => {
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
};

export const createContact = (uid, { name, img, online }) => {
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

export const listUsers = (users, currentUid) => {
    const usersDiv = document.querySelector('#users');
    usersDiv.innerHTML = '';
    Object.entries(users).forEach(([uid, user]) => {
        if (uid !== currentUid) usersDiv.append(createContact(uid, user));
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
