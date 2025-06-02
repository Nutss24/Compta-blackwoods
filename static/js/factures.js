const apiUrl = "https://api.glife.fr/roleplay/org/invoices?id=1397";

function fetchFactures() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (!localStorage.getItem("resetFactures")) {
                localStorage.setItem("facturesData", JSON.stringify(data));
            }
            afficherFactures();
        })
        .catch(err => {
            console.error("Erreur API:", err);
            const tbody = document.querySelector("#facturesTable tbody");
            tbody.innerHTML = '<tr><td colspan="4">Erreur lors du chargement des factures</td></tr>';
        });
}

function afficherFactures() {
    const factures = JSON.parse(localStorage.getItem("facturesData")) || [];
    const tbody = document.querySelector("#facturesTable tbody");
    tbody.innerHTML = '';
    const now = new Date().toLocaleString('fr-FR');

    factures.forEach(facture => {
        const row = `<tr>
            <td>${facture.id}</td>
            <td>${facture.name}</td>
            <td>${facture.revenue}</td>
            <td>${now}</td>
        </tr>`;
        tbody.innerHTML += row;
    });
}

function resetFactures() {
    localStorage.removeItem("facturesData");
    localStorage.removeItem("resetFactures");
    document.querySelector("#facturesTable tbody").innerHTML = '<tr><td colspan="4">Factures réinitialisées</td></tr>';
}

// Charger au démarrage
fetchFactures();