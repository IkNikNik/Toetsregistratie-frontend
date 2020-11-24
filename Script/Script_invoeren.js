function loadStudentToets() {

    fetchStudenten()
    fetchBlokken()
    fetchToetsen()
}
function fetchStudenten() {
    let dropdownNaam = document.getElementById('naam-dropdown');
    dropdownNaam.length = 0;
    fetch('https://62.251.126.253:63231/api/student.json')
        .then(
            function (response) {
                if (response.status !== 200) {
                    console.warn('Looks like there was a problem. Status Code: ' +
                        response.status);
                    return;
                }

                response.json().then(function (data) {
                    let option;

                    for (let i = 0; i < data.length; i++) {
                        option = document.createElement('option');
                        option.text = data[i].voornaam + ' ' + data[i].achternaam;
                        option.value = data[i].id;
                        dropdownNaam.add(option);
                    }
                });
            }
        );
}
function fetchBlokken() {
    let dropdownBlok = document.getElementById('blok-dropdown');
    dropdownBlok.length = 0;
    fetch('https://62.251.126.253:63231/api/blok.json')
        .then(
            function (response) {
                if (response.status !== 200) {
                    console.warn('Looks like there was a problem. Status Code: ' +
                        response.status);
                    return;
                }

                response.json().then(function (data) {
                    let optionBlok;

                    for (let i = 0; i < data.length; i++) {
                        optionBlok = document.createElement('option');
                        optionBlok.text = data[i].blok;
                        optionBlok.value = data[i].id;
                        dropdownBlok.add(optionBlok);
                    }
                });
            }
        );
}
function fetchToetsen() {
    let dropdownToets = document.getElementById('toets-dropdown');
    dropdownToets.length = 0;

    fetch('https://62.251.126.253:63231/api/toets.json')
        .then(
            function (response) {
                if (response.status !== 200) {
                    console.warn('Looks like there was a problem. Status Code: ' +
                        response.status);
                    return;
                }

                response.json().then(function (data) {
                    let optionToets;

                    for (let i = 0; i < data.length; i++) {
                        optionToets = document.createElement('option');
                        optionToets.text = data[i].toets_code;
                        optionToets.value = data[i].id;
                        dropdownToets.add(optionToets);
                    }
                });
            }
        )
        .catch(function (err) {
            console.error('Fetch Error -', err);
        });
}

function postInvoer() {
    let selToets = document.getElementById('toets-dropdown');
    let selectedToets = selToets.options[selToets.selectedIndex];

    let selStudent = document.getElementById('naam-dropdown');
    let selectedStudent = selStudent.options[selStudent.selectedIndex];

    let selCijfer = document.getElementById('cijfer');
    let selectedCijfer = selCijfer.options[selCijfer.selectedIndex];

    let selBlok = document.getElementById('blok-dropdown');
    let selectedBlok = selBlok.options[selBlok.selectedIndex];
    //waarde cijfer uit textveld lezen en in data stoppen.


    let data = {
        'student': selectedStudent.value,
        'blok': selectedBlok.value,
        'toets_code': selectedToets.value,
        'voldoende': selectedCijfer.value
    };
    fetch('https://62.251.126.253:63231/api/cijferid/', {
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
