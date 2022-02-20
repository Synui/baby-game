async function answerPosts(event) {
    event.preventDefault();

    const gender = document.querySelector('.gender-choice');
    const weight_in_pounds = document.querySelector('.weight-choice');
    const date_of_birth = document.querySelector('.date-choice');
    const guest_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1 ];

    if (gender && weight_in_pounds && date_of_birth) {
        const response = await fetch('/api/answers', {
            method: 'POST',
            body: JSON.stringify({
                guest_id,
                gender,
                weight_in_pounds,
                date_of_birth
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            document.location.replace('cards-with-posts');
        } else {
            alert(response.statusText);
        }
    }
}

document.querySelector('#answer-form').addEventListener('submit', answerPosts);