window.addEventListener("load", async function(event) {
    await addAllComments();
}, false);
/**
 * Helper function for POSTing data as JSON with fetch.
 *
 * @param {Object} options
 * @param {string} options.url - URL to POST data to
 * @param {FormData} options.formData - `FormData` instance
 * @return {Object} - Response body from URL that was POSTed to
 */
async function addCommentToDB({
    url,
    formData = null
}) {
    const plainFormData = Object.fromEntries(formData.entries());
    const formDataJsonString = JSON.stringify(plainFormData);

    console.log(formDataJsonString);

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

    console.log(url);

    try {
        const un = await getName();
        if (un == null) {
            alert('login needed');
            return;
        };
        var parts = window.location.href.split('/');
        var lastSegment = parts.pop() || parts.pop();
        const formData = new FormData(form);
        formData.append('title', lastSegment);
        formData.append('username', un);
        const _ = await addCommentToDB({
            url,
            formData
        });
        addCommentToPage(formData);
    } catch (error) {
        console.error(error);
    }
}

function addCommentToPage(data) {
    $("#ul-comments").append('<li><p>' + data.get('username') + '</p><p>' + data.get('bodyText') + '</p></li>');
    $("#comment-inp").val('');
    window.location.href = window.location.href.split("?")[0]; //"http://www.newurl.com";
}

async function addAllComments() {
    var parts = window.location.href.split('/');
    var lastSegment = parts.pop() || parts.pop();

    const fetchOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            title: lastSegment,
        },
    };

    try {
        const res = await fetch('/comment/get', fetchOptions);
        const resData = await res.json();
        if (!res.ok) {
            const errorMessage = await res.text();
            throw new Error(errorMessage);
        } else {
            resData.comments.forEach(comment => {
                $("#ul-comments").append('<li><p>' + comment.username + '</p><p>' + comment.bodyText + '</p></li>');
            });
        }
    } catch (error) {
        console.log(error);
    }
}

async function getName() {
    const token = localStorage.getItem('token');
    if (token == null) {
        return null;
    }
    const fetchOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            token: token,
        },
    };

    try {
        const res = await fetch('/me', fetchOptions);
        const resData = await res.json();
        if (!res.ok) {
            const errorMessage = await res.text();
            throw new Error(errorMessage);
        } else {
            return resData.username;
        }
    } catch (error) {
        console.log(error);
    }
}

const commentForm = document.getElementById("comment-form");
commentForm.addEventListener("submit", handleFormSubmit);