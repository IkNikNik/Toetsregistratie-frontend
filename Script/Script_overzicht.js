window.onload = function () {
    // Stuurt fetch naar de 'cijfer' API omdat hierin de FK's in staan
    fetch('http://62.251.126.253:63231/api/cijfer.json')
        .then(response => response.json())
        .then(data => {
            let sortName = 'ascending';
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
                    sorteren()
                    console.log('klik')
                    if (sortName === 'ascending') {
                        sortName = 'descending';
                    } else {
                        sortName = 'ascending';
                    }
                };

            }


            // vanaf hier word er gepuzzeld met Sorteren. Deze code is nog niet af en hoeft nog niet beoordeeld.
            // Tips zijn wel welkom natuurlijk

            function sorteren() {
                const sortedNameData = data.sort((a, b) => {
                    if (a.student.voornaam < b.student.voornaam) {
                        return sortName === 'ascending' ? -1 : 1
                     } else if (a.student.voornaam > b.student.voornaam){
                        return sortName === 'ascending' ? 1 : -1
                    } else {
                        return 0
                    }

                })

                appendData(sortedNameData)
            }


        })
        .catch((err) => console.log(err));
};

