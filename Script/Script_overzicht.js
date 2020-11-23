window.onload = function () {
    // Stuurt fetch naar de 'cijfer' API
    fetch('https://62.251.126.253:63231/api/cijfer.json')
        .then(response => response.json())
        .then(data => {
            // @TODO: These variables try to sort the data... WIP. More below.
            let sortName = data.student.voornaam.sort();
            let sortBlok = data.blok.sort()
            let sortToets = data.toetsnaam.sort()
            let sortResultaat = data.resultaat.sort()

            // putting the fetched data in the function 'appendData'.
            appendData(data)

            // Appends data to the table
            function appendData(inputData) {
                // mainContainer is the variable wherein the table will appear.
                let mainContainer = document.getElementById("content");
                for (let i = 0; i < inputData.length; i++) {

                    // HTML NOTE: td = table data, tr = table row, th = table header

                    // Ads an empty table row to the table thus filling its content.
                    let tr = document.createElement("tr");
                    tr.innerHTML = '';
                    mainContainer.appendChild(tr);

                    // Adds the students' given- and family name to the table.
                    // The following lines will do the same for other attributes.
                    // The result is a table with a students':
                    // given name, family name, 'blok', testname, result.
                    let trNaam = document.createElement("td");
                    trNaam.innerHTML = inputData[i].student.voornaam + ' ' + inputData[i].student.achternaam;
                    mainContainer.appendChild(trNaam);

                    let trBlok = document.createElement("td");
                    trBlok.innerHTML = inputData[i].blok;
                    mainContainer.appendChild(trBlok);

                    // Adds an area for the name of the test.
                    let trToets = document.createElement("td");
                    trToets.innerHTML = inputData[i].toets_code;
                    mainContainer.appendChild(trToets);

                    // Checks if the grade is a passing one or a non-passing one.
                    let cijfer = inputData[i].voldoende;
                    if (cijfer === true) {
                        resultaat = 'Voldoende';
                    } else {
                        resultaat = 'Onvoldoende';
                    }

                    // Adds the graded result to the table.
                    let trCijfer = document.createElement("td");
                    trCijfer.innerHTML = resultaat;
                    mainContainer.appendChild(trCijfer);
                }

                // What does this function do?
                document.getElementById("naam").onclick = function () {
                    const table = document.getElementById('content');
                    table.innerHTML = '';
                    sorterenNaam()
                    if (sortName === 'ascending') {
                        sortName = 'descending';
                    } else {
                        sortName = 'ascending';
                    }
                };

                // What does this function do?
                document.getElementById("blok").onclick = function () {
                    const table = document.getElementById('content');
                    table.innerHTML = '';
                    sorterenBlok()
                    if (sortBlok === 'ascending') {
                        sortBlok = 'descending';
                    } else {
                        sortBlok = 'ascending';
                    }
                };

                // What does this function do?
                document.getElementById("toets").onclick = function () {
                    const table = document.getElementById('content');
                    table.innerHTML = '';
                    sorterenToets()
                    if (sortToets === 'ascending') {
                        sortToets = 'descending';
                    } else {
                        sortToets = 'ascending';
                    }
                };

                // What does this function do?
                document.getElementById("resultaat").onclick = function () {
                    const table = document.getElementById('content');
                    table.innerHTML = '';
                    sorterenResultaat()
                    if (sortResultaat === 'ascending') {
                        sortResultaat = 'descending';
                    } else {
                        sortResultaat = 'ascending';
                    }
                };

            }

            // Sorts studentnames on alphabetical order.
            function sorterenNaam() {
                const sortedNameData = data.sort((a, b) => {
                    if (a.student.voornaam < b.student.voornaam) {
                        return sortName === 'ascending' ? -1 : 1
                    } else if (a.student.voornaam > b.student.voornaam) {
                        return sortName === 'ascending' ? 1 : -1
                    } else {
                        return 0
                    }

                })

                appendData(sortedNameData)
            }

            // Sorts the 'blokken' on alphabetical order.
            function sorterenBlok() {
                const sortedBlokData = data.sort((a, b) => {
                    if (a.blok < b.blok) {
                        return sortBlok === 'ascending' ? -1 : 1
                    } else if (a.blok > b.blok) {
                        return sortBlok === 'ascending' ? 1 : -1
                    } else {
                        return 0
                    }

                })

                appendData(sortedBlokData)
            }

            // Sorts the tests on alphabetical order.
            function sorterenToets() {
                const sortedToetsData = data.sort((a, b) => {
                    if (a.toets_code < b.toets_code) {
                        return sortToets === 'ascending' ? -1 : 1
                    } else if (a.toets_code > b.toets_code) {
                        return sortToets === 'ascending' ? 1 : -1
                    } else {
                        return 0
                    }

                })

                appendData(sortedToetsData)
            }

            // Sorts the results on alphabetical order.
            function sorterenResultaat() {
                const sortedResultaatData = data.sort((a, b) => {
                    if (a.voldoende > b.voldoende) {
                        return sortResultaat === 'ascending' ? -1 : 1
                    } else if (a.voldoende < b.voldoende) {
                        return sortResultaat === 'ascending' ? 1 : -1
                    } else {
                        return 0
                    }

                })

                appendData(sortedResultaatData)
            }

        })
        .catch((err) => console.log(err));
};

