window.onload = function () {
    let studentData;
    // Stuurt fetch naar de 'cijfer' API omdat hierin de FK's in staan
    fetch('http://62.251.126.253:63231/api/cijfer.json')
        .then(response => response.json())
        .then(data => {
            appendData(data)

            function appendData(data) {
                let mainContainer = document.getElementById("vulling");
                for (let i = 0; i < data.length; i++) {
                    let tr = document.createElement("tr");
                    tr.innerHTML = '';
                    mainContainer.appendChild(tr);
                    let trNaam = document.createElement("td");
                    trNaam.innerHTML = data[i].student.voornaam + ' ' + data[i].student.achternaam;
                    mainContainer.appendChild(trNaam);
                    let trBlok = document.createElement("td");
                    trBlok.innerHTML = data[i].blok;
                    mainContainer.appendChild(trBlok);
                    let trToets = document.createElement("td");
                    trToets.innerHTML = data[i].toets_code;
                    mainContainer.appendChild(trToets);
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
            }


            // document.getElementById("naam").onclick = function () {
            //     const gevuldeTabel = document.getElementById('vulling');
            //     gevuldeTabel.innerHTML = '';
            //     sorteren()
            //     console.log('klik')
            // };
            //
            //
            // function sorteren( a, b ) {
            //     if ( a.student.voornaam < b.student.voornaam ){
            //         return -1;
            //     }
            //     if ( a.student.voornaam > b.student.voornaam ){
            //         return 1;
            //     }
            //     return 0;
            // }
            //
            // data.sort( sorteren );
            // appendData(sortedNameData)

            // function sorteren() {
            //     let sortName = 'ascending';
            //     let sortedNameData = data.sort((a, b) => {
            //         if (a.student.voornaam > b.student.voornaam) {
            //             return sortName = 1
            //         }
            //         else {
            //             return sortName = -1
            //         }
            //     });
            //
            //     appendData(sortedNameData)
            //
            //
            // }


        })
        .catch((err) => console.log(err));
};

// function sort(property) {
//     return function(a, b) {
//         return a[property - b[property]]
//     }
// }