let employees = [
    { name: "Steve Atwater", hours: 10, prime: 0 },
    { name: "Josh Magieux", hours: 20, prime: 0 },
    { name: "Elly Caldin", hours: 35, prime: 0 }
];

let totalCA = 0;

function fetchFacturesEtCalculer() {
    const apiUrl = "https://api.glife.fr/roleplay/org/invoices?id=1397";

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            totalCA = data.reduce((sum, facture) => sum + facture.revenue, 0);
            calculer();
        })
        .catch(err => {
            console.error("Erreur API:", err);
            totalCA = 0;
            calculer();
        });
}

function calculer() {
    const impotRate = parseFloat(document.getElementById('impot').value) / 100;
    const primeRate = parseFloat(document.getElementById('prime').value) / 100;
    const dividendeRate = parseFloat(document.getElementById('dividende').value) / 100;
    const chargesDeductibles = parseFloat(document.getElementById('chargesDeductibles').value);
    const chargesNonDeductibles = parseFloat(document.getElementById('chargesNonDeductibles').value);

    const impots = totalCA * impotRate;
    const primesGlobal = totalCA * primeRate;
    const dividendes = totalCA * dividendeRate;
    const beneficeReparti = totalCA - impots - primesGlobal - dividendes - chargesDeductibles - chargesNonDeductibles;

    // Mettre à jour l'encadré
    document.getElementById('caTotal').innerText = totalCA.toFixed(2) + ' €';
    document.getElementById('impotsTotal').innerText = impots.toFixed(2) + ' €';
    document.getElementById('primesTotal').innerText = primesGlobal.toFixed(2) + ' €';
    document.getElementById('dividendesTotal').innerText = dividendes.toFixed(2) + ' €';
    document.getElementById('chargesDeductiblesTotal').innerText = chargesDeductibles.toFixed(2) + ' €';
    document.getElementById('chargesNonDeductiblesTotal').innerText = chargesNonDeductibles.toFixed(2) + ' €';
    document.getElementById('beneficeTotal').innerText = beneficeReparti.toFixed(2) + ' €';

    const totalHeures = employees.reduce((sum, emp) => sum + emp.hours, 0);
    const tbody = document.querySelector("#payTable tbody");
    tbody.innerHTML = '';

    employees.forEach(emp => {
        const salairePartCA = beneficeReparti * (emp.hours / totalHeures);
        const salaireFinal = salairePartCA + emp.prime;

        const row = `<tr>
            <td>${emp.name}</td>
            <td><input type="number" value="${emp.hours}" onchange="updateHours('${emp.name}', this.value)"></td>
            <td>${salairePartCA.toFixed(2)}</td>
            <td><input type="number" value="${emp.prime}" onchange="updatePrime('${emp.name}', this.value)"></td>
            <td>${salaireFinal.toFixed(2)}</td>
        </tr>`;
        tbody.innerHTML += row;
    });
}

function updateHours(name, value) {
    employees.forEach(emp => {
        if (emp.name === name) {
            emp.hours = parseFloat(value);
        }
    });
}

function updatePrime(name, value) {
    employees.forEach(emp => {
        if (emp.name === name) {
            emp.prime = parseFloat(value);
        }
    });
}

function resetForm() {
    document.getElementById('impot').value = 20;
    document.getElementById('prime').value = 5;
    document.getElementById('dividende').value = 10;
    document.getElementById('chargesDeductibles').value = 0;
    document.getElementById('chargesNonDeductibles').value = 0;
    document.querySelector('#payTable tbody').innerHTML = '';
    document.getElementById('caTotal').innerText = '0 €';
    document.getElementById('impotsTotal').innerText = '0 €';
    document.getElementById('primesTotal').innerText = '0 €';
    document.getElementById('dividendesTotal').innerText = '0 €';
    document.getElementById('chargesDeductiblesTotal').innerText = '0 €';
    document.getElementById('chargesNonDeductiblesTotal').innerText = '0 €';
    document.getElementById('beneficeTotal').innerText = '0 €';
}

// Charger les factures à l'ouverture
window.onload = fetchFacturesEtCalculer;