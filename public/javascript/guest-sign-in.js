async function guestLoginHandler(event) {
    event.preventDefault();

    const email = document.querySelector('#guest-email-login').value.trim();
    const password = document.querySelector('#guest-password-login').value.trim();

    if (email && password) {
        const response = await fetch('/api/guests/login', {
            method: 'post',
            body: JSON.stringify({
                email,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
}

document.querySelector('#guest-login-form').addEventListener('submit', guestLoginHandler);