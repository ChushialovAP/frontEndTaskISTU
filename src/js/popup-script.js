const popup = document.querySelector('.popup');

function showPopup() {
    popup.style.display = 'block';
}

function hidePopup() {
    popup.style.display = 'none';
}

var btn = document.getElementById('log-btn');
var divName = document.getElementById('div-name-content');

function clearLoginInput() {
    document.getElementById('nm').value = '';
    document.getElementById('pw').value = '';
}

function login() {
    var a = new Array();

    var username = document.getElementById('nm').value;
    var password = document.getElementById('pw').value;

    a = JSON.parse((localStorage.getItem('all_users'))) || [];

    const hash = Object.fromEntries(
        a.map(e => [e.name, e.password])
    );

    for (let key in hash) {
        if (key === username) {
            if (atob(hash[key]) === password) {
                btn.classList.remove('header-button-back');
                btn.classList.add('header-button');
                btn.onclick = logout;
                btn.innerHTML = "Выйти";
                divName.innerHTML = username;
                hidePopup();
            } else {
                alert('пароль неверен');
            }

            clearLoginInput();
            return;
        }
    }

    a.push({ name: username, password: btoa(password) });

    localStorage.setItem('all_users', JSON.stringify(a));
    hidePopup();
    clearLoginInput();
}

function logout() {
    btn.classList.remove('header-button');
    btn.classList.add('header-button-back');
    btn.innerHTML = "Войти";
    btn.onclick = showPopup;
    divName.innerHTML = '';
}