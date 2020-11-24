function loadjaarblok() {

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
        )
}


function post_toets() {
    var selToets = document.getElementById('toetscode').value;
    // var selectedToets = selToets[selToets.selectedIndex];

    var selToetsNaam = document.getElementById('toetsnaam').value;
    // var selectedToetsNaam = selToetsNaam[selToetsNaam.selectedIndex];

    var selJaar = document.getElementById('jaar-dropdown');
    var selectedJaar = selJaar.options[selJaar.selectedIndex];

    var selBlok = document.getElementById('blok-dropdown');
    var selectedBlok = selBlok.options[selBlok.selectedIndex];
    //waarde cijfer uit textveld lezen en in data stoppen.


    let data = {
        'toets_naam': selToetsNaam,
        'blok': [selectedBlok.value],
        'toets_code': selToets,
        'jaar': selectedJaar.value
    };
    fetch('https://hu-toetsregistratie.nl/api/toets/', {
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
