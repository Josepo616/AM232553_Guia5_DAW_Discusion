let myChart;

function updateChart() {
    const selectedData = document.querySelector('input[name="data"]:checked').value;
    const color = document.getElementById('colorPicker').value;
    const orientation = document.getElementById('orientation').value;

    const years = ['2019', '2020', '2021', '2022'];

    const data = {
        labels: years,
        datasets: years.map((year, index) => {
            return {
                label: selectedData === 'navegador' ? 'Uso de Navegador' : 'Uso de SO',
                data: selectedData === 'navegador' ? [Math.random() * 100, Math.random() * 100, Math.random() * 100, Math.random() * 100] : [Math.random() * 100, Math.random() * 100, Math.random() * 100, Math.random() * 100],
                backgroundColor: color
            }
        })
    };

    const ctx = document.getElementById('myChart').getContext('2d');

    // Limpiamos el canvas si ya existe un gráfico previo
    if (myChart) {
        myChart.destroy();
    }

    myChart = new Chart(ctx, {
        type: orientation === 'horizontal' ? 'horizontalBar' : 'bar',
        data: data,
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }],
                xAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });

    // Agregar nombres a las barras
    const barNames = selectedData === 'navegador' ? ['Chrome', 'Firefox', 'Safari', 'Edge'] : ['Windows', 'macOS', 'Linux', 'Otros'];

    myChart.data.datasets.forEach((dataset, i) => {
        dataset.label = barNames[i];
    });

    myChart.update();
}

document.getElementById('optionsForm').addEventListener('submit', function(event) {
    event.preventDefault();
    updateChart();
});

// Llamamos a la función updateChart() al cargar la página
window.addEventListener('load', updateChart);
