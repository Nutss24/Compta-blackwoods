const apiUrl = "https://api.glife.fr/roleplay/org/invoices?id=1397";

fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        const tbody = document.querySelector("#facturesTable tbody");
        tbody.innerHTML = '';

        data.forEach(facture => {
            const date = new Date().toLocaleString('fr-FR');
            const row = `<tr>
                <td>${facture.id}</td>
                <td>${facture.name}</td>
                <td>${facture.revenue}</td>
                <td>${date}</td>
            </tr>`;
            tbody.innerHTML += row;
        });
    })
    .catch(err => {
        console.error("Erreur API:", err);
        const tbody = document.querySelector("#facturesTable tbody");
        tbody.innerHTML = '<tr><td colspan="4">Erreur lors du chargement des factures</td></tr>';
    });