function loadstudentandtoets() {
    let dropdown = document.getElementById('naam-dropdown');
    dropdown.length = 0;

    fetch('http://62.251.126.253:63231/api/student.json')
        .then(
            function (response) {
                if (response.status !== 200) {
                    console.warn('Looks like there was a problem. Status Code: ' +
                        response.status);
                    return;
                }

                response.json().then(function (data) {
                    let option = '';

                    for (let i = 0; i < data.length; i++) {
                        option = document.createElement('option');
                        option.text = data[i].voornaam + ' ' + data[i].achternaam;
                        option.value = data[i].id;
                        dropdown.add(option);
                        // option += '<option value="' + data[i].voornaam + ' ' + data[i].achternaam + '" />';
                        // option.value = data[i].id;
                    }
                    // document.getElementById('naam-dropdown').innerHTML = options;
                });
            }
        );

    let dropdownBlok = document.getElementById('blok-dropdown');
    dropdownBlok.length = 0;
    fetch('http://62.251.126.253:63231/api/blok.json')
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

    fetch('http://62.251.126.253:63231/api/toets.json')
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
        'voldoende': selectedCijfer.value,
        'datum_toets' : selData
    };


    fetch('http://62.251.126.253:63231/api/cijferid/', {
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
            console.log(selData)
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Toets is niet opgeslagen')
        });
}

let optionsCache = [];

function filterItems(el) {
    let value = el.value.toLowerCase();
    let form = el.form;
    let opt, sel = form.student;
    if (value == '') {
        restoreOptions();
    } else {
        for (let i=sel.options.length-1; i>=0; i--) {
            opt = sel.options[i];
            if (opt.text.toLowerCase().indexOf(value) == -1){
                sel.removeChild(opt)
            }
        }
    }
}

function restoreOptions(){
    let sel = document.getElementById('naam-dropdown');
    sel.options.length = 0;
    for (let i=0, iLen=optionsCache.length; i<iLen; i++) {
        sel.appendChild(optionsCache[i]);
    }
}


window.onload = function() {
    // Load cache
    let sel = document.getElementById('naam-dropdown');
    for (let i=0, iLen=sel.options.length; i<iLen; i++) {
        optionsCache.push(sel.options[i]);
    }
}


