window.onload = function () {
    // Stuurt fetch naar de 'cijfer' API omdat hierin de FK's in staan
    fetch('https://hu-toetsregistratie.nl/api/cijfer.json')
        .then(response => response.json())
        .then(data => {
            let sortName = 'ascending';
            let sortBlok = 'ascending';
            let sortToets = 'ascending';
            let sortResultaat = 'ascending';
            appendData(data)


            function appendData(sortedData) {
                let mainContainer = document.getElementById("vulling");
                for (let i = 0; i < sortedData.length; i++) {
                    let tr = document.createElement("tr");
                    tr.innerHTML = '';
                    mainContainer.appendChild(tr);
                    let trNaam = document.createElement("td");
                    trNaam.innerHTML = sortedData[i].student.voornaam + ' ' + sortedData[i].student.achternaam;
                    mainContainer.appendChild(trNaam);
                    let trBlok = document.createElement("td");
                    trBlok.innerHTML = sortedData[i].blok;
                    mainContainer.appendChild(trBlok);
                    let trToets = document.createElement("td");
                    trToets.innerHTML = sortedData[i].toets_code;
                    mainContainer.appendChild(trToets);
                    let trDatum = document.createElement("td");
                    trDatum.innerHTML = sortedData[i].datum_toets;
                    mainContainer.appendChild(trDatum);
                    let cijfer = sortedData[i].voldoende;
                    if (cijfer === true) {
                        resultaat = 'Voldoende';
                    } else {
                        resultaat = 'Onvoldoende';
                    }
                    let trCijfer = document.createElement("td");
                    trCijfer.innerHTML = resultaat;
                    mainContainer.appendChild(trCijfer);
                }

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

                document.getElementById("datum").onclick = function () {
                    const gevuldeTabel = document.getElementById('vulling');
                    gevuldeTabel.innerHTML = '';
                    sorterenDatum()
                    if (sortDatum === 'ascending') {
                        sortDatum = 'descending';
                    } else {
                        sortDatum = 'ascending';
                    }
                };

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

            function sorterenDatum() {
                const sortedDatumData = data.sort((a, b) => {
                    if (a.datum_toets < b.datum_toets) {
                        return sortToets === 'ascending' ? -1 : 1
                    } else if (a.datum_toets > b.datum_toets) {
                        return sortToets === 'ascending' ? 1 : -1
                    } else {
                        return 0
                    }

                })

                appendData(sortedDatumData)
            }

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

    document.getElementById("knopje").onclick = function() {myFunction()};
    function myFunction() {
        var elmnt = document.getElementById("iframe");
        elmnt.scrollIntoView();
    }
    document.getElementById("knop").onclick = function() {myFunction2()};
    function myFunction2() {
        var elmnt = document.getElementById("boven");
        elmnt.scrollIntoView();
    }
};


