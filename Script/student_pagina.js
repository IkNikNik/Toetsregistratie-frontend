fetch('https://hu-toetsregistratie.nl/api/cijfer.json/?student__id=1')
    .then(response => response.json())
    .then(data => {
        appendData(data)

        function appendData(data) {
            let mainContainer = document.getElementById("vulling");
            for (let i = 0; i < data.length; i++) {
                let tr = document.createElement("tr");
                tr.innerHTML = '';
                mainContainer.appendChild(tr);
                let trCode = document.createElement("td");
                trCode.innerHTML = data[i].toets_code;
                mainContainer.appendChild(trCode);
                let trBlok = document.createElement("td");
                trBlok.innerHTML = data[i].blok;
                mainContainer.appendChild(trBlok);
                let cijfer = data[i].voldoende;
                if (cijfer === true) {
                    resultaat = 'Voldoende';
                } else {
                    resultaat = 'Onvoldoende';
                }
                let trCijfer = document.createElement("td");
                trCijfer.innerHTML = resultaat;
                mainContainer.appendChild(trCijfer);
            }
            let info = document.getElementById("naam");
            for (let i = 0; i < data.length; i++) {
                let naam = data[i].student.voornaam + ' ' + data[i].student.achternaam;
                info.innerHTML = naam;
            }
        }

        console.log(data)
    })
    .catch((err) => console.log(err));
