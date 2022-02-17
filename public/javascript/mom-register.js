async function signupFormHandler(event) {
    event.preventDefault();

    const username = document.querySelector('#mom-name-register').value.trim();
    const email = document.querySelector('#mom-email-register').value.trim();
    const password = document.querySelector('#mom-password-register').value.trim();
    const dob = document.querySelector('#baby-dob').val.trim();

    if (username && email && password && dob) {
        const response = await fetch('/api/users', {
            method: 'post',
            body: JSON.stringify({
                username,
                email,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        })
        // check the response status
        if (response.ok) {
            document.location.replace('/make-your-vote');
        } else {
            alert(response.statusText);
        }
    }
}

document.querySelector('#mom-register-form').addEventListener('submit', signupFormHandler);