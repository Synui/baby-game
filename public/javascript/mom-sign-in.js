async function momLoginHandler(event) {
    event.preventDefault();

    const email = document.querySelector('#mom-email-login').value.trim();
    const password = document.querySelector('#mom-password-login').value.trim();

    if (email && password) {
        const response = await fetch('/api/moms/login', {
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

document.querySelector('#mom-login-form').addEventListener('submit', momLoginHandler);
