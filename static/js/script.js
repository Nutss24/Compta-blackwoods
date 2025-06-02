let employees = [
    { name: "Steve Atwater", hours: 10, revenue: 4920, prime: 0 },
    { name: "Josh Magieux", hours: 20, revenue: 44500, prime: 0 },
    { name: "Elly Caldin", hours: 35, revenue: 86460, prime: 0 }
];

function calculer() {
    const impotRate = parseFloat(document.getElementById('impot').value) / 100;
    const primeRate = parseFloat(document.getElementById('prime').value) / 100;
    const dividendeRate = parseFloat(document.getElementById('dividende').value) / 100;
    const chargesDeductibles = parseFloat(document.getElementById('chargesDeductibles').value);
    const chargesNonDeductibles = parseFloat(document.getElementById('chargesNonDeductibles').value);

    const totalCA = employees.reduce((sum, emp) => sum + emp.revenue, 0);
    const impots = totalCA * impotRate;
    const primesGlobal = totalCA * primeRate;
    const dividendes = totalCA * dividendeRate;

    const totalHeures = employees.reduce((sum, emp) => sum + emp.hours, 0);
    const beneficeReparti = totalCA - impots - primesGlobal - dividendes - chargesDeductibles - chargesNonDeductibles;

    const tbody = document.querySelector("#payTable tbody");
    tbody.innerHTML = '';

    employees.forEach(emp => {
        const salaire = beneficeReparti * (emp.hours / totalHeures);
        const salaireFinal = salaire + emp.prime;

        const row = `<tr>
            <td>${emp.name}</td>
            <td><input type="number" value="${emp.hours}" onchange="updateHours('${emp.name}', this.value)"></td>
            <td>${emp.revenue.toFixed(2)}</td>
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
}