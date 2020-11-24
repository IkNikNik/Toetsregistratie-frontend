 function validateMyForm() {
     let elemlength = document.getElementById('nummer').value.length;
     if (elemlength < 7 || elemlength > 7) {
         alert("Het studentnummer moet 7 cijfers bevatten");
         return false;
     } else {
         post_student()
         return true;
     }
 }

function post_student() {
    let selVoor = document.getElementById('voornaam').value;
    let selAchter = document.getElementById('achternaam').value;
    let selNummer = document.getElementById('nummer').value;

    let data = {
        'voornaam': selVoor,
        'achternaam': selAchter,
        'student_nummer': selNummer,
    };
    fetch('https://hu-toetsregistratie.nl/api/student/', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.indexOf('application/json') !== -1)
                return response.json();
            else {
                console.log("nonJson received");
                console.log(response.text());
                return null;
            }
        })
        .then(data => {
            console.log('Success:', data);
            alert('Student is opgeslagen');
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Student is niet opgeslagen')
        });
    let form = document.getElementById("myForm");
    form.reset();
}

nummer.oninput = function () {
    if (this.value.length > 7)
        this.value = this.value.slice(1000000, 9999999);
}