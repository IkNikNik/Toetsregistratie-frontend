// @TODO: Write a PATCH request for a user-selected row.
let url = 'https://62.251.126.253:63231/api/cijfer.json'
let xhr = new XMLHttpRequest();

function editGrade() {
    // PATCh request for the graded result 'resultaat'.
    let grade = document.getElementById("resultaat")
    fetch(url, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(grade)
    })
        .then(response => {
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.indexOf('application/json') !== -1)
                return response.json();
            else {
                console.log("non-JSON object received!");
                console.log(response.text());
                return null;
            }
        })
        .then(data => {
            console.log('Success:', data);
            alert('Student is opgeslagen');
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Student is niet opgeslagen')
        });
}
