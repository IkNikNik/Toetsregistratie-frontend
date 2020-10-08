window.onload = function () {
    // Stuurt fetch naar de 'cijfer' API omdat hierin de FK's in staan
    fetch('http://62.251.126.253:63231/api/student.json')
        .then(response => response.json())
        .then(data => {
            let sortVoornaam = 'ascending';
            let sortAchternaam = 'ascending';
            let sortNummer = 'ascending';
            appendData(data)


            function appendData(sortedData) {
                let mainContainer = document.getElementById("vulling");
                for (let i = 0; i < sortedData.length; i++) {
                    let tr = document.createElement("tr");
                    tr.innerHTML = '';
                    mainContainer.appendChild(tr);
                    let trNaam = document.createElement("td");
                    trNaam.innerHTML = sortedData[i].voornaam;
                    mainContainer.appendChild(trNaam);
                    let trAchternaam = document.createElement("td");
                    trAchternaam.innerHTML = sortedData[i].achternaam;
                    mainContainer.appendChild(trAchternaam);
                    let trNummer = document.createElement("td");
                    trNummer.innerHTML = sortedData[i].student_nummer;
                    mainContainer.appendChild(trNummer);
                }

                document.getElementById("voornaam").onclick = function () {
                    const gevuldeTabel = document.getElementById('vulling');
                    gevuldeTabel.innerHTML = '';
                    sorterenVoornaam()
                    if (sortVoornaam === 'ascending') {
                        sortVoornaam = 'descending';
                    } else {
                        sortVoornaam = 'ascending';
                    }
                };

                document.getElementById("achternaam").onclick = function () {
                    const gevuldeTabel = document.getElementById('vulling');
                    gevuldeTabel.innerHTML = '';
                    sorterenAchternaam()
                    if (sortAchternaam === 'ascending') {
                        sortAchternaam = 'descending';
                    } else {
                        sortAchternaam = 'ascending';
                    }
                };

                document.getElementById("nummer").onclick = function () {
                    const gevuldeTabel = document.getElementById('vulling');
                    gevuldeTabel.innerHTML = '';
                    sorterenNummer()
                    if (sortNummer === 'ascending') {
                        sortNummer = 'descending';
                    } else {
                        sortNummer = 'ascending';
                    }
                };
            }

            function sorterenVoornaam() {
                const sortedVoornaam = data.sort((a, b) => {
                    if (a.voornaam < b.voornaam) {
                        return sortVoornaam === 'ascending' ? -1 : 1
                    } else if (a.voornaam > b.voornaam) {
                        return sortVoornaam === 'ascending' ? 1 : -1
                    } else {
                        return 0
                    }

                })

                appendData(sortedVoornaam)
            }

            function sorterenAchternaam() {
                const sortedAchternaam = data.sort((a, b) => {
                    if (a.achternaam < b.achternaam) {
                        return sortAchternaam === 'ascending' ? -1 : 1
                    } else if (a.achternaam > b.achternaam) {
                        return sortAchternaam === 'ascending' ? 1 : -1
                    } else {
                        return 0
                    }

                })

                appendData(sortedAchternaam)
            }

            function sorterenNummer() {
                const sortedNummer = data.sort((a, b) => {
                    if (a.student_nummer < b.student_nummer) {
                        return sortNummer === 'ascending' ? -1 : 1
                    } else if (a.student_nummer > b.student_nummer) {
                        return sortNummer === 'ascending' ? 1 : -1
                    } else {
                        return 0
                    }

                })

                appendData(sortedNummer)
            }

        })
        .catch((err) => console.log(err));
};

