let table = document.getElementById('vulling');
let searchParams = new URLSearchParams(window.location.search);
if (searchParams.has('student')) {
    let student = searchParams.get('student');

    fetch('http://62.251.126.253:63231/api/cijfer.json/?student__voornaam=' + student)
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
                    let naam = document.createElement("p");
                    naam.innerHTML = data[i].student.voornaam + ' ' + data[i].student.achternaam;
                    ;
                    info.appendChild(naam);
                }
            }

            console.log(data)
        })
        .catch((err) => console.log(err));
}
table.addEventListener("click", function (e) {
    let student = e.target.innerText;
    let newSearchParams = new URLSearchParams();

    newSearchParams.set('student', student);
    location.href = 'student_individueel.html' + '?' + newSearchParams.toString()
});
