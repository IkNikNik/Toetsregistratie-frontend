window.onload = function () {
    // Stuurt fetch naar de 'cijfer' API omdat hierin de FK's in staan
    fetch('http://62.251.126.253:63231/api/toets.json')
        .then(response => response.json())
        .then(data => {
            let sortToetsnaam = 'ascending';
            let sortBlok = 'ascending';
            let sortToetscode = 'ascending';
            let sortJaar = 'ascending';
            appendData(data)

            function appendData(sortedData) {
                let mainContainer = document.getElementById("vulling");
                for (let i = 0; i < sortedData.length; i++) {
                    let tr = document.createElement("tr");
                    tr.innerHTML = '';
                    mainContainer.appendChild(tr);
                    let trNaam = document.createElement("td");
                    trNaam.innerHTML = sortedData[i].toets_naam;
                    mainContainer.appendChild(trNaam);
                    let trToets = document.createElement("td");
                    trToets.innerHTML = sortedData[i].toets_code;
                    mainContainer.appendChild(trToets);
                    let trJaar = document.createElement("td");
                    trJaar.innerHTML = sortedData[i].jaar;
                    mainContainer.appendChild(trJaar);
                    let trBlok = document.createElement("td");
                    trBlok.innerHTML = sortedData[i].blok;
                    mainContainer.appendChild(trBlok);
                }

                document.getElementById("toetsnaam").onclick = function () {
                    const gevuldeTabel = document.getElementById('vulling');
                    gevuldeTabel.innerHTML = '';
                    sorterenToetsnaam()
                    if (sortToetsnaam === 'ascending') {
                        sortToetsnaam = 'descending';
                    } else {
                        sortToetsnaam = 'ascending';
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

                document.getElementById("toetscode").onclick = function () {
                    const gevuldeTabel = document.getElementById('vulling');
                    gevuldeTabel.innerHTML = '';
                    sorterenToetscode()
                    if (sortToetscode === 'ascending') {
                        sortToetscode = 'descending';
                    } else {
                        sortToetscode = 'ascending';
                    }
                };

                document.getElementById("jaar").onclick = function () {
                    const gevuldeTabel = document.getElementById('vulling');
                    gevuldeTabel.innerHTML = '';
                    sorterenJaar()
                    if (sortJaar === 'ascending') {
                        sortJaar = 'descending';
                    } else {
                        sortJaar = 'ascending';
                    }
                };

            }

            function sorterenToetsnaam() {
                const sortedToetsnaam = data.sort((a, b) => {
                    if (a.toets_naam < b.toets_naam) {
                        return sortToetsnaam === 'ascending' ? -1 : 1
                    } else if (a.toets_naam > b.toets_naam) {
                        return sortToetsnaam === 'ascending' ? 1 : -1
                    } else {
                        return 0
                    }

                })

                appendData(sortedToetsnaam)
            }

            function sorterenBlok() {
                const sortedBlok = data.sort((a, b) => {
                    if (a.blok < b.blok) {
                        return sortBlok === 'ascending' ? -1 : 1
                    } else if (a.blok > b.blok) {
                        return sortBlok === 'ascending' ? 1 : -1
                    } else {
                        return 0
                    }

                })

                appendData(sortedBlok)
            }

            function sorterenToetscode() {
                const sortedToetscode = data.sort((a, b) => {
                    if (a.toets_code < b.toets_code) {
                        return sortToetscode === 'ascending' ? -1 : 1
                    } else if (a.toets_code > b.toets_code) {
                        return sortToetscode === 'ascending' ? 1 : -1
                    } else {
                        return 0
                    }

                })

                appendData(sortedToetscode)
            }

            function sorterenJaar() {
                const sortedJaar = data.sort((a, b) => {
                    if (a.jaar > b.jaar) {
                        return sortJaar === 'ascending' ? -1 : 1
                    } else if (a.jaar < b.jaar) {
                        return sortJaar === 'ascending' ? 1 : -1
                    } else {
                        return 0
                    }

                })

                appendData(sortedJaar)
            }

        })
        .catch((err) => console.log(err));
};

