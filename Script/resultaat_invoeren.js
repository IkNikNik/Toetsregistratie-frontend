let studentenLijst = [];

function loadstudentandtoets() {
    fetch('https://hu-toetsregistratie.nl/api/student.json')
        .then(
            function (response) {
                if (response.status !== 200) {
                    console.warn('Looks like there was a problem. Status Code: ' +
                        response.status);
                    return;
                }

                response.json().then(function (data) {
                    studentenLijst = [];
                    for (let i = 0; i < data.length; i++) {
                        let studentNaam = data[i].voornaam + ' ' + data[i].achternaam;
                        studentenLijst.push({'naam': studentNaam, 'id': data[i].id})
                    }
                    loadItems('');
                });
            }
        );

    let dropdownBlok = document.getElementById('blok-dropdown');
    dropdownBlok.length = 0;
    fetch('https://hu-toetsregistratie.nl/api/blok.json')
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

    let dropdownToets = document.getElementById('toets-dropdown');
    dropdownToets.length = 0;

    fetch('https://hu-toetsregistratie.nl/api/toets.json')
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
                        optionToets.text = data[i].toets_naam + ' code: ' + data[i].toets_code;
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


function post_invoer() {
    event.preventDefault()
    let selToets = document.getElementById('toets-dropdown');
    let selectedToets = selToets.options[selToets.selectedIndex];

    let selStudent = document.getElementById('naam-dropdown');
    let selectedStudent = selStudent.options[selStudent.selectedIndex];

    let selCijfer = document.getElementById('cijfer');
    let selectedCijfer = selCijfer.options[selCijfer.selectedIndex];

    let selBlok = document.getElementById('blok-dropdown');
    let selectedBlok = selBlok.options[selBlok.selectedIndex];

    let selData = document.getElementById('datum').value;
    //waarde cijfer uit textveld lezen en in data stoppen.


    let data = {
        'student': selectedStudent.value,
        'blok': selectedBlok.value,
        'toets_code': selectedToets.value,
        'toets_naam': selectedToets.value,
        'voldoende': selectedCijfer.value,
        'datum_toets': selData
    };


    fetch('https://hu-toetsregistratie.nl/api/cijferid/', {
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
            alert('Resultaat is opgeslagen');
            console.log(selData)
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Resultaat is niet opgeslagen')
        });
}

function loadItems(filter) {
    let dropdown = document.getElementById('naam-dropdown');
    dropdown.length = 0;
    for (let i = 0; i < studentenLijst.length; i++) {
        option = document.createElement('option');
        option.text = studentenLijst[i].naam;
        option.value = studentenLijst[i].id;
        if (studentenLijst[i].naam.toLowerCase().indexOf(filter.toLowerCase()) != -1) {
            dropdown.add(option);
        }
    }
}

function filterItems(el) {
    let value = el.value.toLowerCase();
    loadItems(value);
}



