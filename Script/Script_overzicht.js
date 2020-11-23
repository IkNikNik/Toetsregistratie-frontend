window.onload = function () {
    // Stuurt fetch naar de 'cijfer' API
    fetch('https://62.251.126.253:63231/api/cijfer.json')
        .then(response => response.json())
        .then(data => {
            // What do these variables do?
            let sortName = 'ascending';
            let sortBlok = 'ascending';
            let sortToets = 'ascending';
            let sortResultaat = 'ascending';
            appendData(data)

            // What does this function do? Appends data to...
            function appendData(sortedData) {
                let mainContainer = document.getElementById("vulling");
                for (let i = 0; i < sortedData.length; i++) {
                    // Ads a TR element with '' to the maincontainer.
                    let tr = document.createElement("tr");
                    tr.innerHTML = '';
                    mainContainer.appendChild(tr);

                    // Adds the students' given- and family name to the table.
                    let trNaam = document.createElement("td");
                    trNaam.innerHTML = sortedData[i].student.voornaam + ' ' + sortedData[i].student.achternaam;
                    mainContainer.appendChild(trNaam);

                    // Adds an area for the 'blok' name of the test.
                    let trBlok = document.createElement("td");
                    trBlok.innerHTML = sortedData[i].blok;
                    mainContainer.appendChild(trBlok);

                    // Adds an area for the name of the test.
                    let trToets = document.createElement("td");
                    trToets.innerHTML = sortedData[i].toets_code;
                    mainContainer.appendChild(trToets);

                    // Checks if the grade is a passing one or a non-passing one.
                    let cijfer = sortedData[i].voldoende;
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
                    const gevuldeTabel = document.getElementById('vulling');
                    gevuldeTabel.innerHTML = '';
                    sorterenNaam()
                    if (sortName === 'ascending') {
                        sortName = 'descending';
                    } else {
                        sortName = 'ascending';
                    }
                };

                // What does this function do?
                document.getElementById("blok").onclick = function () {
                    const gevuldeTabel = document.getElementById('vulling');
                    gevuldeTabel.innerHTML = '';
                    sorterenBlok()
                    if (sortBlok === 'ascending') {
                        sortBlok = 'descending';
                    } else {
                        sortBlok = 'ascending';
                    }
                };

                // What does this function do?
                document.getElementById("toets").onclick = function () {
                    const gevuldeTabel = document.getElementById('vulling');
                    gevuldeTabel.innerHTML = '';
                    sorterenToets()
                    if (sortToets === 'ascending') {
                        sortToets = 'descending';
                    } else {
                        sortToets = 'ascending';
                    }
                };

                // What does this function do?
                document.getElementById("resultaat").onclick = function () {
                    const gevuldeTabel = document.getElementById('vulling');
                    gevuldeTabel.innerHTML = '';
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

