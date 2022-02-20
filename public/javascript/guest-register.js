async function signupGuestHandler(event) {
    event.preventDefault();

    const name = document.querySelector('#guest-name-register').value.trim();
    const email = document.querySelector('#guest-email-register').value.trim();
    const password = document.querySelector('#guest-password-register').value.trim();
    const mom_email = document.querySelector('#mom-email-confirm').value.trim();

    if (name && email && password && mom_email) {
        const response = await fetch('/api/guests', {
            method: 'post',
            body: JSON.stringify({
                name,
                email,
                password,
                mom_email
            }),
            headers: { 'Content-Type': 'application/json' }
        })
        // check the response status
        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
}

document.querySelector('#guest-register-form').addEventListener('submit', signupGuestHandler);