let employees = [
    { name: "Steve Atwater", hours: 10, revenue: 4920 },
    { name: "Josh Magieux", hours: 20, revenue: 44500 },
    { name: "Elly Caldin", hours: 35, revenue: 86460 }
];

function calculer() {
    const prime = parseFloat(document.getElementById('prime').value) / 100;
    const impot = parseFloat(document.getElementById('impot').value) / 100;
    const chargesDeductibles = parseFloat(document.getElementById('chargesDeductibles').value);
    const chargesNonDeductibles = parseFloat(document.getElementById('chargesNonDeductibles').value);

    const totalCA = employees.reduce((sum, emp) => sum + emp.revenue, 0);
    const totalHeures = employees.reduce((sum, emp) => sum + emp.hours, 0);
    const beneficeImposable = totalCA - chargesDeductibles;
    const totalImpots = beneficeImposable * impot;

    const tbody = document.querySelector('#payTable tbody');
    tbody.innerHTML = '';

    employees.forEach(emp => {
        const ratio = emp.hours / totalHeures;
        const primeEmp = totalCA * prime * ratio;
        const impotEmp = totalImpots * ratio;
        const chargesDeductiblesEmp = chargesDeductibles * ratio;
        const chargesNonDeductiblesEmp = chargesNonDeductibles * ratio;
        const salaireNet = (emp.revenue + primeEmp) - (impotEmp + chargesDeductiblesEmp + chargesNonDeductiblesEmp);

        const row = `<tr>
            <td>${emp.name}</td>
            <td>${emp.hours}</td>
            <td>${emp.revenue.toFixed(2)}</td>
            <td>${primeEmp.toFixed(2)}</td>
            <td>${impotEmp.toFixed(2)}</td>
            <td>${chargesDeductiblesEmp.toFixed(2)}</td>
            <td>${chargesNonDeductiblesEmp.toFixed(2)}</td>
            <td>${salaireNet.toFixed(2)}</td>
        </tr>`;
        tbody.innerHTML += row;
    });
}

function resetForm() {
    document.getElementById('prime').value = 5;
    document.getElementById('impot').value = 20;
    document.getElementById('chargesDeductibles').value = 0;
    document.getElementById('chargesNonDeductibles').value = 0;
    document.querySelector('#payTable tbody').innerHTML = '';
}