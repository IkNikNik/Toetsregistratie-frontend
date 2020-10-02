function post_student() {
    var selVoor = document.getElementById('voornaam').value;

    var selAchter = document.getElementById('achternaam').value;

    var selNummer = document.getElementById('nummer');



    let data = {
        'voornaam': selVoor,
        'achternaam': selAchter,
        'student_nummer': selNummer,
    };
    fetch('http://62.251.126.253:63231/api/student/', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.indexOf('application/json') !== -1)
                return response.json();
            else {
                console.log("nonJson received");
                console.log(response.text());
                return null;
            }
        })
        .then(data => {
            console.log('Success:', data);
            alert('Toets is opgeslagen');
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Toets is niet opgeslagen')
        });
}
