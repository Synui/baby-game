async function signupGuestHandler(event) {
    event.preventDefault();

    const username = document.querySelector('#guest-name-register').value.trim();
    const email = document.querySelector('#guest-email-register').value.trim();
    const password = document.querySelector('#guest-password-register').value.trim();
    const mEmail = document.querySelector('#mom-email-confirm').value.trim();

    if (username && email && password && mEmail) {
        const response = await fetch('/api/guests', {
            method: 'post',
            body: JSON.stringify({
                username,
                email,
                password,
                mom_email
            }),
            headers: { 'Content-Type': 'application/json' }
        })
        // check the response status
        if (response.ok) {
            document.location.replace('/');
        } else {
            alert(response.statusText);
        }
    }
}

document.querySelector('#guest-register-form').addEventListener('submit', signupGuestHandler);