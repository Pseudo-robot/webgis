// Inisialisasi peta dengan koordinat tengah Indonesia
const map = L.map('map').setView([-2.5, 118], 5);  // Koordinat tengah Indonesia

// Menambahkan layer dasar (tile) OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Menambahkan data GeoJSON gunung berapi
fetch('data/volcanoes.geojson')
    .then(response => response.json())
    .then(data => {
        L.geoJSON(data, {
            onEachFeature: (feature, layer) => {
                // Menambahkan popup eksklusif dengan informasi gunung
                layer.bindPopup(`
                    <b>${feature.properties.name}</b><br>
                    Lokasi: ${feature.properties.location}<br>
                    Ketinggian: ${feature.properties.height}
                `);
            }
        }).addTo(map);
    })
    .catch(error => console.error('Error loading GeoJSON:', error));
