const popup = document.querySelector('.popup');

window.showPopup = function() {
    popup.style.display = 'block';
}

window.hidePopup = function() {
    popup.style.display = 'none';
}

var btn = document.getElementById('log-btn');
var divName = document.getElementById('div-name-content');

function clearLoginInput() {
    document.getElementById('nm').value = '';
    document.getElementById('pw').value = '';
}

function logout() {
    btn.classList.remove('header-button');
    btn.classList.add('header-button-back');
    btn.innerHTML = "Войти";
    btn.onclick = showPopup;
    divName.innerHTML = '';
    localStorage.removeItem('token');
}

function successLogin(username) {
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


/**
 * Helper function for POSTing data as JSON with fetch.
 *
 * @param {Object} options
 * @param {string} options.url - URL to POST data to
 * @param {FormData} options.formData - `FormData` instance
 * @return {Object} - Response body from URL that was POSTed to
 */
async function postFormDataAsJson({
    url,
    formData
}) {
    const plainFormData = Object.fromEntries(formData.entries());
    const formDataJsonString = JSON.stringify(plainFormData);

    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: formDataJsonString,
    };

    const response = await fetch(url, fetchOptions);

    if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
    }

    return response.json();
}

/**
 * Event handler for a form submit event.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/submit_event
 *
 * @param {SubmitEvent} event
 */
async function handleFormSubmit(event) {
    event.preventDefault();

    const form = event.currentTarget;
    const url = form.action;

    try {
        const formData = new FormData(form);
        const responseData = await postFormDataAsJson({
            url,
            formData
        });

        localStorage.token = responseData.token;
        successLogin(responseData.username);
    } catch (error) {
        console.error(error);
    }
}

const exampleForm = document.getElementById("login-form");
exampleForm.addEventListener("submit", handleFormSubmit);