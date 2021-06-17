onload = () => {
    var cookieUsername = getCookie('username');

    if (cookieUsername) {
        successLogin(cookieUsername);
    }
}

const popup = document.querySelector('.popup');

function showPopup() {
    popup.style.display = 'block';
}

function hidePopup() {
    popup.style.display = 'none';
}

var btn = document.getElementById('log-btn');
var checkbox = document.getElementById('checkbox-remember');
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
                successLogin(username);
            } else {
                alert('пароль неверен');
            }

            clearLoginInput();
            return;
        }
    }

    a.push({ name: username, password: btoa(password) });

    localStorage.setItem('all_users', JSON.stringify(a));
    successLogin(username);
    clearLoginInput();
}

function logout() {
    btn.classList.remove('header-button');
    btn.classList.add('header-button-back');
    btn.innerHTML = "Войти";
    btn.onclick = showPopup;
    divName.innerHTML = '';
    eraseCookie('username');
}

function successLogin(username) {
    if (checkbox.checked) {
        setCookie('username', username, 1);
        console.log('saved');
    }
    btn.classList.remove('header-button-back');
    btn.classList.add('header-button');
    btn.onclick = logout;
    btn.innerHTML = "Выйти";
    divName.innerHTML = username;
    hidePopup();
}

function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
    console.log(document.cookie);
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function eraseCookie(name) {
    document.cookie = name + '=; Max-Age=-99999999;';
}