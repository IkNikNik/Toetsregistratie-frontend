window.onload = function () {
    var studentData;
    // Stuurt fetch naar de 'cijfer' API omdat hierin de FK's in staan
    fetch('http://62.251.126.253:63231/api/cijfer.json')
        .then(response => response.json())
        .then(data => appendData(data))
        .catch(err => console.log(err));


    function appendData(data) {
        var mainContainer = document.getElementById("overzicht");
        for (var i = 0; i < data.length; i++) {
            var tr = document.createElement("tr");
            tr.innerHTML = '';
            mainContainer.appendChild(tr);
            var trNaam = document.createElement("td");
            trNaam.innerHTML = data[i].student.voornaam + ' ' + data[i].student.achternaam;
            mainContainer.appendChild(trNaam);
            var trBlok = document.createElement("td");
            trBlok.innerHTML = data[i].blok;
            mainContainer.appendChild(trBlok);
            var trToets = document.createElement("td");
            trToets.innerHTML = data[i].toets;
            mainContainer.appendChild(trToets);
            var trCijfer = document.createElement("td");
            trCijfer.innerHTML = data[i].cijfer;
            mainContainer.appendChild(trCijfer);
        }

    }
};