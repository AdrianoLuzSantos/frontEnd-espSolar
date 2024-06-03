// Configure o Firebase com suas credenciais
const firebaseConfig = {
    apiKey: "AIzaSyCS7vTqiIYfI4EkfDpvNdKSoVDW9tcDsUU",
    authDomain: "esp-solar.firebaseapp.com",
    databaseURL: "https://esp-solar-default-rtdb.firebaseio.com",
    projectId: "esp-solar",
    storageBucket: "esp-solar.appspot.com",
    messagingSenderId: "858260283726",
    appId: "1:858260283726:web:e71a76062fd84edffa3e1f",
    measurementId: "G-PZ2MRL7J07"
};
// Inicialize o Firebase
firebase.initializeApp(firebaseConfig);
// Referência para o nó do banco de dados que você deseja acessar
const database = firebase.database();

document.addEventListener('DOMContentLoaded', function() {
    var options = {
        series: [
            {
                name: "Tensão Solar",
                data: []
            },
            {
                name: "Tensão Rede",
                data: []
            },
            {
                name: "Corrente Solar",
                data: []
            },
            {
                name: "Corrente Rede",
                data: []
            }
        ],
        chart: {
            height: 350,
            type: 'line',
            dropShadow: {
                enabled: true,
                color: '#000',
                top: 18,
                left: 7,
                blur: 10,
                opacity: 0.2
            },
            zoom: {
                enabled: true
            },
            toolbar: {
                show: true
            },
        },
        colors: ['#77B6EA', '#545454'],
        dataLabels: {
            enabled: true,
        },
        stroke: {
            curve: 'smooth'
        },
        grid: {
            borderColor: '#e7e7e7',
            row: {
                colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0.5
            },
        },
        markers: {
            size: 1
        },
        xaxis: {
            type: 'categories',
            categories: [],
            title: {
                text: 'Data'
            }
        },
        yaxis: {
            labels: {
                formatter: function(value) {
                    return value.toFixed(1); // Formata os valores do eixo Y com uma casa decimal
                }
            }
        },
        legend: {
            position: 'top',
            horizontalAlign: 'center',
            floating: true,
            offsetY: 0,
            offsetX: 0
        }
    };

    var chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();

    const ref = database.ref('Tensao_Corrente');
    ref.on("value", (snapshot) => {
        const data = snapshot.val();
        console.log(data)
        const dataArray = Object.values(data).slice(-24); // Pegando os últimos 24 valores
        const categories = dataArray.map(item => item.Data); // Obtendo as datas dos últimos 24 valores
        const tensaoSolar = dataArray.map(item => parseFloat(item.TensPlaca).toFixed(1)); // Arredonda para uma casa decimal
        const tensaoRede = dataArray.map(item => parseFloat(item.TensRede).toFixed(1)); // Arredonda para uma casa decimal
        const correnteSolar = dataArray.map(item => parseFloat(item.CorrPlaca).toFixed(1)); // Arredonda para uma casa decimal
        const correnteRede = dataArray.map(item => parseFloat(item.CorreRede).toFixed(1)); // Arredonda para uma casa decimal

        // Atualizando os dados do gráfico
        chart.updateSeries([
            { name: "Tensão Solar", data: tensaoSolar },
            { name: "Tensão Rede", data: tensaoRede },
            { name: "Corrente Solar", data: correnteSolar },
            { name: "Corrente Rede", data: correnteRede }
        ]);
        chart.updateOptions({
            xaxis: {
                categories: categories
            }
        });
    });
});