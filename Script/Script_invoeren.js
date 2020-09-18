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

    //waarde cijfer uit textveld lezen en in data stoppen.

    let data = {'toets': selectedToets.value, 'student': selectedStudent.value};
    alert(JSON.stringify(data));

    fetch('http://62.251.126.253:63231/api/cijfer', {
        method: 'post',
        body: JSON.stringify(data)
    });
}