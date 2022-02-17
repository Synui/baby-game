async function signupFormHandler(event) {
    event.preventDefault();

    const name = document.querySelector('#mom-name-register').value.trim();
    const email = document.querySelector('#mom-email-register').value.trim();
    const password = document.querySelector('#mom-password-register').value.trim();
    const dob = document.querySelector('#baby-dob');

    if (name && email && password && dob) {
        const response = await fetch('/api/moms/', {
            method: 'post',
            body: JSON.stringify({
                name,
                email,
                password,
                dob
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

document.querySelector('#mom-register-form').addEventListener('submit', signupFormHandler);