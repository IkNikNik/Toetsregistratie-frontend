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
                    let option;

                    for (let i = 0; i < data.length; i++) {
                        option = document.createElement('option');
                        option.text = data[i].voornaam + ' ' + data[i].achternaam;
                        option.value = data[i].id;
                        dropdown.add(option);
                    }
                });
            }
        )

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
    var selToets = document.getElementById('toets-dropdown');
    var selectedToets = selToets.options[selToets.selectedIndex];

    var selStudent = document.getElementById('naam-dropdown');
    var selectedStudent = selStudent.options[selStudent.selectedIndex];

    var selCijfer = document.getElementById('cijfer');
    var selectedCijfer = selCijfer.options[selCijfer.selectedIndex];
    //waarde cijfer uit textveld lezen en in data stoppen.


    let data = {'student': selectedStudent.value, 'toets': selectedToets.value, 'cijfer' : selectedCijfer.value};
    fetch('http://62.251.126.253:63231/api/cijferid/', {
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
