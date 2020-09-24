function loadjaarblok() {

    let dropdownJaar = document.getElementById('jaar-dropdown');
    dropdownJaar.length = 0;
    fetch('http://62.251.126.253:63231/api/jaar.json')
        .then(
            function (response) {
                if (response.status !== 200) {
                    console.warn('Looks like there was a problem. Status Code: ' +
                        response.status);
                    return;
                }

                response.json().then(function (data) {
                    let optionJaar;

                    for (let i = 0; i < data.length; i++) {
                        optionJaar = document.createElement('option');
                        optionJaar.text = data[i].jaar;
                        optionJaar.value = data[i].id;
                        dropdownJaar.add(optionJaar);
                    }
                });
            }
        )

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
        )
        .catch(function (err) {
            console.error('Fetch Error -', err);
        });
}


function post_toets() {
    var selToets = document.getElementById('toetscode');
    var selectedToets = selToets.options[selToets.selectedIndex];

    var selToetsNaam = document.getElementById('toetsnaam');
    var selectedToetsNaam = selToetsnaam.options[selToetsNaam.selectedIndex];

    var selJaar = document.getElementById('jaar-dropdown');
    var selectedJaar = selJaar.options[selJaar.selectedIndex];

    var selBlok = document.getElementById('blok-dropdown');
    var selectedBlok = selBlok.options[selBlok.selectedIndex];
    //waarde cijfer uit textveld lezen en in data stoppen.


    let data = {
        'toets_naam': selectedToetsNaam.value,
        'blok': selectedBlok.value,
        'toets_code': selectedToets.value,
        'jaar': selectedJaar.value
    };
    fetch('http://62.251.126.253:63231/api/toets/', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.indexOf('application/json') != -1)
                return response.json()
            else {
                console.log("nonJson received");
                console.log(response.text());
                return null;
            }
        })
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}
